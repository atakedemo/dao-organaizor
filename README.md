# Comune
DAOの自動化ツール

* UNCHAINの進捗2Earnにて申請中
（[申請中のフォーム](https://unchain-shiftbase.notion.site/DAO-Auganizor-d3771bf4331a4e448128d74e79172f43)）
* サービス概要
（[Comune - プレゼン資料](https://www.canva.com/design/DAFdLlP6d9A/A-JwJnjKGRXSv36wfBHFMg/view?utm_content=DAFdLlP6d9A&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)）

## ディレクトリ構造
```
├── backend                     : クラウド(AWS)でのサーバー実装
│   ├── aws_discord_bot         : Discord上での機能
│   ├── aws_etherum_handler     : オンチェーン処理の自動化(トークン発行など)
│   └── aws_metadata_backet     : Cloudfront+S3でのホスティング用設定(メタデータ、画像データなど格納)
├── contract                    : スマコンの実装
│   ├── contracts               : スマコンのソースコード(Solidity)
│   ├── scripts                 : デプロイ用のソースコード
│   └── test
├── doc                         : 設計書類(概念図、シーケンス図)
└── frontend                    : フロントエンド *現在実装予定なし
```

## 環境情報
|分類|項目|値|
|---|---|---|
|Network|使用するチェーン|Polygon Mumbai|
|Contract Address|デモコントラクト(ERC1155)|0xCCAd304E9B5a6B69168DD2E791F01021cf3295B9|
|Contract Address|デモコントラクト(ERC20)|0xfff|
|Contract Address|USDC(in Polygon Testnet)|0x0FA8781a83E46826621b3BC094Ea2A0212e71B23|
|Wallet Adress|Tx実行サーバーのアドレス ※AWS KMSで管理|0x54d3B05E28cB78204e1171DeC088698eb829523d|

### envファイル
```
API_URL_GOERLI = AlchemyのAPI URL(ex. "https://eth-goerli.g.alchemy.com/~")
API_URL_MUMBAI = AlchemyのAPI URL(ex. "https://polygon-mumbai.g.alchemy.com/~")
API_KEY_MUMBAI = Ploygonscanで発行したAPIキー
PRIVATE_KEY = コントラクトをデプロイするアカウントの秘密鍵
```

## 参考文献、参考URL
* [ERC1155に準拠した独自コントラクトの作り方 - Zenn](https://zenn.dev/ryo_takahashi/articles/53d1f9abb2eecd)
* [hardhatからEtherscanにコードを登録する方法 - Zenn](https://zenn.dev/ryo_takahashi/articles/77f4eeb3f9f52b)
* [AWS Key Management Service（AWS KMS）を使用して Ethereum EIP-1559トランザクションに署名する](https://aws.amazon.com/jp/blogs/news/use-key-management-service-to-sign-ethereum-eip1559-transaction/)
