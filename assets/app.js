(function () {
  // 年份
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 移动端菜单
  var btn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // 数字滚动
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = 1100, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // 滚动进场
  var items = document.querySelectorAll('.card, .stats li, .chips span, .sec-title, .sec-sub');
  items.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          if (en.target.hasAttribute('data-count')) countUp(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
