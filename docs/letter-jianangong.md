# 建安宮官網交接信

（2026-08-21 全新建立：本 repo 首份交接信，由「農曆七月慈悲月辦事公告上線」session 撰寫）

## 當前狀態快照

- HEAD：`06f283a` fix(cibeimonth): 審查修正・og:image URL 編碼、9/12 凌晨自動下架、恢復後文案防呆
  - 重驗：`git log --oneline -3`（應見 06f283a / 174bde9 / ca14ef3 三個 cibeimonth commit）
- 部署：GitHub Pages（push main 後 1–5 分鐘自動建置）
  - 重驗：`curl -s https://taipeijianantemple.com.tw/index.html | grep -c 慈悲月` → 9
  - 重驗：`curl -s -o /dev/null -w "%{http_code}" "https://taipeijianantemple.com.tw/1150821%E8%BE%A6%E4%BA%8B%E5%85%AC%E5%91%8A/%E8%BE%A6%E4%BA%8B%E5%85%AC%E5%91%8A.jpg"` → 200
- 全站健康（2026-08-21 巡檢）：正式站 17 頁 console error 0、4xx/5xx 資源 0；index/about/wenshi HTML 標籤平衡、無重複 id
- 現行公告：農曆七月（2026-08-13～09-10）暫停問事，國曆 9/11（五）恢復；公告區塊掛在 index / about / wenshi 三頁，`data-target="2026-09-11T00:00:00+08:00"` + `data-hide-after-hours="24"` → 9/12 00:00 自動下架

## 可複用資產／程序

- **公告上線流程**：`.claude/commands/活動skill.md`（活動型）；純公告型（無照片相簿）照本次 cibeimonth 模式：海報壓 JPG 進 `115MMDD名稱/` 資料夾 → index 公告區＋OG → about news 卡＋CTA → 主題頁海報區 → auto-hide 屬性
- **自動下架**：`assets/auto-hide-past.js`，元素掛 `data-target`（ISO 時間）＋`data-hide-after-hours`（target 後 N 小時隱藏）。**wenshi.html 直到本次才補載此 script**，新頁面要用 auto-hide 先確認有 `<script src="assets/auto-hide-past.js" defer>`
- **問事倒數**：wenshi.html 內嵌 JS `GHOST_MONTHS`（2026–2032 鬼月國曆區間，wenshi.html:675）自動跳過鬼月找下一個週一/三 20:30；about.html 也有一份同步邏輯（about.html:1001 附近）
- **全站巡檢 script**：scratchpad 內 audit.js / shot.js（session 結束即失效；模式：Playwright + executablePath 指向 `~/Library/Caches/ms-playwright/chromium-1234/.../Google Chrome for Testing`，NODE_PATH 用 `~/.npm/_npx/*/node_modules`）
- **雷點繞法**見 memory：`defer-script-timing-bug`、下方「雷點」節

## 未竟任務

**硬期限相關**
1. 【2026-09-11 後】慈悲月公告收尾：4 處靜態文案手動改——詳見 memory: `cibeimonth-cleanup-after-0911`（服務卡小字、about CTA 日期、news 卡降級、OG 換 10/19 中壇元帥聖誕）
2. 【2026-10-19】中壇元帥聖誕（九月初九）：目前只在 events 年表；屆時照 `活動skill` 全流程上線（repo 根目錄已有素材候選：`千順將軍木吒二太子生日照片/`）

**可選不急**
- repo 根目錄散置素材待歸位/選用：`建安宮程po文/`（6 張 FB po 文圖）、`天上聖母聖誕建安宮.jpg`、`建安宮舞龍舞獅４.jpg`、`端午節圖片.jpg`（Sir 說「整理」時跑 /整理 skill）

**日常常態**
- 新活動上線一律走 `.claude/commands/活動skill.md` 檢查清單

## 等使用者的事項

- 無 blocker。10/19 活動的公告文字與海報屆時由 Sir 提供
- 待補行銷 ID/連結清單見 memory: `jianangong_pending_inputs`

## 雷點（本 session 實測）

- **本機 http.server 測試**：port 常被其他專案舊 server 佔走（8931/8932 都是 goshoot 殭屍 server，cwd 在 goshoot/site），起 server 後必先 `lsof -iTCP:<port> -sTCP:LISTEN` 確認 pid 是自己的，並用 `--directory` 顯式指定
- **Playwright MCP 截圖**：本站有每秒倒數計時的頁面（wenshi/about）`browser_take_screenshot` 會逾時；改用 `npx playwright screenshot` CLI 或自寫 script 用元素截圖。全頁截圖大片黑色＝scroll-reveal 未觸發，非 bug
- **sips `--cropOffset` 在此 mac 無效**（裁圖靜默輸出同一張），裁圖用 ffmpeg crop
- **中文檔名 og:image 必須百分比編碼**（06f283a 修過）
