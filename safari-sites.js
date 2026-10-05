/* ==========================================================
   SAFARI — interfaces reconstituées des sites d'inspiration
   Contenu fictif (studios, projets) ; chaque carte ouvre le vrai site.
   Chargé avant safari.js, qui utilise window.SAFARI_UI.
   ========================================================== */
(function() {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Générateur pseudo-aléatoire déterministe : les pages restent identiques d'une ouverture à l'autre
  function rng(seed) {
    var h = 2166136261;
    for (var i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function() { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; };
  }
  function pick(r, list) { return list[Math.floor(r() * list.length)]; }

  var PALETTES = [
    ['#0e0e10', '#f4f1ea', '#ff5a36'], ['#f6f1e7', '#1d1d1f', '#c8a96a'], ['#101820', '#e6f0ff', '#4f7cff'],
    ['#ffe8d6', '#3d2c2e', '#ff7a59'], ['#e9f5ec', '#123524', '#3fae6a'], ['#1b1033', '#f7f0ff', '#b388ff'],
    ['#fff6d6', '#1f1f1f', '#ffb800'], ['#f0f4f8', '#102a43', '#ff4f79'], ['#0b0b0b', '#fafafa', '#c6ff00'],
    ['#fdf0f5', '#4a1032', '#e43f8f'], ['#eaf6ff', '#0b2545', '#13c4a3'], ['#2b2d42', '#edf2f4', '#ef233c']
  ];
  var NAMES = ['Lumen Studio', 'Atelier Nord', 'Oko Agency', 'Maison Vague', 'Field & Form', 'Studio Halo', 'Kiln', 'Parallax Co.',
    'Nébuleuse', 'Brut Collective', 'Orbite', 'Soft Matter', 'Grain Studio', 'Atlas Works', 'Mono & Co', 'Petal', 'Rivage', 'Northbound'];
  var WORDS = ['Crafting calm digital places', 'Design that moves', 'Objects for slow living', 'We build brands', 'Sound, space & light',
    'Natural skincare', 'The future of mobility', 'Ceramics studio', 'Architecture & interiors', 'Independent magazine'];

  // Fausse capture d'écran d'un site (pur CSS)
  function mock(seed, kind) {
    var r = rng(seed), p = pick(r, PALETTES), k = kind || pick(r, ['hero', 'split', 'grid', 'type']);
    var title = pick(r, WORDS);
    var inner = '<span class="mk-nav"><i></i><i></i><i></i></span>';
    if (k === 'hero') inner += '<span class="mk-title">' + esc(title) + '</span><span class="mk-blob" style="--r:' + Math.round(r() * 60 + 20) + '%"></span>';
    if (k === 'split') inner += '<span class="mk-split"><span class="mk-title mk-title--sm">' + esc(title) + '</span><span class="mk-img"></span></span>';
    if (k === 'grid') inner += '<span class="mk-title mk-title--sm">' + esc(title) + '</span><span class="mk-grid"><i></i><i></i><i></i><i></i><i></i><i></i></span>';
    if (k === 'type') inner += '<span class="mk-giant">' + esc(title.split(' ')[0]) + '</span>';
    return '<span class="mk mk--' + k + '" style="--bg:' + p[0] + ';--fg:' + p[1] + ';--ac:' + p[2] + '" aria-hidden="true">' + inner + '</span>';
  }
  // Faux écran d'app mobile
  function phoneMock(seed) {
    var r = rng(seed), p = pick(r, PALETTES);
    var rows = '';
    for (var i = 0; i < 4; i++) rows += '<i style="width:' + Math.round(50 + r() * 45) + '%"></i>';
    return '<span class="mk-phone" style="--bg:' + p[1] + ';--fg:' + p[0] + ';--ac:' + p[2] + '" aria-hidden="true"><span class="mk-phone__bar"></span>' +
      '<span class="mk-phone__card"></span><span class="mk-phone__rows">' + rows + '</span><span class="mk-phone__btn"></span></span>';
  }
  function cards(n, seed, fn) { var out = ''; for (var i = 0; i < n; i++) out += fn(i, rng(seed + i)); return out; }
  function A(url, cls, html, label) {
    return '<a class="' + cls + '" href="' + url + '" target="_blank" rel="noopener"' + (label ? ' aria-label="' + esc(label) + '"' : '') + '>' + html + '</a>';
  }

  var UI = {};

  /* ---------- Awwwards ---------- */
  UI.awwwards = function(s) {
    var u = s.url;
    return '<div class="ui ui-aw">' +
      '<header class="ui-aw__nav"><span class="ui-aw__logo">awwwards.</span><nav><span>Websites</span><span>Collections</span><span>Elements</span><span>Courses</span><span>Jobs</span></nav>' +
      '<span class="ui-aw__actions"><span>Log in</span>' + A(u, 'ui-aw__cta', 'Submit website') + '</span></header>' +
      '<section class="ui-aw__sotd">' + A(u, 'ui-aw__shot', mock('aw-sotd', 'hero')) +
      '<div class="ui-aw__meta"><span class="ui-aw__badge">SOTD</span><p class="ui-aw__kicker">Site of the Day · Oct 5</p><h3>Lumen Studio</h3>' +
      '<p class="ui-aw__by">by <strong>Atelier Nord</strong> from France</p>' +
      '<div class="ui-aw__scores"><span><b>7.92</b>Design</span><span><b>7.40</b>Usability</span><span><b>7.85</b>Creativity</span><span><b>7.60</b>Content</span></div></div></section>' +
      '<div class="ui-aw__head"><h4>Nominees</h4><span class="ui-aw__tabs"><b>All</b><span>Portfolio</span><span>E-commerce</span><span>Animation</span><span>Typography</span></span></div>' +
      '<div class="ui-aw__grid">' + cards(6, 'aw', function(i, r) {
        return A(u, 'ui-aw__card', mock('aw' + i) + '<span class="ui-aw__card-meta"><span><b>' + esc(NAMES[(i * 5 + 3) % NAMES.length]) + '</b><small>' + esc(NAMES[(i * 7 + 1) % NAMES.length]) + '</small></span><em>' + (6.8 + r() * 1.2).toFixed(2) + '</em></span>');
      }) + '</div></div>';
  };

  /* ---------- Godly ---------- */
  UI.godly = function(s) {
    var u = s.url, tags = ['Animation', 'Dark', 'Portfolio', 'Typography', 'WebGL', 'Minimal', 'Colorful', 'Scroll'];
    return '<div class="ui ui-go">' +
      '<header class="ui-go__nav"><span class="ui-go__logo">godly</span><span class="ui-go__search">Search websites…</span>' + A(u, 'ui-go__cta', 'Submit') + '</header>' +
      '<p class="ui-go__lead">Web design inspiration,<br><em>curated for the bold.</em></p>' +
      '<div class="ui-go__tags">' + tags.map(function(t, i) { return '<span' + (i === 0 ? ' class="is-on"' : '') + '>' + t + '</span>'; }).join('') + '</div>' +
      '<div class="ui-go__grid">' + cards(9, 'go', function(i, r) {
        return A(u, 'ui-go__card ui-go__card--' + (i % 3), mock('go' + i, pick(r, ['hero', 'type', 'split'])) + '<span class="ui-go__play" aria-hidden="true">▶</span><span class="ui-go__name">' + esc(NAMES[(i * 3 + 2) % NAMES.length]) + '</span>');
      }) + '</div></div>';
  };

  /* ---------- Siteinspire ---------- */
  UI.siteinspire = function(s) {
    var u = s.url, cats = ['Architecture', 'Fashion', 'Portfolio', 'Studio', 'Food', 'Culture', 'E-commerce', 'Magazine'];
    return '<div class="ui ui-si"><header class="ui-si__nav"><span class="ui-si__logo">siteInspire</span><nav><span>Styles</span><span>Types</span><span>Subjects</span><span>Search</span></nav></header>' +
      '<div class="ui-si__grid">' + cards(12, 'si', function(i, r) {
        return A(u, 'ui-si__card', mock('si' + i) + '<span class="ui-si__name">' + esc(NAMES[(i * 5 + 4) % NAMES.length]) + '</span><span class="ui-si__cat">' + pick(r, cats) + ' · ' + pick(r, cats) + '</span>');
      }) + '</div></div>';
  };

  /* ---------- Land-book ---------- */
  UI.landbook = function(s) {
    var u = s.url, f = ['Landing', 'Portfolio', 'E-commerce', 'Blog', 'SaaS', 'Agency', 'Product', 'Mobile app'];
    return '<div class="ui ui-lb"><header class="ui-lb__nav"><span class="ui-lb__logo">Land-book</span><span class="ui-lb__search">Search 20 000+ designs</span>' + A(u, 'ui-lb__cta', 'Get started') + '</header>' +
      '<div class="ui-lb__body"><aside class="ui-lb__filters"><p>Categories</p>' + f.map(function(x, i) { return '<span' + (i === 0 ? ' class="is-on"' : '') + '>' + x + '</span>'; }).join('') + '</aside>' +
      '<div class="ui-lb__grid">' + cards(9, 'lb', function(i) {
        return A(u, 'ui-lb__card', mock('lb' + i, i % 2 ? 'split' : 'hero') + '<span class="ui-lb__name">' + esc(NAMES[(i * 7 + 2) % NAMES.length]) + '</span>');
      }) + '</div></div></div>';
  };

  /* ---------- Dribbble ---------- */
  UI.dribbble = function(s) {
    var u = s.url, t = ['Discover', 'Animation', 'Branding', 'Illustration', 'Mobile', 'Print', 'Product Design', 'Typography', 'Web Design'];
    return '<div class="ui ui-dr"><header class="ui-dr__nav"><span class="ui-dr__logo">dribbble</span><nav><span>Explore</span><span>Hire a Designer</span><span>Find Jobs</span><span>Blog</span></nav>' +
      '<span class="ui-dr__actions"><span>Log in</span>' + A(u, 'ui-dr__cta', 'Sign up') + '</span></header>' +
      '<div class="ui-dr__filters"><span class="ui-dr__select">Popular ▾</span><span class="ui-dr__tabs">' + t.map(function(x, i) { return '<span' + (i === 0 ? ' class="is-on"' : '') + '>' + x + '</span>'; }).join('') + '</span><span class="ui-dr__select">Filters</span></div>' +
      '<div class="ui-dr__grid">' + cards(12, 'dr', function(i, r) {
        var p = PALETTES[i % PALETTES.length];
        return '<div class="ui-dr__shot">' + A(u, 'ui-dr__img', i % 3 === 1 ? phoneMock('dr' + i) : mock('dr' + i)) +
          '<span class="ui-dr__meta"><span class="ui-dr__av" style="background:' + p[2] + '"></span><b>' + esc(NAMES[(i * 5 + 1) % NAMES.length]) + '</b>' +
          '<small>♥ ' + Math.round(40 + r() * 400) + '</small><small>👁 ' + (r() * 30 + 1).toFixed(1) + 'k</small></span></div>';
      }) + '</div></div>';
  };

  /* ---------- Behance ---------- */
  UI.behance = function(s) {
    var u = s.url;
    return '<div class="ui ui-be"><header class="ui-be__nav"><span class="ui-be__logo">Behance</span><nav><span class="is-on">For You</span><span>Explore</span><span>Assets</span><span>Jobs</span></nav>' +
      '<span class="ui-be__search">Search the creative world at work</span>' + A(u, 'ui-be__cta', 'Sign Up') + '</header>' +
      '<div class="ui-be__chips"><span class="is-on">Recommended</span><span>Graphic Design</span><span>UI/UX</span><span>Branding</span><span>Photography</span><span>Motion</span></div>' +
      '<div class="ui-be__grid">' + cards(8, 'be', function(i, r) {
        return '<div class="ui-be__proj">' + A(u, 'ui-be__img', mock('be' + i)) + (i % 3 === 0 ? '<span class="ui-be__feat">Featured</span>' : '') +
          '<span class="ui-be__meta"><b>' + esc(NAMES[(i * 3 + 5) % NAMES.length]) + ' — Brand identity</b><small>👍 ' + Math.round(80 + r() * 900) + ' · 👁 ' + (r() * 9 + 1).toFixed(1) + 'k</small></span></div>';
      }) + '</div></div>';
  };

  /* ---------- Mobbin ---------- */
  UI.mobbin = function(s) {
    var u = s.url, apps = ['Mira', 'Fern', 'Kilo', 'Nomad', 'Oslo', 'Pulse', 'Tide', 'Vela'];
    return '<div class="ui ui-mo"><header class="ui-mo__nav"><span class="ui-mo__logo">Mobbin</span><span class="ui-mo__seg"><b>iOS</b><span>Android</span><span>Web</span></span>' +
      '<span class="ui-mo__search">Search apps, screens, UI elements…</span>' + A(u, 'ui-mo__cta', 'Join for free') + '</header>' +
      '<div class="ui-mo__chips"><span class="is-on">Apps</span><span>Screens</span><span>UI Elements</span><span>Flows</span></div>' +
      '<div class="ui-mo__grid">' + cards(8, 'mo', function(i) {
        var p = PALETTES[(i * 2 + 1) % PALETTES.length];
        return A(u, 'ui-mo__app', '<span class="ui-mo__screens">' + phoneMock('mo' + i + 'a') + phoneMock('mo' + i + 'b') + phoneMock('mo' + i + 'c') + '</span>' +
          '<span class="ui-mo__meta"><span class="ui-mo__icon" style="background:' + p[2] + '">' + apps[i].charAt(0) + '</span><span><b>' + apps[i] + '</b><small>' + ['Finance', 'Health & Fitness', 'Travel', 'Productivity', 'Food & Drink', 'Lifestyle', 'Music', 'Education'][i] + '</small></span></span>');
      }) + '</div></div>';
  };

  /* ---------- Page Flows ---------- */
  UI.pageflows = function(s) {
    var u = s.url, flows = ['Onboarding', 'Sign up', 'Checkout', 'Upgrading', 'Search', 'Cancelling a subscription', 'Settings', 'Booking'];
    return '<div class="ui ui-pf"><header class="ui-pf__nav"><span class="ui-pf__logo">Page Flows</span><nav><span>Mobile</span><span>Web</span><span>Email</span><span>Pricing</span></nav>' + A(u, 'ui-pf__cta', 'Start free trial') + '</header>' +
      '<h3 class="ui-pf__h">Browse user flows</h3><p class="ui-pf__sub">Recorded user journeys to inspire your next design.</p>' +
      '<div class="ui-pf__grid">' + cards(8, 'pf', function(i, r) {
        return A(u, 'ui-pf__flow', '<span class="ui-pf__video">' + phoneMock('pf' + i) + '<span class="ui-pf__play">▶</span><span class="ui-pf__dur">0:' + (10 + Math.round(r() * 49)) + '</span></span>' +
          '<span class="ui-pf__meta"><b>' + flows[i] + '</b><small>' + esc(NAMES[(i * 5 + 6) % NAMES.length]) + ' · ' + Math.round(6 + r() * 20) + ' steps</small></span>');
      }) + '</div></div>';
  };

  /* ---------- Laws of UX ---------- */
  UI.lawsofux = function(s) {
    var u = s.url, laws = ['Aesthetic-Usability Effect', 'Doherty Threshold', 'Fitts’s Law', 'Goal-Gradient Effect', 'Hick’s Law', 'Jakob’s Law',
      'Law of Common Region', 'Law of Proximity', 'Miller’s Law', 'Peak-End Rule', 'Serial Position Effect', 'Tesler’s Law', 'Von Restorff Effect', 'Zeigarnik Effect'];
    var colors = ['#f2c94c', '#56ccf2', '#bb6bd9', '#6fcf97', '#f2994a', '#eb5757', '#2d9cdb'];
    return '<div class="ui ui-lx"><header class="ui-lx__nav"><span class="ui-lx__logo">Laws of UX</span><nav><span>Articles</span><span>Book</span><span>Resources</span><span>Info</span></nav></header>' +
      '<p class="ui-lx__intro">Laws of UX is a collection of best practices that designers can consider when building user interfaces.</p>' +
      '<div class="ui-lx__grid">' + laws.map(function(l, i) {
        var c = colors[i % colors.length], shape = i % 3;
        var art = shape === 0 ? '<span class="ui-lx__circle" style="background:' + c + '"></span>' :
          shape === 1 ? '<span class="ui-lx__bars"><i style="background:' + c + '"></i><i style="background:' + c + '"></i><i style="background:' + c + '"></i></span>' :
          '<span class="ui-lx__tri" style="border-bottom-color:' + c + '"></span>';
        return A(u, 'ui-lx__card', '<span class="ui-lx__art">' + art + '</span><span class="ui-lx__num">' + String(i + 1).padStart(2, '0') + '</span><span class="ui-lx__name">' + l + '</span>');
      }).join('') + '</div></div>';
  };

  /* ---------- Fonts In Use ---------- */
  UI.fontsinuse = function(s) {
    var u = s.url;
    var uses = [
      ['Northbound Festival', 'Posters', 'Futura', '"Futura", "Avenir Next", sans-serif', 'NORTH—BOUND', '#f3e6d0', '#c0392b'],
      ['Maison Vague', 'Branding', 'Didot', '"Didot", "Bodoni 72", serif', 'Vague', '#1f1f1f', '#f5f0e6'],
      ['Grain Quarterly', 'Magazines', 'Instrument Serif', 'var(--font-serif)', 'Grain', '#e8efe4', '#1f3a2d'],
      ['Kiln Ceramics', 'Packaging', 'Avenir Next', '"Avenir Next", "Avenir", sans-serif', 'KILN', '#d96c3f', '#fff6ec'],
      ['Atlas Works', 'Websites', 'Courier', '"Courier New", Courier, monospace', 'atlas_works', '#0f1c2e', '#9fd3ff'],
      ['Petal Records', 'Album art', 'Georgia', 'Georgia, serif', 'Petal', '#f7d6e0', '#5a1a33']
    ];
    return '<div class="ui ui-fu"><header class="ui-fu__nav"><span class="ui-fu__logo">Fonts In Use</span><nav><span>Uses</span><span>Typefaces</span><span>Formats</span><span>Topics</span><span>Blog</span></nav><span class="ui-fu__search">Search</span></header>' +
      '<h3 class="ui-fu__h">Recently added</h3><div class="ui-fu__grid">' + uses.map(function(x) {
        return A(u, 'ui-fu__use', '<span class="ui-fu__spec" style="background:' + x[5] + ';color:' + x[6] + ';font-family:' + x[3] + '">' + esc(x[4]) + '</span>' +
          '<span class="ui-fu__title">' + esc(x[0]) + '</span><span class="ui-fu__meta"><b>' + esc(x[2]) + '</b> · ' + esc(x[1]) + '</span>');
      }).join('') + '</div></div>';
  };

  /* ---------- Typewolf ---------- */
  UI.typewolf = function(s) {
    var u = s.url, fonts = [['Söhne', 'Grotesque'], ['GT Sectra', 'Serif'], ['Canela', 'Display serif'], ['Untitled Sans', 'Neo-grotesque'], ['Tiempos', 'Serif'], ['Founders Grotesk', 'Grotesque']];
    return '<div class="ui ui-tw"><header class="ui-tw__nav"><span class="ui-tw__logo">Typewolf</span><nav><span>Site of the Day</span><span>Guides</span><span>Fonts</span><span>Free alternatives</span></nav></header>' +
      '<section class="ui-tw__sotd">' + A(u, 'ui-tw__shot', mock('tw-sotd', 'type')) +
      '<div><p class="ui-tw__kicker">Site of the Day</p><h3>Soft Matter</h3><p class="ui-tw__fonts">Fonts used: <b>Canela</b> &amp; <b>Untitled Sans</b></p></div></section>' +
      '<h4 class="ui-tw__h">Trending fonts</h4><ol class="ui-tw__list">' + fonts.map(function(f, i) {
        return '<li>' + A(u, 'ui-tw__font', '<span class="ui-tw__rank">' + (i + 1) + '</span><span class="ui-tw__name">' + esc(f[0]) + '</span><span class="ui-tw__cls">' + esc(f[1]) + '</span>') + '</li>';
      }).join('') + '</ol></div>';
  };

  /* ---------- Coolors (fonctionnel) ---------- */
  var palette = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'], locked = [false, false, false, false, false];
  function hsl2hex(h, s, l) {
    s /= 100; l /= 100;
    var k = function(n) { return (n + h / 30) % 12; }, a = s * Math.min(l, 1 - l);
    var f = function(n) { return Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))).toString(16).padStart(2, '0'); };
    return ('#' + f(0) + f(8) + f(4)).toUpperCase();
  }
  function light(hex) {
    var n = parseInt(hex.slice(1), 16);
    return (0.299 * (n >> 16) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) > 150;
  }
  function generate() {
    var base = Math.random() * 360, mode = Math.floor(Math.random() * 3);
    palette = palette.map(function(c, i) {
      if (locked[i]) return c;
      var h = mode === 0 ? base + i * 18 : mode === 1 ? base + i * 72 : base + (i % 2 ? 180 : 0) + i * 8;
      return hsl2hex((h + 360) % 360, 45 + Math.random() * 40, 25 + i * 12 + Math.random() * 8);
    });
  }
  UI.coolors = function(s) {
    return '<div class="ui ui-co"><header class="ui-co__nav"><span class="ui-co__logo">coolors</span>' +
      '<span class="ui-co__hint">Appuie sur la barre d’espace pour générer une palette !</span>' +
      '<span class="ui-co__tools"><button type="button" class="ui-co__gen" data-co="gen">Générer</button><a class="ui-co__cta" href="' + s.url + '" target="_blank" rel="noopener">Ouvrir Coolors</a></span></header>' +
      '<div class="ui-co__palette" tabindex="0" aria-label="Palette : barre d’espace pour générer">' + palette.map(function(c, i) {
        return '<div class="ui-co__col" style="background:' + c + ';color:' + (light(c) ? '#1d1d1f' : '#fff') + '">' +
          '<button type="button" class="ui-co__hex" data-co="copy" data-i="' + i + '" aria-label="Copier ' + c + '">' + c.slice(1) + '</button>' +
          '<button type="button" class="ui-co__lock' + (locked[i] ? ' is-locked' : '') + '" data-co="lock" data-i="' + i + '" aria-pressed="' + locked[i] + '" aria-label="' + (locked[i] ? 'Déverrouiller' : 'Verrouiller') + ' cette couleur">' + (locked[i] ? '🔒' : '🔓') + '</button></div>';
      }).join('') + '</div></div>';
  };
  UI.coolors.interactive = true;
  UI.coolors.act = function(action, i) {
    if (action === 'gen') generate();
    if (action === 'lock') locked[i] = !locked[i];
    return action === 'copy' ? palette[i] : null;
  };

  /* ---------- Codrops ---------- */
  UI.codrops = function(s) {
    var u = s.url, posts = [['Creating a Liquid Distortion Hover Effect', 'Tutorial'], ['Infinite Scrolling Image Gallery with Smooth Momentum', 'Demo'],
      ['Animated Typography on Scroll', 'Playground'], ['Building a 3D Card Flip with CSS', 'Tutorial'], ['Noise-Based Gradient Backgrounds in WebGL', 'Demo'], ['Magnetic Buttons That Follow the Cursor', 'Snippet']];
    return '<div class="ui ui-cd"><header class="ui-cd__nav"><span class="ui-cd__logo">Codrops</span><nav><span>Tutorials</span><span>Demos</span><span>Playground</span><span>Collective</span></nav></header>' +
      '<div class="ui-cd__grid">' + posts.map(function(p, i) {
        return A(u, 'ui-cd__post' + (i === 0 ? ' ui-cd__post--big' : ''), mock('cd' + i, i % 2 ? 'grid' : 'hero') + '<span class="ui-cd__tag">' + p[1] + '</span><span class="ui-cd__title">' + esc(p[0]) + '</span>');
      }).join('') + '</div></div>';
  };

  window.SAFARI_UI = UI;
})();
