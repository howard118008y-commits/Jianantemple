(function () {
  function init() {
    var brand = document.querySelector('a.brand');
    if (!brand) return;

    brand.addEventListener('click', function (e) {
      // 有 session 內歷史就回上一頁；否則讓 <a href="index.html"> 自然導回首頁
      if (window.history && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
