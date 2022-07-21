# プロジェクトセットアップ

1. リポジトリをクローン

```bash
$ git clone https://github.com/kitamuraDev/sample-todo-pwa-app.git
```

2. リポジトリに移動

```bash
$ cd sample-todo-pwa-app
```

3. 依存パッケージをインストール

```bash
$ yarn

or

$ yarn install
```

4. アプリケーションを起動

```bash
$ yarn dev
```

5. アプリケーションをビルド

```bash
$ yarn build
```

6. ビルド結果をプレビュー

```bash
$ yarn preview
```

# 自動ビルドの設定

1. ディレクトリとファイルを作成

```bash
$ mkdir -p .github/workflows/ && touch .github/workflows/deploy.yml
```

2. deploy.yml に以下をコピペ

###### ※基本コピペで動きます。node-version に関してはご自身の Node のバージョンに合わせてください

```yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16]
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'

      - name: Build
        run: |
          yarn install
          yarn build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

# 使用技術

### 言語

![Node.js](https://img.shields.io/badge/Node-v16.10.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.6.3-blue)

### ライブラリ

![React](https://img.shields.io/badge/React-v18.0.0-blue)
![MUI](https://img.shields.io/badge/MUI-v5.8.7-blue)
![reactQrcodeLogo](https://img.shields.io/badge/reactQrcodeLogo-v2.7.0-blue)
![localforage](https://img.shields.io/badge/localforage-v1.10.0-blue)

### ビルドツール

![Vite](https://img.shields.io/badge/Vite-v2.9.9-blue)

### PWA

![vitePluginPwa](https://img.shields.io/badge/vitePluginPwa-v0.12.3-blue)

### リンター・フォーマッター

![ESLint](https://img.shields.io/badge/ESLint-v8.18.0-blue)
![Prettier](https://img.shields.io/badge/Prettier-v2.7.1-blue)

### CI

![GithubActions](https://img.shields.io/badge/GithubActions-Supported-blue)

### ホスティング

![GithubPages](https://img.shields.io/badge/GithubPages-Supported-blue)

# アプリケーション仕様

- Todo CRUD
  - 作成
  - 閲覧
  - 更新
  - 削除
- フィルター
  - すべてのタスク
  - 現在のタスク
  - 完了したタスク
  - ゴミ箱
- ゴミ箱（アーカイブ）内のタスクをまとめて削除
  - まとめて削除を行う前に確認アラートを出す
- QR コード共有
  - アプリの URL を QR コード化して共有
- データ保存
  - ブラウザのデータ保存領域（indexedDB）にデータを保存し、リロードを行ってもデータ保持が行える
  - 同じブラウザでのみ（ブラウザ間ではデータの共有は行われない）
  - あくまでも、"そのデバイスのブラウザ"のデータ領域に保存しているため
- PWA（progressive web app）
  - 端末（デバイス）に WEB アプリをダウンロードできる
  - モバイルアプリのようにサクサク動作する
