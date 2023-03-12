# dao-organaizor
DAOの自動化ツール

UNCHAINの進捗2Earnにて申請中
（[申請中のフォーム](https://unchain-shiftbase.notion.site/DAO-Auganizor-d3771bf4331a4e448128d74e79172f43)）


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

## 参考文献、参考URL
* [ERC1155に準拠した独自コントラクトの作り方 - Zenn](https://zenn.dev/ryo_takahashi/articles/53d1f9abb2eecd)
* [AWS Key Management Service（AWS KMS）を使用して Ethereum EIP-1559トランザクションに署名する](https://aws.amazon.com/jp/blogs/news/use-key-management-service-to-sign-ethereum-eip1559-transaction/)
