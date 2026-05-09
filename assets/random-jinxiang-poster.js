// 隨機進香照片作為影片 poster
// 影片無法自動播放或載入失敗時，瀏覽器顯示 poster；
// 此 script 在頁面載入時，把 poster 換成 assets/jinxiang-115/ 中的隨機一張，
// 取代原先固定的圖。
(function () {
  // 25 個 part 資料夾，前 24 個各 28 張，第 25 個 5 張
  function pickRandomPhoto() {
    const part = Math.floor(Math.random() * 25) + 1;
    const max = part === 25 ? 5 : 28;
    const photo = Math.floor(Math.random() * max) + 1;
    const padded = String(photo).padStart(3, '0');
    return `assets/jinxiang-115/part-${part}/jx-${padded}.jpg`;
  }

  function applyToVideos() {
    const videos = document.querySelectorAll('video.bg-video, video.banner-video, video#bgVideo');
    videos.forEach(v => {
      const src = pickRandomPhoto();
      v.poster = src;
      // 若影片無法播放（autoplay 被擋、檔案載入失敗等）→ 用 img fallback 顯示
      v.addEventListener('error', () => showImageFallback(v, src), { once: true });
      v.addEventListener('stalled', () => showImageFallback(v, src), { once: true });
    });
  }

  function showImageFallback(video, src) {
    if (video.dataset.fallbackShown === '1') return;
    // 影片明顯無法播放才換 → 已在播 (currentTime > 0) 就跳過
    if (video.currentTime > 0 && !video.paused) return;
    const img = document.createElement('img');
    img.src = src;
    img.alt = '建安宮進香影像';
    img.loading = 'eager';
    // 複製影片的 class 與部分 inline 樣式
    img.className = video.className + ' video-fallback-img';
    img.style.cssText = video.style.cssText + 'object-fit:cover;width:100%;height:100%;display:block;';
    if (video.parentNode) {
      video.parentNode.replaceChild(img, video);
    }
    video.dataset.fallbackShown = '1';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToVideos);
  } else {
    applyToVideos();
  }
})();
