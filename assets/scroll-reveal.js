/**
 * 滾動進入視窗時，元素淡入並向上滑入
 * 使用 IntersectionObserver，效能好。
 * 同一容器內的兄弟元素會階梯式 stagger 顯現。
 */
(function () {
  // 一般 reveal（fade + slide，較快）
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
    '.ws-schedule-card',
    '.ws-next',
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

  // 文字較多的區塊：用較慢、距離較長的浮現（需要時間給眼睛閱讀觸發感）
  const SLOW_SELECTORS = [
    '.history-text',
    '.ld-story-content',
    '.zd-meaning-content',
    '.wx-content',
    '.ov-content',
    '.ws-meaning-content',
    '.zhushou-roster',
    '.zhushou-card',
    '.ws-rule',
    '.ws-rules',
    '.rd-prayer-frame'
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
      document.querySelectorAll([...SELECTORS, ...SLOW_SELECTORS].join(',')).forEach(el => {
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
          el => el.classList.contains('reveal') || el.classList.contains('reveal-slow')
        );
        const idx = siblings.indexOf(target);
        if (idx >= 0) {
          // 慢類間距較大、最多 4 階；快類維持 70ms
          const isSlow = target.classList.contains('reveal-slow');
          const step = isSlow ? 140 : 70;
          const cap = isSlow ? 560 : 420;
          delay = Math.min(idx * step, cap);
        }
      }
      target.style.transitionDelay = delay + 'ms';
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  function tagAndObserve(selector, className) {
    document.querySelectorAll(selector).forEach(el => {
      // 避免重複（slow 跟 fast 衝突時，先到的類別贏）
      if (el.classList.contains('reveal') || el.classList.contains('reveal-slow')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add(className, 'is-visible');
        return;
      }
      el.classList.add(className);
      observer.observe(el);
    });
  }

  function init() {
    // 慢類先處理（避免某些元素同時匹配兩組時被快類覆蓋）
    tagAndObserve(SLOW_SELECTORS.join(','), 'reveal-slow');
    tagAndObserve(SELECTORS.join(','), 'reveal');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
