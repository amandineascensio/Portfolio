(function() {
  var overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.innerHTML = '<div class="page-transition__panel"></div><div class="page-transition__panel"></div><div class="page-transition__panel"></div>';
  document.body.appendChild(overlay);

  var hasLoader = document.getElementById('loader');
  if (!hasLoader) {
    overlay.classList.add('page-transition--entering');
    setTimeout(function() {
      overlay.classList.remove('page-transition--entering');
    }, 600);
  }

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('tel:')) return;
    if (link.getAttribute('target') === '_blank') return;

    e.preventDefault();
    overlay.classList.add('page-transition--leaving');

    setTimeout(function() {
      window.location.href = href;
    }, 500);
  });
})();
