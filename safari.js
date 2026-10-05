/* ==========================================================
   SAFARI — onglets d'inspiration pour webdesigner
   Les sites d'inspiration refusent d'être affichés dans une autre
   page : chaque onglet montre une interface reconstituée
   (safari-sites.js) et ouvre le vrai site à part.
   ========================================================== */
(function() {
  var win = document.getElementById('win-safari');
  if (!win) return;

  /* ---------- Signets ---------- */
  var SITES = [
    { id: 'awwwards', name: 'Awwwards', domain: 'awwwards.com', url: 'https://www.awwwards.com', color: '#1f1f1f', cat: 'Sites web' },
    { id: 'godly', name: 'Godly', domain: 'godly.website', url: 'https://godly.website', color: '#ff5a36', cat: 'Sites web' },
    { id: 'siteinspire', name: 'Siteinspire', domain: 'siteinspire.com', url: 'https://www.siteinspire.com', color: '#3d5a80', cat: 'Sites web' },
    { id: 'landbook', name: 'Land-book', domain: 'land-book.com', url: 'https://land-book.com', color: '#6c63ff', cat: 'Sites web' },
    { id: 'dribbble', name: 'Dribbble', domain: 'dribbble.com', url: 'https://dribbble.com', color: '#e2557f', cat: 'UI & mobile' },
    { id: 'behance', name: 'Behance', domain: 'behance.net', url: 'https://www.behance.net', color: '#1769ff', cat: 'UI & mobile' },
    { id: 'mobbin', name: 'Mobbin', domain: 'mobbin.com', url: 'https://mobbin.com', color: '#111827', cat: 'UI & mobile' },
    { id: 'pageflows', name: 'Page Flows', domain: 'pageflows.com', url: 'https://pageflows.com', color: '#0f9d76', cat: 'UX' },
    { id: 'lawsofux', name: 'Laws of UX', domain: 'lawsofux.com', url: 'https://lawsofux.com', color: '#f2c94c', cat: 'UX' },
    { id: 'fontsinuse', name: 'Fonts In Use', domain: 'fontsinuse.com', url: 'https://fontsinuse.com', color: '#c0392b', cat: 'Typographie' },
    { id: 'typewolf', name: 'Typewolf', domain: 'typewolf.com', url: 'https://www.typewolf.com', color: '#2d2d2d', cat: 'Typographie' },
    { id: 'coolors', name: 'Coolors', domain: 'coolors.co', url: 'https://coolors.co', color: '#2b6cb0', cat: 'Couleurs' },
    { id: 'codrops', name: 'Codrops', domain: 'tympanus.net/codrops', url: 'https://tympanus.net/codrops', color: '#9b51e0', cat: 'Interactions' }
  ];
  var CATS = ['Sites web', 'UI & mobile', 'UX', 'Typographie', 'Couleurs', 'Interactions'];
  var byId = {};
  SITES.forEach(function(s) { byId[s.id] = s; });

  /* ---------- État ---------- */
  var OPEN = ['awwwards', 'godly', 'mobbin', 'fontsinuse', 'lawsofux'];
  var tabs = OPEN.map(function(id, i) { return { key: i + 1, history: [id], index: 0 }; });
  var nextKey = tabs.length + 1;
  var active = tabs[0].key;

  var tabsEl = document.getElementById('sfTabs');
  var pageEl = document.getElementById('sfPage');
  var sidebarEl = document.getElementById('sfSidebar');
  var urlEl = document.getElementById('sfUrl');
  var addrIcon = document.getElementById('sfAddrIcon');
  var backBtn = document.getElementById('sfBack');
  var fwdBtn = document.getElementById('sfForward');
  var toastEl = document.getElementById('sfToast');

  var LOCK = '<svg viewBox="0 0 20 20"><rect x="5" y="9" width="10" height="7.5" rx="1.6" fill="currentColor"/><path d="M7 9V7a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
  var SEARCH = '<svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  var CLOSE = '<svg viewBox="0 0 12 12"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  var ARROW = '<svg viewBox="0 0 16 16"><path d="M5.5 10.5l5-5M6 5.5h4.5V10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function tab() { return tabs.filter(function(t) { return t.key === active; })[0]; }
  function current() { var t = tab(); return t.history[t.index]; }
  function tile(s, cls) {
    return '<span class="sf-tile' + (cls ? ' ' + cls : '') + '" style="--c:' + s.color + '" aria-hidden="true">' + esc(s.name.charAt(0)) + '</span>';
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toast.t);
    toast.t = setTimeout(function() { toastEl.classList.remove('is-visible'); }, 1800);
  }

  /* ---------- Onglets ---------- */
  function renderTabs() {
    tabsEl.innerHTML = tabs.map(function(t) {
      var id = t.history[t.index], s = byId[id], on = t.key === active;
      var title = s ? s.name : 'Page de démarrage';
      return '<div class="sf-tab' + (on ? ' is-active' : '') + '" role="presentation">' +
        '<button type="button" class="sf-tab__main" role="tab" id="sf-tab-' + t.key + '" aria-selected="' + on + '" aria-controls="sfPage" data-key="' + t.key + '" title="' + esc(title) + '">' +
        (s ? tile(s, 'sf-tile--xs') : '<span class="sf-tile sf-tile--xs sf-tile--start" aria-hidden="true">★</span>') +
        '<span class="sf-tab__title">' + esc(title) + '</span></button>' +
        '<button type="button" class="sf-tab__close" data-close-tab="' + t.key + '" aria-label="Fermer l’onglet ' + esc(title) + '">' + CLOSE + '</button></div>';
    }).join('');
  }

  tabsEl.addEventListener('click', function(e) {
    var c = e.target.closest('[data-close-tab]');
    if (c) { closeTab(+c.dataset.closeTab); return; }
    var b = e.target.closest('.sf-tab__main');
    if (b) select(+b.dataset.key);
  });
  tabsEl.addEventListener('keydown', function(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var i = tabs.indexOf(tab()), n = tabs.length;
    var t = tabs[(i + (e.key === 'ArrowRight' ? 1 : n - 1)) % n];
    select(t.key);
    document.getElementById('sf-tab-' + t.key).focus();
  });

  function select(key) { active = key; render(); }

  function newTab(id) {
    var t = { key: nextKey++, history: [id || 'start'], index: 0 };
    tabs.push(t);
    active = t.key;
    render();
    if (!id) urlEl.focus();
    var el = tabsEl.lastElementChild;
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function closeTab(key) {
    var i = tabs.map(function(t) { return t.key; }).indexOf(key);
    if (i === -1) return;
    tabs.splice(i, 1);
    if (!tabs.length) { newTab(); return; }
    if (key === active) active = tabs[Math.min(i, tabs.length - 1)].key;
    render();
  }

  /* ---------- Navigation ---------- */
  function go(id) {
    var t = tab();
    if (t.history[t.index] === id) { render(); return; }
    t.history = t.history.slice(0, t.index + 1).concat(id);
    t.index++;
    render();
  }
  backBtn.addEventListener('click', function() { var t = tab(); if (t.index > 0) { t.index--; render(); } });
  fwdBtn.addEventListener('click', function() { var t = tab(); if (t.index < t.history.length - 1) { t.index++; render(); } });
  document.getElementById('sfReload').addEventListener('click', function() { render(true); });
  document.getElementById('sfNewTab').addEventListener('click', function() { newTab(); });

  document.getElementById('sfShare').addEventListener('click', function() {
    var s = byId[current()];
    var url = s ? s.url : location.href.split('#')[0] + '#win-safari';
    var done = function() { toast('Lien copié'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function() { toast(url); });
    else toast(url);
  });

  /* ---------- Champ d'adresse ---------- */
  function syncAddress() {
    var s = byId[current()];
    urlEl.value = s ? s.domain : '';
    addrIcon.innerHTML = s ? LOCK : SEARCH;
    win.querySelector('.sf-address').classList.toggle('is-empty', !s);
  }
  urlEl.addEventListener('focus', function() {
    var s = byId[current()];
    if (s) urlEl.value = s.url;
    urlEl.select();
  });
  urlEl.addEventListener('blur', function() { setTimeout(syncAddress, 120); });
  urlEl.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { e.stopPropagation(); urlEl.blur(); }
  });
  document.getElementById('sfAddress').addEventListener('submit', function(e) {
    e.preventDefault();
    var q = urlEl.value.trim();
    if (!q) return;
    var low = q.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    var bare = low.replace(/[\s-]/g, '');
    var hit = SITES.filter(function(s) {
      var name = s.name.toLowerCase().replace(/[\s-]/g, '');
      return low.indexOf(s.domain) === 0 || s.domain.indexOf(low) === 0 || name.indexOf(bare) === 0;
    })[0];
    urlEl.blur();
    if (hit) { go(hit.id); return; }
    // Hors signets : ouverture dans un vrai onglet du navigateur
    var isUrl = /^[^\s]+\.[a-z]{2,}(\/.*)?$/i.test(low);
    var target = isUrl ? 'https://' + low : 'https://www.google.com/search?q=' + encodeURIComponent(q);
    window.open(target, '_blank', 'noopener');
    toast('Ouvert dans un nouvel onglet du navigateur');
  });

  /* ---------- Barre latérale ---------- */
  var sideBtn = document.getElementById('sfSidebarBtn');
  sideBtn.addEventListener('click', function() {
    var open = sidebarEl.hidden;
    sidebarEl.hidden = !open;
    sideBtn.setAttribute('aria-pressed', open ? 'true' : 'false');
    win.classList.toggle('has-sidebar', open);
  });
  function renderSidebar() {
    var cur = current();
    sidebarEl.innerHTML = '<p class="sf-side__title">Signets</p>' + CATS.map(function(cat) {
      return '<p class="sf-side__cat">' + esc(cat) + '</p><ul>' + SITES.filter(function(s) { return s.cat === cat; }).map(function(s) {
        return '<li><button type="button" class="sf-side__item' + (s.id === cur ? ' is-active' : '') + '" data-go="' + s.id + '">' + tile(s, 'sf-tile--xs') + '<span>' + esc(s.name) + '</span></button></li>';
      }).join('') + '</ul>';
    }).join('');
  }

  // Liens internes (signets, favoris, « dans la même veine »)
  win.addEventListener('click', function(e) {
    var g = e.target.closest('[data-go]');
    if (g) { e.preventDefault(); go(g.dataset.go); pageEl.focus({ preventScroll: true }); }
  });

  /* ---------- Pages ---------- */
  function startPage() {
    return '<div class="sf-start">' +
      '<section class="sf-start__sec"><h3 class="sf-h">Favoris</h3><ul class="sf-favs">' +
      SITES.map(function(s) {
        return '<li><button type="button" class="sf-fav" data-go="' + s.id + '">' + tile(s, 'sf-tile--lg') + '<span>' + esc(s.name) + '</span></button></li>';
      }).join('') + '</ul></section>' +
      '<section class="sf-start__sec"><h3 class="sf-h">Rapport de confidentialité</h3>' +
      '<div class="sf-privacy"><span class="sf-privacy__shield" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z" fill="currentColor"/><path d="M8.8 12.2l2.2 2.2 4.2-4.6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<p><strong>0 traqueur</strong> sur ce portfolio. Pas de cookies publicitaires, pas de statistiques cachées : juste du design.</p></div></section>' +
      '<section class="sf-start__sec"><h3 class="sf-h">Par thème</h3><div class="sf-cats">' +
      CATS.map(function(cat) {
        var list = SITES.filter(function(s) { return s.cat === cat; });
        return '<div class="sf-cat"><p class="sf-cat__name">' + esc(cat) + '</p><p class="sf-cat__list">' + list.map(function(s) {
          return '<button type="button" class="sf-link" data-go="' + s.id + '">' + esc(s.name) + '</button>';
        }).join('<span aria-hidden="true"> · </span>') + '</p></div>';
      }).join('') + '</div></section></div>';
  }

  var UI = window.SAFARI_UI || {};
  function sitePage(s) {
    return (UI[s.id] ? UI[s.id](s) : '') +
      '<p class="sf-real"><span>Aperçu reconstitué</span><a href="' + s.url + '" target="_blank" rel="noopener">Ouvrir le vrai site ' + ARROW + '</a></p>';
  }

  // Coolors : générateur de palettes fonctionnel (barre d'espace, copie, verrou)
  function coolors(action, i, refocus) {
    var hex = UI.coolors.act(action, i);
    if (hex) {
      var done = function() { toast(hex + ' copié'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(hex).then(done, function() { toast(hex); });
      else toast(hex);
      return;
    }
    pageEl.innerHTML = sitePage(byId.coolors);
    var el = pageEl.querySelector(refocus);
    if (el) el.focus();
  }
  pageEl.addEventListener('click', function(e) {
    var b = e.target.closest('[data-co]');
    if (!b) return;
    var sel = b.dataset.co === 'gen' ? '[data-co="gen"]' : b.dataset.co === 'lock' ? '[data-co="lock"][data-i="' + b.dataset.i + '"]' : null;
    coolors(b.dataset.co, +b.dataset.i, sel);
  });
  pageEl.addEventListener('keydown', function(e) {
    if (current() !== 'coolors' || e.key !== ' ' || e.target.closest('button, a, input')) return;
    e.preventDefault();
    coolors('gen', 0, '.ui-co__palette');
  });

  function render(reload) {
    var id = current(), s = byId[id], t = tab();
    pageEl.innerHTML = s ? sitePage(s) : startPage();
    pageEl.setAttribute('aria-labelledby', 'sf-tab-' + active);
    pageEl.scrollTop = 0;
    pageEl.classList.remove('is-loading');
    void pageEl.offsetWidth;
    pageEl.classList.add('is-loading'); // petite animation de chargement
    backBtn.disabled = t.index === 0;
    fwdBtn.disabled = t.index >= t.history.length - 1;
    renderTabs();
    renderSidebar();
    syncAddress();
    if (reload) toast('Page actualisée');
  }

  // Ouvre un site depuis une autre app (liens partagés dans Slack)
  window.safariGo = function(id) {
    if (!byId[id]) return;
    var t = tabs.filter(function(x) { return x.history[x.index] === id; })[0];
    if (t) select(t.key); else newTab(id);
  };

  render();
})();
