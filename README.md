# dao-organaizor
DAOの自動化ツール

## ディレクトリ構造
```
├── backend                     : クラウド(AWS)でのサーバー実装
│   ├── aws_discord_bot         : Discord上での機能
│   ├── aws_etherum_handler     : オンチェーン処理の自動化(トークン発行など)
│   └── aws_thegragh_handler    : オフチェーンからのオンチェーン情報の解析
├── contract                    : スマコンの実装
│   ├── contracts
│   ├── scripts
│   └── test
├── doc                         : 設計書類(概念図、シーケンス図)
└── frontend                    : フロントエンド *現在実装予定なし
```

## 参考文献、参考URL
* [AWS Key Management Service（AWS KMS）を使用して Ethereum EIP-1559トランザクションに署名する](https://aws.amazon.com/jp/blogs/news/use-key-management-service-to-sign-ethereum-eip1559-transaction/)
