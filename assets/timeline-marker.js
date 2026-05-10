// 時間軸「即將舉辦」標記自動定位
// 依今日日期，把 .th-marker-today 移到第一個尚未發生的事件之前。
// 同時根據 data-date 重新標記 th-past / th-future（保留既有 th-feature）。
(function () {
  function reposition() {
    const marker = document.querySelector('.th-marker-today');
    if (!marker) return;

    const track = marker.parentNode;
    if (!track) return;

    // 取出所有有 data-date 的事件
    const events = Array.from(track.querySelectorAll('.th-event[data-date]'));
    if (!events.length) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();

    let firstFuture = null;

    events.forEach(ev => {
      const d = new Date(ev.dataset.date + 'T00:00:00');
      if (d.getTime() < todayMs) {
        ev.classList.add('th-past');
        ev.classList.remove('th-future');
      } else {
        ev.classList.remove('th-past');
        ev.classList.add('th-future');
        if (!firstFuture) firstFuture = ev;
      }
    });

    // 若所有事件皆已過 → 隱藏標記
    if (!firstFuture) {
      marker.style.display = 'none';
      return;
    }
    marker.style.display = '';

    // 把標記移到第一個未來事件之前
    if (marker.nextElementSibling !== firstFuture) {
      track.insertBefore(marker, firstFuture);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reposition);
  } else {
    reposition();
  }
})();
