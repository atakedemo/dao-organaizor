#  SPDX-License-Identifier: MIT-0

from aws_cdk import (core,
                     aws_lambda,
                     aws_kms
                     )


class EthLambda(core.Construct):

    def __init__(self,
                 scope: core.Construct,
                 id: str,
                 dir: str,
                 env: dict
                 ):
        super().__init__(scope, id)

        bundling_docker_image = core.BundlingDockerImage.from_registry(
            "lambci/lambda:build-python3.8"
        )

        commands = [
            "if [[ -f requirements.txt ]]; then pip install --target /asset-output -r requirements.txt; fi",
            "cp --parents $(find . -name '*.py') /asset-output"
        ]

        bundling_config = core.BundlingOptions(
            image=bundling_docker_image, command=["bash", "-xe", "-c", " && ".join(commands)]
        )

        code = aws_lambda.Code.from_asset(
            path=dir, bundling=bundling_config
        )

        lf = aws_lambda.Function(
            self,
            "Function",
            handler="lambda_function.lambda_handler",
            runtime=aws_lambda.Runtime.PYTHON_3_8,
            environment=env,
            timeout=core.Duration.minutes(2),
            code=code,
            memory_size=256
        )

        self.lf = lf


class AwsKmsLambdaEthereumStack(core.Stack):

    def __init__(self, scope: core.Construct, construct_id: str, 
                eth_network: str = 'goerli', eth_provider: str = 'https://eth-goerli.g.alchemy.com/v2/tiZbH-rBHm6s515n7IWqKSXc3ER88Cxs',
                 **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cmk = aws_kms.Key(self, "eth-cmk-identity",
                          removal_policy=core.RemovalPolicy.DESTROY)
        cfn_cmk = cmk.node.default_child
        cfn_cmk.key_spec = 'ECC_SECG_P256K1'
        cfn_cmk.key_usage = 'SIGN_VERIFY'

        eth_client_eip1559 = EthLambda(self, "KmsClientEIP1559",
                                       dir="aws_kms_lambda_ethereum/_lambda/functions/eth_client_eip1559",
                                       env={"LOG_LEVEL": "DEBUG",
                                            "KMS_KEY_ID": cmk.key_id,
                                            "ETH_NETWORK": eth_network,
                                            "ETH_PROVIDER": eth_provider
                                        }
                                       )

        cmk.grant(eth_client_eip1559.lf, 'kms:GetPublicKey')
        cmk.grant(eth_client_eip1559.lf, 'kms:Sign')

        auth_client = EthLambda(self, "AuthClient",
                                dir="aws_kms_lambda_ethereum/_lambda/functions/auth_client",
                                env={"LOG_LEVEL": "DEBUG",
                                    "ETH_NETWORK": eth_network,
                                    "ETH_PROVIDER": eth_provider,
                                    "KMS_KEY_ID": "XXX"
                                }
                                )
        cmk.grant(auth_client.lf, 'kms:GetPublicKey')

        core.CfnOutput(self, 'KeyID', value=cmk.key_id,
                       description="KeyID of the KMS-CMK instance used as the Ethereum identity instance")
