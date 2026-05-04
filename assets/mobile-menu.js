/**
 * 行動裝置漢堡選單
 * - 點擊 .mm-toggle 開啟
 * - 全屏 overlay 顯示快速服務、完整選單、聯絡方式
 * - 支援 Esc / 點背景 / × 關閉
 */
(function () {
  // 完整 nav 項目
  const NAV = [
    { href: 'index.html',     label: '首 頁' },
    { href: 'about.html',     label: '關於建安宮' },
    { href: 'services.html',  label: '香客服務' },
    { href: 'wenshi.html',    label: '問 事' },
    { href: 'events.html',    label: '活 動' },
    { href: 'almanac.html',   label: '年 曆' },
    { href: 'deities.html',   label: '神 明' },
    { href: 'fortune.html',   label: '求 籤' },
    { href: 'committee.html', label: '委 員 會' },
    { href: 'contact.html',   label: '聯絡我們' }
  ];

  // 快速服務 6 卡
  const SERVICES = [
    { href: 'wenshi.html',                              label: '問 事',      icon: 'wenshi.svg'        },
    { href: 'services.html#section-zhushou',            label: '祝壽報名',    icon: 'antaisui.svg'      },
    { href: 'light-detail.html?light=guangming',        label: '點光明燈',    icon: 'guangmingdeng.svg' },
    { href: 'light-detail.html?light=caili',            label: '補財庫',      icon: 'bucaiku.svg'       },
    { href: 'fortune.html',                             label: '線上求籤',    icon: 'qiuqian.svg'       },
    { href: 'events.html',                              label: '活動相簿',    icon: 'canbai.svg'        }
  ];

  function buildMenu() {
    const overlay = document.createElement('div');
    overlay.id = 'mobileMenu';
    overlay.className = 'mobile-menu';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');

    overlay.innerHTML = `
      <div class="mm-inner">
        <div class="mm-head">
          <a class="mm-brand" href="index.html">
            <div class="mm-brand-zh">台北建安宮</div>
            <div class="mm-brand-sub">艋舺雙園聖母會</div>
          </a>
          <button class="mm-close" aria-label="關閉選單" type="button">×</button>
        </div>

        <div class="mm-section">
          <div class="mm-section-label">快 ・ 速 ・ 服 ・ 務</div>
          <div class="mm-services">
            ${SERVICES.map(s => `
              <a class="mm-service" href="${s.href}">
                <img src="assets/services/${s.icon}" alt="" loading="lazy">
                <span class="mm-service-name">${s.label}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <div class="mm-section">
          <div class="mm-section-label">完 ・ 整 ・ 選 ・ 單</div>
          <ul class="mm-nav">
            ${NAV.map(n => `
              <li><a href="${n.href}"><span>${n.label}</span><span class="mm-arrow">→</span></a></li>
            `).join('')}
          </ul>
        </div>

        <div class="mm-contact">
          <a href="tel:0981142292" class="mm-contact-btn">
            <span class="mm-contact-icon">📞</span>
            <span class="mm-contact-text">致電 0981-142-292</span>
          </a>
          <a href="https://share.google/DgsapuCFxv6GxUqh1" target="_blank" rel="noopener" class="mm-contact-btn">
            <span class="mm-contact-icon">📍</span>
            <span class="mm-contact-text">Google Maps 找路</span>
          </a>
          <a href="https://www.facebook.com/TaipeiJianGong/" target="_blank" rel="noopener" class="mm-contact-btn">
            <span class="mm-contact-icon">📘</span>
            <span class="mm-contact-text">FB 粉絲專頁</span>
          </a>
        </div>

        <div class="mm-foot">
          <div class="mm-foot-addr">台北市萬華區德昌街 132 巷 1 號 1 樓</div>
          <div class="mm-foot-copy">© 台北建安宮 ・ 艋舺雙園聖母會</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.mm-close').addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });
    return overlay;
  }

  function openMenu() {
    const m = document.getElementById('mobileMenu') || buildMenu();
    requestAnimationFrame(() => {
      m.classList.add('is-open');
      m.setAttribute('aria-hidden', 'false');
    });
    document.body.style.overflow = 'hidden';
    const toggle = document.querySelector('.mm-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    const m = document.getElementById('mobileMenu');
    if (!m) return;
    m.classList.remove('is-open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const toggle = document.querySelector('.mm-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function init() {
    const btn = document.querySelector('.mm-toggle');
    if (!btn) return;
    btn.addEventListener('click', openMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
