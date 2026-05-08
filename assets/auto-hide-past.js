// auto-hide-past.js
// 通用：活動時間到後 N 小時自動隱藏元素
// 使用方式：在元素加上 data-target="ISO date" 與 data-hide-after-hours="24"
//
// 例：
// <section data-target="2026-05-08T21:00:00+08:00" data-hide-after-hours="24">...</section>
//
// 即活動結束 24 小時後，該元素自動隱藏，毋須手動移除。
(function () {
  function check() {
    const now = Date.now();
    document.querySelectorAll('[data-target][data-hide-after-hours]').forEach(el => {
      const target = new Date(el.dataset.target).getTime();
      if (Number.isNaN(target)) return;
      const hideHours = parseFloat(el.dataset.hideAfterHours) || 0;
      const hideAt = target + hideHours * 3600 * 1000;
      if (now >= hideAt) {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
        el.dataset.eventEnded = 'true';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check);
  } else {
    check();
  }
  // 頁面長時間開著、跨越時點時也會自動隱藏
  setInterval(check, 60 * 1000);
})();
