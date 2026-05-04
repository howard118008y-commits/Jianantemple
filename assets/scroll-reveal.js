/**
 * 滾動進入視窗時，元素淡入並向上滑入
 * 使用 IntersectionObserver，效能好。
 * 同一容器內的兄弟元素會階梯式 stagger 顯現。
 */
(function () {
  // 要套用 reveal 動畫的元素 selector
  const SELECTORS = [
    '.section-head',
    '.ld-summary-card',
    '.ld-purpose-card',
    '.ld-howto-card',
    '.ld-cta-card',
    '.news-card',
    '.event-card',
    '.th-event',
    '.ss-card',
    '.ln-card',
    '.gallery-item',
    '.calendar-card',
    '.zodiac-card',
    '.overview-card',
    '.deity-card',
    '.month-card',
    '.solar-item',
    '.ws-topic',
    '.ws-rule',
    '.ws-schedule-card',
    '.ws-next',
    '.zhushou-card',
    '.zhushou-poster',
    '.join-benefit',
    '.process-card',
    '.taisui-item',
    '.contact-card',
    '.transport-card',
    '.stat-item',
    '.committee-chip',
    '.saint-row',
    '.almanac-overview .overview-card',
    '.countdown-banner',
    '.latest-news .ln-foot',
    '.services-shortcut .ss-head',
    '.services-shortcut .ss-grid'
  ];

  // 不支援 IntersectionObserver 或使用者偏好減少動畫 → 直接全部顯示，不掛動畫
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduceMotion) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', skipAll);
    } else {
      skipAll();
    }
    function skipAll() {
      document.querySelectorAll(SELECTORS.join(',')).forEach(el => {
        el.classList.add('reveal', 'is-visible');
      });
    }
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      // 同一父層內依索引設定 stagger 延遲（最多 6 階）
      const parent = target.parentElement;
      let delay = 0;
      if (parent) {
        const siblings = Array.from(parent.children).filter(
          el => el.classList.contains('reveal')
        );
        const idx = siblings.indexOf(target);
        if (idx >= 0) delay = Math.min(idx * 70, 420);
      }
      target.style.transitionDelay = delay + 'ms';
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  function init() {
    document.querySelectorAll(SELECTORS.join(',')).forEach(el => {
      // 已經顯示在初始視窗內的元素不掛動畫，避免閃爍
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('reveal', 'is-visible');
        return;
      }
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
