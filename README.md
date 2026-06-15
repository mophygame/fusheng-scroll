# 浮生卷

古風乙女破關遊戲的序章原型。第一段流程為：

`標題場景 → 古書卷店 → 店主對話 → 五卷命書 → 男主路線預告`

## 本機預覽

```bash
npm start
```

開啟終端顯示的本機網址。音效使用 Web Audio API 即時合成，不需要額外音訊檔案。

## 發布到 GitHub Pages

專案已包含 `.github/workflows/deploy-pages.yml`。將專案推送到 GitHub 的
`main` 分支後，到 repository 的：

`Settings → Pages → Build and deployment → Source`

選擇 `GitHub Actions`。工作流程成功後，網站會發布在：

`https://<GitHub 帳號>.github.io/<repository 名稱>/`

之後每次推送到 `main`，網站都會自動更新。

## 遊戲架構

- `GAME_STATE`：對應 Cocos 的場景/狀態切換。
- `OtomeGame`：序章流程控制器，可拆成 Cocos Creator Component。
- `AudioDirector`：統一管理 UI、轉場與環境音。
- `dialogue`：對話資料，後續可改為 JSON 劇本。
- `routes`：五位男主的書卷與章節資料。

目前環境未安裝 Cocos Creator，因此這一版先提供零依賴、可直接驗收的 Web 原型。正式移入 Cocos Creator 時，可將每個 state 拆成 Scene/Prefab，對話與路線資料可直接沿用。
