# チE��トセチE��アチE�E

## ユニットテスチE(Jest)

計算ロジチE���E�EgetCarnivoreTargets`など�E��Eユニットテストを実行します、E

### 実行方況E

```bash
cd primal-logic-web

# 全チE��ト実衁E
npm run test:unit

# ウォチE��モード（開発中に便利�E�E
npm run test:unit:watch

# カバレチE��レポ�Eト付き
npm run test:unit:coverage
```

### チE��トファイルの場所

- `src/__tests__/`: ユニットテストファイル
- チE��トファイル吁E `*.test.ts` また�E `*.spec.ts`

## E2EチE��チE(Playwright)

WebアプリのE2EチE��トを実行します、E

### 実行方況E

```bash
cd primal-logic-web

# 全チE��ト実衁E
npm test

# UIモード（視覚的にチE��トを実行！E
npm run test:ui

# ヘッド付きモード（ブラウザを表示�E�E
npm run test:headed
```

## コードフォーマッチE(Prettier)

コード�E自動フォーマットを実行します、E

### 実行方況E

```bash
cd primal-logic-web

# フォーマット実衁E
npm run format

# フォーマットチェチE���E�EI用�E�E
npm run format:check
```

## リンター (ESLint)

コード�E品質チェチE��と自動修正を実行します、E

### 実行方況E

```bash
cd primal-logic-web

# リンターチェチE��
npm run lint

# 自動修正
npm run lint:fix
```


