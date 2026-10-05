/* ==========================================================
   FIGMA FICTIF — canevas des projets (MASM, Spoonia, BeatWay)
   ========================================================== */
(function() {
  var win = document.getElementById('win-figma');
  if (!win) return;

  var IMG = 'assets/images/figma/';

  /* ---------- Données ---------- */
  function phone(id, name, img, h) { return { id: id, name: name, img: [IMG + img], w: 393, h: h || 852, kind: 'iPhone 15' }; }

  var PAGES = {
    masm: {
      name: 'MASM', title: 'MASM menuiserie', caseUrl: 'projet-masm.html',
      colors: [['Bois', '#84645C'], ['Brun foncé', '#54443C'], ['Sable', '#DCC4AC'], ['Crème', '#F4F4EC']],
      sections: [
        { id: 'masm-site', name: 'Site vitrine — Desktop', rows: [[
          { id: 'masm-accueil', name: 'Accueil', img: [IMG + 'masm-accueil-1.webp', IMG + 'masm-accueil-2.webp'], w: 1512, h: 5466, kind: 'Desktop' }
        ]] },
        { id: 'masm-pres', name: 'Présentation', rows: [[
          { id: 'masm-mockup', name: 'Mockup iPhone', img: [IMG + 'masm-mockup.webp'], w: 700, h: 1050, kind: 'Image' }
        ]] }
      ],
      flows: [],
      comment: { frame: 'masm-accueil', text: 'Le bois et le beige posent tout de suite le ton artisanal 🪵' },
      start: 'top'
    },
    spoonia: {
      name: 'Spoonia', title: 'Spoonia', caseUrl: 'projet-spoonia.html',
      colors: [['Orange', '#F4742C'], ['Crème', '#FCF4EC'], ['Ciel', '#CCECF4'], ['Vanille', '#FCECC4']],
      // [id, nom, image, hauteur] — rangées de 8 écrans maximum
      sections: [
        ['sp-onb', "Onboarding", [
          ['sp-onb-1', "Onboarding 1/3", 'sp-onboarding-1.webp', 857],
          ['sp-onb-2', "Onboarding 2/3", 'sp-onboarding-2.webp', 857],
          ['sp-onb-3', "Onboarding 3/3", 'sp-onboarding-3.webp', 857]
        ]],
        ['sp-auth', "Connexion", [
          ['sp-connexion', "Se connecter", 'sp-connexion.webp', 857],
          ['sp-inscription', "Créer un compte", 'sp-inscription.webp', 857],
          ['sp-mot-de-passe-oublie', "Mot de passe oublié", 'sp-mot-de-passe-oublie.webp', 857],
          ['sp-mot-de-passe-oublie-1', "Mot de passe oublié — envoyé", 'sp-mot-de-passe-oublie-1.webp', 857]
        ]],
        ['sp-quest', "Questionnaire", [
          ['sp-q1', "Questionnaire 1", 'sp-questionnaire-1.webp', 1047],
          ['sp-q2', "Questionnaire 2", 'sp-questionnaire-2.webp', 1047],
          ['sp-questionnaire-3', "Questionnaire 3", 'sp-questionnaire-3.webp', 1523],
          ['sp-questionnaire-4', "Questionnaire 4", 'sp-questionnaire-4.webp', 2071],
          ['sp-questionnaire-5', "Questionnaire 5", 'sp-questionnaire-5.webp', 1305],
          ['sp-questionnaire-6', "Questionnaire 6", 'sp-questionnaire-6.webp', 1526],
          ['sp-questionnaire-7', "Questionnaire 7", 'sp-questionnaire-7.webp', 1047],
          ['sp-questionnaire-8', "Questionnaire 8", 'sp-questionnaire-8.webp', 1047],
          ['sp-questionnaire-9', "Questionnaire 9", 'sp-questionnaire-9.webp', 1523],
          ['sp-questionnaire-10', "Questionnaire 10", 'sp-questionnaire-10.webp', 2071],
          ['sp-questionnaire-11', "Questionnaire 11", 'sp-questionnaire-11.webp', 1305],
          ['sp-questionnaire-12', "Questionnaire 12", 'sp-questionnaire-12.webp', 1526]
        ]],
        ['sp-app', "Application", [
          ['sp-dashboard-vide', "Dashboard — vide", 'sp-dashboard-vide.webp', 1597],
          ['sp-dashboard-1', "Dashboard — matin", 'sp-dashboard-1.webp', 1597],
          ['sp-dashboard', "Dashboard", 'sp-dashboard.webp', 877],
          ['sp-ajout', "Ajouter un repas", 'sp-ajout.webp', 857],
          ['sp-add-collation', "Ajouter une collation", 'sp-add-collation.webp', 857],
          ['sp-recherche', "Recherche", 'sp-recherche.webp', 2114],
          ['sp-favoris', "Favoris", 'sp-favoris.webp', 1683],
          ['sp-donnees', "Données", 'sp-donnees.webp', 1647],
          ['sp-profil', "Profil", 'sp-profil.webp', 857]
        ]],
        ['sp-food', "Fiches aliments", [
          ['sp-aubergine', "Aubergine", 'sp-aubergine.webp', 1278],
          ['sp-avocat', "Avocat", 'sp-avocat.webp', 1386],
          ['sp-brocolis', "Brocolis", 'sp-brocolis.webp', 1410],
          ['sp-carotte', "Carotte", 'sp-carotte.webp', 1278],
          ['sp-cerise', "Cerise", 'sp-cerise.webp', 1241],
          ['sp-citron', "Citron", 'sp-citron.webp', 1243],
          ['sp-kiwi', "Kiwi", 'sp-kiwi.webp', 1253],
          ['sp-mais', "Maïs", 'sp-mais.webp', 1313],
          ['sp-orange', "Orange", 'sp-orange.webp', 1146],
          ['sp-pasteque', "Pastèque", 'sp-pasteque.webp', 1459],
          ['sp-poire', "Poire", 'sp-poire.webp', 1133],
          ['sp-pomme', "Pomme", 'sp-pomme.webp', 1028],
          ['sp-raisin', "Raisin", 'sp-raisin.webp', 1133],
          ['sp-salade', "Salade", 'sp-salade.webp', 1229],
          ['sp-tomate', "Tomate", 'sp-tomate.webp', 1386]
        ]],
        ['sp-alerts', "Alertes", [
          ['sp-alertes', "Mes alertes", 'sp-alertes.webp', 857],
          ['sp-creer-alerte', "Créer une alerte", 'sp-creer-alerte.webp', 857],
          ['sp-modifier-l-alerte', "Modifier l'alerte", 'sp-modifier-l-alerte.webp', 857],
          ['sp-alerte-supprimee', "Alerte supprimée", 'sp-alerte-supprimee.webp', 857]
        ]],
        ['sp-sante', "Dossier santé", [
          ['sp-dossier', "Dossier santé", 'sp-dossier.webp', 857],
          ['sp-modifier-dossier', "Modifier dossier", 'sp-modifier-dossier.webp', 2215],
          ['sp-objectif', "Objectif", 'sp-objectif.webp', 857],
          ['sp-stade-physiologique-actuel', "Stade physiologique actuel", 'sp-stade-physiologique-actuel.webp', 857],
          ['sp-niveau-d-activite-physique', "Niveau d'activité physique", 'sp-niveau-d-activite-physique.webp', 857],
          ['sp-qualite-du-sommeil-habituelle', "Qualité du sommeil habituelle", 'sp-qualite-du-sommeil-habituelle.webp', 857],
          ['sp-regime-alimentaire', "Régime alimentaire", 'sp-regime-alimentaire.webp', 857],
          ['sp-allergies', "Allergies", 'sp-allergies.webp', 1005],
          ['sp-symptomes', "Symptômes", 'sp-symptomes.webp', 1015],
          ['sp-toubles-digestifs-auto-immuns', "Troubles digestifs & auto-immuns", 'sp-toubles-digestifs-auto-immuns.webp', 857],
          ['sp-troubles-metaboliques', "Troubles métaboliques", 'sp-troubles-metaboliques.webp', 857],
          ['sp-endocrinologie-rein', "Endocrinologie & rein", 'sp-endocrinologie-rein.webp', 857],
          ['sp-chirurgie-digestive', "Chirurgie digestive", 'sp-chirurgie-digestive.webp', 857],
          ['sp-medicaments-qui-influencent', "Médicaments", 'sp-medicaments-qui-influencent.webp', 857],
          ['sp-prise-de-complements-alimentaires-actuels', "Compléments alimentaires", 'sp-prise-de-complements-alimentaires-actuels.webp', 857]
        ]]
      ].map(function(sec) {
        var list = sec[2].map(function(f) { return phone(f[0], f[1], f[2], f[3]); });
        var rows = [];
        for (var i = 0; i < list.length; i += 8) rows.push(list.slice(i, i + 8));
        return { id: sec[0], name: sec[1], rows: rows };
      }).concat([
        { id: 'sp-web', name: 'Landing page', rows: [[
          { id: 'sp-landing', name: 'Landing — Desktop', img: [IMG + 'sp-landing.webp'], w: 1512, h: 4916, kind: 'Desktop' }
        ]] }
      ]),
      // sections empilées en colonnes (comme un vrai fichier bien rangé)
      columns: { 'sp-onb': 0, 'sp-auth': 0, 'sp-quest': 0, 'sp-app': 0, 'sp-food': 1, 'sp-alerts': 1, 'sp-sante': 1, 'sp-web': 2 },
      colWidth: 4400,
      flows: [
        ['sp-onb-1', 'sp-onb-2'],
        ['sp-onb-2', 'sp-onb-3'],
        ['sp-onb-3', 'sp-connexion'],
        ['sp-connexion', 'sp-mot-de-passe-oublie'],
        ['sp-mot-de-passe-oublie', 'sp-mot-de-passe-oublie-1'],
        ['sp-inscription', 'sp-q1'],
        ['sp-q1', 'sp-q2'],
        ['sp-q2', 'sp-questionnaire-3'],
        ['sp-questionnaire-3', 'sp-questionnaire-4'],
        ['sp-questionnaire-4', 'sp-questionnaire-5'],
        ['sp-questionnaire-5', 'sp-questionnaire-6'],
        ['sp-questionnaire-6', 'sp-questionnaire-7'],
        ['sp-questionnaire-7', 'sp-questionnaire-8'],
        ['sp-questionnaire-8', 'sp-questionnaire-9'],
        ['sp-questionnaire-9', 'sp-questionnaire-10'],
        ['sp-questionnaire-10', 'sp-questionnaire-11'],
        ['sp-questionnaire-11', 'sp-questionnaire-12'],
        ['sp-questionnaire-12', 'sp-dashboard-vide'],
        ['sp-dashboard-vide', 'sp-dashboard-1'],
        ['sp-dashboard-1', 'sp-dashboard'],
        ['sp-dashboard', 'sp-ajout'],
        ['sp-ajout', 'sp-add-collation'],
        ['sp-recherche', 'sp-favoris'],
        ['sp-alertes', 'sp-creer-alerte'],
        ['sp-creer-alerte', 'sp-modifier-l-alerte'],
        ['sp-modifier-l-alerte', 'sp-alerte-supprimee'],
        ['sp-dossier', 'sp-modifier-dossier'],
        ['sp-modifier-dossier', 'sp-objectif']
      ],
      comment: { frame: 'sp-dashboard', text: 'Les anneaux de nutriments, c’est le cœur de l’app 🧡' },
      start: 'sp-onb'
    },
    beatway: {
      name: 'BeatWay', title: 'BeatWay', caseUrl: 'projet-beatway.html',
      colors: [['Sauge', '#ACD4BC'], ['Forêt', '#143C2C'], ['Menthe', '#E4F4EC'], ['Rose poudré', '#CCA4B4']],
      sections: [
        { id: 'bw-connexion', name: 'Connexion', rows: [[
          phone('bw-bienvenue', 'Bienvenue', 'bw-bienvenue.webp'),
          phone('bw-connexion-f', 'Se connecter', 'bw-connexion.webp'),
          phone('bw-inscription', 'Créer un compte', 'bw-inscription.webp')
        ]] },
        { id: 'bw-trajet', name: 'Trajet', rows: [[
          phone('bw-accueil', 'Accueil', 'bw-accueil.webp'),
          phone('bw-trajet-f', 'Choisir mon trajet', 'bw-trajet.webp'),
          phone('bw-navigation', 'Navigation', 'bw-navigation.webp'),
          phone('bw-stress', 'Stress détecté', 'bw-stress.webp')
        ]] },
        { id: 'bw-pres', name: 'Présentation', rows: [[
          { id: 'bw-mockup', name: 'Mockup iPhone', img: [IMG + 'bw-mockup.webp'], w: 640, h: 795, kind: 'Image' },
          { id: 'bw-mockup-main', name: 'Mockup — en main', img: [IMG + 'bw-mockup-main.webp'], w: 491, h: 436, kind: 'Image' }
        ]] }
      ],
      place: { 'bw-connexion': [0, 0], 'bw-trajet': [0, 1400], 'bw-pres': [2250, 0] },
      flows: [
        ['bw-bienvenue', 'bw-connexion-f'], ['bw-connexion-f', 'bw-inscription'], ['bw-inscription', 'bw-accueil'],
        ['bw-accueil', 'bw-trajet-f'], ['bw-trajet-f', 'bw-navigation'], ['bw-navigation', 'bw-stress']
      ],
      comment: { frame: 'bw-stress', text: 'Le vert sauge apaise : c’est voulu, même quand le stress monte 🌿' },
      start: 'all'
    }
  };
  var ORDER = ['masm', 'spoonia', 'beatway'];
  var GAP = 100, PAD = 80, PAD_TOP = 110;

  // Calcule les positions des frames et des sections
  ORDER.forEach(function(key) {
    var page = PAGES[key];
    page.frames = {};
    var cursorX = 0, colY = {};
    page.sections.forEach(function(sec) {
      var col = page.columns ? page.columns[sec.id] : null;
      var origin = (page.place && page.place[sec.id]) ||
        (col != null ? [col * page.colWidth, colY[col] || 0] : [cursorX, 0]);
      var y = origin[1];
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      sec.rows.forEach(function(row) {
        var x = origin[0], rowH = 0;
        row.forEach(function(f) {
          f.x = x; f.y = y; f.section = sec.id;
          page.frames[f.id] = f;
          x += f.w + GAP;
          rowH = Math.max(rowH, f.h);
          minX = Math.min(minX, f.x); minY = Math.min(minY, f.y);
          maxX = Math.max(maxX, f.x + f.w); maxY = Math.max(maxY, f.y + f.h);
        });
        y += rowH + GAP * 2;
      });
      sec.x = minX - PAD; sec.y = minY - PAD_TOP;
      sec.w = maxX - minX + PAD * 2; sec.h = maxY - minY + PAD_TOP + PAD;
      if (!(page.place && page.place[sec.id])) {
        cursorX = sec.x + sec.w + 200;
        if (col != null) colY[col] = sec.y + sec.h + 260 + PAD_TOP;
      }
    });
  });

  /* ---------- Éléments ---------- */
  var canvas = document.getElementById('fgCanvas');
  var world = document.getElementById('fgWorld');
  var overlay = document.getElementById('fgOverlay');
  var arrows = document.getElementById('fgArrows');
  var marquee = document.getElementById('fgMarquee');
  var pagesEl = document.getElementById('fgPages');
  var layersEl = document.getElementById('fgLayers');
  var propsEl = document.getElementById('fgProps');
  var zoomBtn = document.getElementById('fgZoom');
  var zoomMenu = document.getElementById('fgZoomMenu');
  var toastEl = document.getElementById('fgToast');
  var loader = document.getElementById('fgLoader');
  var presentBtn = document.getElementById('fgPresent');
  var shareBtn = document.getElementById('fgShare');

  var state = {
    page: 'masm',
    view: { x: 0, y: 0, k: 0.2 },
    selected: [],
    hover: null,
    tab: 'design',
    tool: 'move',
    thread: null,      // id du fil de commentaires ouvert
    draft: null,       // { x, y } : nouveau commentaire en cours d'écriture
    ready: false
  };
  var sized = false;  // le canevas a-t-il déjà été affiché ?
  var nodes = {};     // id -> élément DOM du frame
  var labels = {};    // id -> étiquette en surimpression
  var built = {};     // pages déjà construites

  /* ---------- Utilitaires ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function page() { return PAGES[state.page]; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function round(v) { return Math.round(v); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toScreen(x, y) { var v = state.view; return [x * v.k + v.x, y * v.k + v.y]; }
  function toWorld(sx, sy) { var v = state.view; return [(sx - v.x) / v.k, (sy - v.y) / v.k]; }
  function canvasPoint(e) { var r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }

  var ICON = {
    frame: '<svg viewBox="0 0 16 16"><path d="M5 2v12M11 2v12M2 5h12M2 11h12" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
    section: '<svg viewBox="0 0 16 16"><rect x="2.5" y="4.5" width="11" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 4.5V3a.5.5 0 0 1 .5-.5h4l1 2" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
    image: '<svg viewBox="0 0 16 16"><rect x="2.5" y="3" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="6" cy="6.5" r="1.1" fill="currentColor"/><path d="M3 12l3.5-3.5 2.5 2.5 1.5-1.5L13 12" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
    caret: '<svg viewBox="0 0 16 16"><path d="M6 4.5L9.5 8 6 11.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toast.t);
    toast.t = setTimeout(function() { toastEl.classList.remove('is-visible'); }, 1800);
  }

  /* ---------- Construction d'une page ---------- */
  function buildPage(key) {
    if (built[key]) return;
    built[key] = true;
    var p = PAGES[key];
    var layer = el('div', 'fg-page');
    layer.dataset.page = key;

    p.sections.forEach(function(sec) {
      var s = el('div', 'fg-section');
      s.style.cssText = 'left:' + sec.x + 'px;top:' + sec.y + 'px;width:' + sec.w + 'px;height:' + sec.h + 'px';
      layer.appendChild(s);
      sec.rows.forEach(function(row) {
        row.forEach(function(f) {
          var fr = el('div', 'fg-frame' + (f.kind === 'Image' ? ' fg-frame--image' : ''));
          fr.dataset.id = f.id;
          fr.style.cssText = 'left:' + f.x + 'px;top:' + f.y + 'px;width:' + f.w + 'px;height:' + f.h + 'px';
          f.img.forEach(function(src) {
            var im = el('img');
            im.src = src;
            im.alt = '';
            im.decoding = 'async';
            im.draggable = false;
            fr.appendChild(im);
          });
          layer.appendChild(fr);
          nodes[f.id] = fr;
        });
      });
    });
    world.appendChild(layer);
  }

  /* ---------- Panneau gauche ---------- */
  function renderPages() {
    pagesEl.innerHTML = '';
    ORDER.forEach(function(key) {
      var li = el('li');
      var b = el('button', 'fg-row fg-page-btn' + (key === state.page ? ' is-active' : ''),
        '<span class="fg-row__check">' + (key === state.page ? ICON.check : '') + '</span><span class="fg-row__name">' + esc(PAGES[key].name) + '</span>');
      b.type = 'button';
      b.setAttribute('aria-pressed', key === state.page ? 'true' : 'false');
      b.addEventListener('click', function() {
        switchPage(key);
        // la liste est reconstruite : on garde le focus clavier dans la fenêtre
        var nb = pagesEl.querySelector('.fg-page-btn.is-active');
        if (nb) nb.focus({ preventScroll: true });
      });
      li.appendChild(b);
      pagesEl.appendChild(li);
    });
  }

  function renderLayers() {
    layersEl.innerHTML = '';
    page().sections.forEach(function(sec) {
      var li = el('li', 'fg-layer-group');
      var head = el('button', 'fg-row fg-layer fg-layer--section',
        '<span class="fg-row__caret">' + ICON.caret + '</span><span class="fg-row__icon">' + ICON.section + '</span><span class="fg-row__name">' + esc(sec.name) + '</span>');
      head.type = 'button';
      head.setAttribute('aria-expanded', 'true');
      var list = el('ul', 'fg-layer-children');
      head.addEventListener('click', function(e) {
        if (e.target.closest('.fg-row__caret')) {
          var open = head.getAttribute('aria-expanded') === 'true';
          head.setAttribute('aria-expanded', open ? 'false' : 'true');
          list.hidden = open;
          return;
        }
        select(sectionFrames(sec), false);
        revealSelection();
      });
      li.appendChild(head);
      sec.rows.forEach(function(row) {
        row.forEach(function(f) {
          var c = el('li');
          var b = el('button', 'fg-row fg-layer',
            '<span class="fg-row__icon">' + (f.kind === 'Image' ? ICON.image : ICON.frame) + '</span><span class="fg-row__name">' + esc(f.name) + '</span>');
          b.type = 'button';
          b.dataset.id = f.id;
          b.addEventListener('click', function(e) { select([f.id], e.shiftKey); revealSelection(); });
          b.addEventListener('dblclick', function() { zoomTo([f.id]); });
          b.addEventListener('pointerenter', function() { setHover(f.id); });
          b.addEventListener('pointerleave', function() { setHover(null); });
          c.appendChild(b);
          list.appendChild(c);
        });
      });
      li.appendChild(list);
      layersEl.appendChild(li);
    });
    syncLayerSelection();
  }

  function sectionFrames(sec) {
    var ids = [];
    sec.rows.forEach(function(r) { r.forEach(function(f) { ids.push(f.id); }); });
    return ids;
  }

  function syncLayerSelection() {
    layersEl.querySelectorAll('.fg-layer[data-id]').forEach(function(b) {
      var on = state.selected.indexOf(b.dataset.id) !== -1;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* ---------- Panneau droit ---------- */
  function propRow(label, value) {
    return '<div class="fg-field"><span class="fg-field__label">' + label + '</span><span class="fg-field__value">' + value + '</span></div>';
  }

  function renderProps() {
    var p = page();
    var sel = state.selected.map(function(id) { return p.frames[id]; }).filter(Boolean);
    var html = '';

    if (state.tab === 'design') {
      if (!sel.length) {
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Page</h3>' +
          '<div class="fg-fill"><span class="fg-swatch" style="background:#F5F5F5"></span><span>F5F5F5</span><span class="fg-muted">100 %</span></div></section>';
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Styles de couleur</h3><ul class="fg-styles">' +
          p.colors.map(function(c) {
            return '<li><button type="button" class="fg-style" data-hex="' + c[1] + '"><span class="fg-swatch" style="background:' + c[1] + '"></span><span class="fg-style__name">' + esc(p.name) + ' / ' + esc(c[0]) + '</span><span class="fg-muted">' + c[1].slice(1) + '</span></button></li>';
          }).join('') + '</ul></section>';
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Projet</h3>' +
          propRow('Frames', Object.keys(p.frames).length) +
          propRow('Sections', p.sections.length) +
          '<a class="fg-btn fg-btn--ghost" href="' + p.caseUrl + '">Voir l’étude de cas</a></section>';
      } else if (sel.length === 1) {
        var f = sel[0];
        html += '<section class="fg-panel"><div class="fg-panel__head"><span class="fg-chip">' + (f.kind === 'Image' ? ICON.image + ' Image' : ICON.frame + ' Frame') + '</span><span class="fg-muted">' + esc(f.kind) + '</span></div>' +
          '<div class="fg-grid">' + propRow('X', round(f.x)) + propRow('Y', round(f.y)) + propRow('L', round(f.w)) + propRow('H', round(f.h)) + '</div></section>';
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Calque</h3><div class="fg-fill"><span>Normal</span><span class="fg-muted">100 %</span></div></section>';
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Remplissage</h3><div class="fg-fill"><span class="fg-swatch fg-swatch--img" style="background-image:url(\'' + f.img[0] + '\')"></span><span>Image</span><span class="fg-muted">100 %</span></div></section>';
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Exporter</h3><a class="fg-btn fg-btn--ghost" href="' + f.img[0] + '" target="_blank" rel="noopener">Exporter ' + esc(f.name) + '</a></section>';
      } else {
        html += '<section class="fg-panel"><div class="fg-panel__head"><span class="fg-chip">' + ICON.frame + ' ' + sel.length + ' calques</span></div>' +
          '<div class="fg-grid">' + propRow('X', 'Mixte') + propRow('Y', 'Mixte') + propRow('L', 'Mixte') + propRow('H', 'Mixte') + '</div></section>';
      }
    } else if (state.tab === 'dev') {
      // Dev Mode : code prêt à copier
      var slug = function(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
      var code, title;
      if (!sel.length) {
        title = 'Variables';
        code = [':root {'].concat(p.colors.map(function(c) {
          return '  --' + slug(p.name) + '-' + slug(c[0]) + ': ' + c[1] + ';';
        })).concat(['}']).join('\n');
      } else {
        var b = boundsOf(state.selected);
        title = sel.length === 1 ? sel[0].name : sel.length + ' calques';
        code = (sel.length === 1
          ? ['/* ' + sel[0].name + ' — ' + sel[0].kind + ' */', 'width: ' + round(sel[0].w) + 'px;', 'height: ' + round(sel[0].h) + 'px;',
             'background: url("' + sel[0].img[0].split('/').pop() + '") top / cover;']
          : ['/* Sélection */', 'width: ' + round(b.w) + 'px;', 'height: ' + round(b.h) + 'px;', 'display: flex;', 'gap: 100px;']
        ).join('\n');
      }
      lastCode = code;
      var hl = esc(code)
        .replace(/(\/\*.*?\*\/)/g, '<span class="tk-c">$1</span>')
        .replace(/^(\s*)([a-z-]+)(:)/gm, '$1<span class="tk-p">$2</span>$3')
        .replace(/(#[0-9A-F]{6}|\d+px)/g, '<span class="tk-v">$1</span>');
      html += '<section class="fg-panel"><div class="fg-panel__head"><h3 class="fg-panel__title">' + esc(title) + '</h3><span class="fg-dev-badge">' + ICON_DEV + ' Dev Mode</span></div>' +
        '<div class="fg-code-wrap"><pre class="fg-code"><code>' + hl + '</code></pre><button type="button" class="fg-copy" data-copy-code>Copier</button></div>' +
        (sel.length ? '' : '<p class="fg-muted fg-note">Sélectionne un écran pour voir ses dimensions et son code.</p>') + '</section>';
      if (sel.length === 1) {
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Ressources</h3><a class="fg-btn fg-btn--ghost" href="' + sel[0].img[0] + '" target="_blank" rel="noopener">Télécharger l’image</a></section>';
      }
    } else {
      // Prototype
      if (!sel.length) {
        var starts = p.flows.length ? [p.flows[0][0]] : [];
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Flux</h3>' +
          (starts.length
            ? starts.map(function(id) { return '<div class="fg-flow"><span class="fg-flow__dot"></span><span>Flux 1 — ' + esc(p.frames[id].name) + '</span></div>'; }).join('') +
              '<p class="fg-muted fg-note">' + p.flows.length + ' interactions dans ce prototype.</p>'
            : '<p class="fg-muted fg-note">Aucune interaction sur cette page : c’est un site vitrine, il se découvre en entier dans l’étude de cas.</p>') +
          '<a class="fg-btn" href="' + p.caseUrl + '">▶ Présenter</a></section>';
      } else {
        var outs = [];
        sel.forEach(function(f) {
          p.flows.forEach(function(fl) { if (fl[0] === f.id) outs.push([f, p.frames[fl[1]]]); });
        });
        html += '<section class="fg-panel"><h3 class="fg-panel__title">Interactions</h3>' +
          (outs.length ? outs.map(function(o) {
            return '<div class="fg-inter"><span class="fg-inter__trigger">Au clic</span><span class="fg-inter__arrow">→</span><span>Naviguer vers <strong>' + esc(o[1].name) + '</strong></span><span class="fg-muted">Dissoudre · 300 ms</span></div>';
          }).join('') : '<p class="fg-muted fg-note">Aucune interaction depuis ce frame.</p>') + '</section>';
      }
    }
    propsEl.innerHTML = html;
  }

  var lastCode = '';
  var ICON_DEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  propsEl.addEventListener('click', function(e) {
    if (e.target.closest('[data-copy-code]')) { copy(lastCode, 'Code copié'); return; }
    var s = e.target.closest('.fg-style');
    if (!s) return;
    copy(s.dataset.hex, 'Couleur ' + s.dataset.hex + ' copiée');
  });

  function copy(text, msg) {
    var done = function() { toast(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function() { toast(text); });
    } else toast(text);
  }

  /* ---------- Vue (zoom / déplacement) ---------- */
  var raf = null;
  function applyView() {
    var v = state.view;
    world.style.transform = 'translate(' + v.x + 'px,' + v.y + 'px) scale(' + v.k + ')';
    zoomBtn.textContent = Math.round(v.k * 100) + ' %';
    scheduleOverlay();
  }
  function scheduleOverlay() {
    if (!raf) raf = requestAnimationFrame(function() { raf = null; renderOverlay(); });
  }

  function boundsOf(ids) {
    var p = page(), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    ids.forEach(function(id) {
      var f = p.frames[id];
      if (!f) return;
      x0 = Math.min(x0, f.x); y0 = Math.min(y0, f.y);
      x1 = Math.max(x1, f.x + f.w); y1 = Math.max(y1, f.y + f.h);
    });
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }
  function allSectionsBounds(list) {
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    list.forEach(function(s) {
      x0 = Math.min(x0, s.x); y0 = Math.min(y0, s.y);
      x1 = Math.max(x1, s.x + s.w); y1 = Math.max(y1, s.y + s.h);
    });
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  var anim = null;
  function setView(target, animate) {
    if (anim) cancelAnimationFrame(anim);
    if (!animate || reduceMotion()) { state.view = target; applyView(); return; }
    var from = { x: state.view.x, y: state.view.y, k: state.view.k }, t0 = performance.now(), D = 380;
    (function step(t) {
      var p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 3);
      // interpolation logarithmique du zoom, plus naturelle
      var k = from.k * Math.pow(target.k / from.k, e);
      var cx = (canvas.clientWidth / 2 - from.x) / from.k + ((canvas.clientWidth / 2 - target.x) / target.k - (canvas.clientWidth / 2 - from.x) / from.k) * e;
      var cy = (canvas.clientHeight / 2 - from.y) / from.k + ((canvas.clientHeight / 2 - target.y) / target.k - (canvas.clientHeight / 2 - from.y) / from.k) * e;
      state.view = { k: k, x: canvas.clientWidth / 2 - cx * k, y: canvas.clientHeight / 2 - cy * k };
      applyView();
      anim = p < 1 ? requestAnimationFrame(step) : null;
    })(t0);
  }

  function fitRect(b, opts) {
    opts = opts || {};
    var cw = canvas.clientWidth, ch = canvas.clientHeight;
    var m = opts.margin == null ? 60 : opts.margin;
    var k = Math.min((cw - m * 2) / b.w, (ch - m * 2 - 50) / b.h);
    if (opts.top) k = (cw - m * 2) / b.w;
    k = clamp(k, 0.02, opts.max || 1);
    var x = (cw - b.w * k) / 2 - b.x * k;
    var y = opts.top ? m + 20 - b.y * k : (ch - 50 - b.h * k) / 2 - b.y * k;
    return { x: x, y: y, k: k };
  }

  function fitPage(animate) {
    setView(fitRect(allSectionsBounds(page().sections)), animate);
  }
  function fitStart() {
    var p = page();
    if (p.start === 'top') setView(fitRect(allSectionsBounds(p.sections), { top: true }), false);
    else if (p.start === 'all') fitPage(false);
    else {
      var sec = p.sections.filter(function(s) { return s.id === p.start; })[0];
      setView(fitRect(allSectionsBounds([sec])), false);
    }
  }
  function zoomTo(ids) {
    if (!ids.length) return;
    setView(fitRect(boundsOf(ids), { max: 2 }), true);
  }
  function zoomAt(factor, sx, sy) {
    var v = state.view;
    var k = clamp(v.k * factor, 0.02, 4);
    var w = toWorld(sx, sy);
    state.view = { k: k, x: sx - w[0] * k, y: sy - w[1] * k };
    applyView();
  }
  function zoomCenter(factor) { zoomAt(factor, canvas.clientWidth / 2, canvas.clientHeight / 2); }

  // Montre la sélection si elle est hors de l'écran
  function revealSelection() {
    if (!state.selected.length) return;
    var b = boundsOf(state.selected);
    var a = toScreen(b.x, b.y), c = toScreen(b.x + b.w, b.y + b.h);
    var off = c[0] < 0 || a[0] > canvas.clientWidth || c[1] < 0 || a[1] > canvas.clientHeight;
    if (off) zoomTo(state.selected);
  }

  function reduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('a11y-no-animations');
  }

  /* ---------- Surimpression (étiquettes, sélection, flèches) ---------- */
  function renderOverlay() {
    var p = page(), v = state.view;
    var html = '';

    // Étiquettes de sections
    p.sections.forEach(function(sec) {
      var s = toScreen(sec.x, sec.y);
      if (sec.w * v.k < 40) return;
      html += '<div class="fg-sec-label" style="transform:translate(' + (s[0] + 8) + 'px,' + (s[1] + 8) + 'px)">' + esc(sec.name) + '</div>';
    });

    // Noms des frames
    Object.keys(p.frames).forEach(function(id) {
      var f = p.frames[id];
      var s = toScreen(f.x, f.y);
      var w = f.w * v.k;
      if (w < 28) return;
      // pas de place sous le nom de la section : le nom du frame réapparaît en zoomant
      var sec = p.sections.filter(function(x) { return x.id === f.section; })[0];
      if (sec && (f.y - sec.y) * v.k < 46) return;
      var on = state.selected.indexOf(id) !== -1 || state.hover === id;
      html += '<div class="fg-frame-label' + (on ? ' is-on' : '') + '" style="transform:translate(' + s[0] + 'px,' + (s[1] - 18) + 'px);max-width:' + Math.max(28, w) + 'px">' + esc(f.name) + '</div>';
    });

    // Survol
    if (state.hover && state.selected.indexOf(state.hover) === -1 && p.frames[state.hover]) {
      html += box(p.frames[state.hover], 'fg-hover');
    }

    // Sélection
    if (state.selected.length) {
      state.selected.forEach(function(id) { if (p.frames[id] && state.selected.length > 1) html += box(p.frames[id], 'fg-hover fg-hover--sel'); });
      var b = boundsOf(state.selected);
      var a = toScreen(b.x, b.y), c = toScreen(b.x + b.w, b.y + b.h);
      var w = c[0] - a[0], h = c[1] - a[1];
      html += '<div class="fg-sel" style="transform:translate(' + a[0] + 'px,' + a[1] + 'px);width:' + w + 'px;height:' + h + 'px">' +
        '<i class="fg-handle" style="left:-4px;top:-4px"></i><i class="fg-handle" style="right:-4px;top:-4px"></i>' +
        '<i class="fg-handle" style="left:-4px;bottom:-4px"></i><i class="fg-handle" style="right:-4px;bottom:-4px"></i>' +
        '<span class="fg-size">' + round(b.w) + ' × ' + round(b.h) + '</span></div>';
    }

    // Curseur multijoueur
    if (cursor.page === state.page) {
      var cs = toScreen(cursor.x, cursor.y);
      html += '<div class="fg-cursor" style="transform:translate(' + cs[0] + 'px,' + cs[1] + 'px)"><svg viewBox="0 0 16 18" aria-hidden="true"><path d="M1.5 1.5l12.4 7.1-5.6 1.3-2.7 5.4z" fill="#e64980" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg><span>Amandine</span></div>';
    }

    overlay.innerHTML = html;
    renderArrows();
    positionComments();
  }

  function box(f, cls) {
    var a = toScreen(f.x, f.y);
    return '<div class="' + cls + '" style="transform:translate(' + a[0] + 'px,' + a[1] + 'px);width:' + f.w * state.view.k + 'px;height:' + f.h * state.view.k + 'px"></div>';
  }

  function renderArrows() {
    var p = page();
    if (state.tab !== 'prototype' || !p.flows.length) { arrows.innerHTML = ''; return; }
    var k = state.view.k, out = '';
    if (393 * k < 26) { arrows.innerHTML = ''; return; } // trop dézoomé : flèches illisibles
    var anchor = Math.min(120, 0.18);
    p.flows.forEach(function(fl, i) {
      var a = p.frames[fl[0]], b = p.frames[fl[1]];
      var ay = a.y + Math.min(a.h * anchor, 160), by = b.y + Math.min(b.h * anchor, 160);
      var s = toScreen(a.x + a.w, ay), t = toScreen(b.x, by);
      var sameRow = Math.abs(a.y - b.y) < 10 && b.x > a.x;
      var dx = Math.max(40, Math.abs(t[0] - s[0]) * 0.5);
      var d = sameRow
        ? 'M' + s[0] + ',' + s[1] + ' C' + (s[0] + dx) + ',' + s[1] + ' ' + (t[0] - dx) + ',' + t[1] + ' ' + (t[0] - 6) + ',' + t[1]
        : 'M' + s[0] + ',' + s[1] + ' C' + (s[0] + 160 * Math.max(k, 0.4)) + ',' + s[1] + ' ' + (t[0] - 160 * Math.max(k, 0.4)) + ',' + t[1] + ' ' + (t[0] - 6) + ',' + t[1];
      out += '<path class="fg-arrow" d="' + d + '" style="animation-delay:' + (i * 40) + 'ms"/>' +
        '<circle class="fg-arrow__start" cx="' + s[0] + '" cy="' + s[1] + '" r="4"/>' +
        '<path class="fg-arrow__head" d="M' + (t[0] - 9) + ',' + (t[1] - 5) + ' L' + t[0] + ',' + t[1] + ' L' + (t[0] - 9) + ',' + (t[1] + 5) + 'z"/>';
    });
    arrows.innerHTML = out;
  }

  /* ---------- Sélection ---------- */
  function select(ids, additive) {
    if (additive) {
      ids.forEach(function(id) {
        var i = state.selected.indexOf(id);
        if (i === -1) state.selected.push(id); else state.selected.splice(i, 1);
      });
    } else state.selected = ids.slice();
    syncLayerSelection();
    renderProps();
    scheduleOverlay();
  }
  function setHover(id) {
    if (state.hover === id) return;
    state.hover = id;
    scheduleOverlay();
  }

  /* ---------- Pages ---------- */
  function switchPage(key) {
    if (key === state.page && built[key]) return;
    state.page = key;
    state.selected = [];
    state.hover = null;
    state.thread = null;
    state.draft = null;
    if (sized) buildPage(key);
    world.querySelectorAll('.fg-page').forEach(function(l) { l.hidden = l.dataset.page !== key; });
    renderPages();
    renderLayers();
    renderProps();
    presentBtn.href = page().caseUrl;
    if (canvas.clientWidth) fitStart();
    syncComments();
    moveCursorSoon(400);
  }

  /* ---------- Outils ---------- */
  var ST = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  function ico(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; }
  var TOOL_ICONS = {
    move: ico('<path d="M5.5 4.5l13 6.3-5.7 1.6-2.9 5.4z" ' + ST + '/>'),
    hand: ico('<path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11V4.5a1.5 1.5 0 0 1 3 0V11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-.5a6 6 0 0 1-4.6-2.2L4 14.6a1.5 1.5 0 0 1 2.3-1.9z" ' + ST + '/>'),
    scale: ico('<path d="M4.5 19.5l7-7M4.5 14.5v5h5M13.5 4.5h6v6M19.5 4.5l-6 6" ' + ST + '/>'),
    frame: ico('<path d="M8.5 4v16M15.5 4v16M4 8.5h16M4 15.5h16" ' + ST + '/>'),
    section: ico('<rect x="4" y="6" width="16" height="13" rx="2" ' + ST + '/><path d="M4 6V5a1 1 0 0 1 1-1h5l1.5 2" ' + ST + '/>'),
    slice: ico('<path d="M5 19L19 5M5 5h6M5 5v6" ' + ST + '/>'),
    rect: ico('<rect x="5" y="5" width="14" height="14" rx="1.5" ' + ST + '/>'),
    line: ico('<path d="M5 19L19 5" ' + ST + '/>'),
    ellipse: ico('<circle cx="12" cy="12" r="7" ' + ST + '/>'),
    image: ico('<rect x="4" y="4" width="16" height="16" rx="3" ' + ST + '/><circle cx="15" cy="9" r="1.7" ' + ST + '/><path d="M4.5 16.5l4.5-4.5 4 4 2-2 4.5 4.5" ' + ST + '/>'),
    pen: ico('<path d="M14 4.5l5.5 5.5-7 7-6.8 2.3L8 12.5z" ' + ST + '/><circle cx="11.6" cy="12.4" r="1.4" ' + ST + '/><path d="M5.7 19.3l4.9-4.9" ' + ST + '/>'),
    pencil: ico('<path d="M5 19l1.2-4.2L15.8 5.2l3 3-9.6 9.6z" ' + ST + '/>'),
    text: ico('<path d="M5.5 6.5V5h13v1.5M12 5v14M9.5 19h5" ' + ST + '/>'),
    comment: ico('<path d="M12 4.5a7.5 7.5 0 1 1-3.6 14.1L4.5 19.5l1-3.6A7.5 7.5 0 0 1 12 4.5z" ' + ST + '/>')
  };
  // Sous-outils de chaque chevron (seuls Déplacer, Main et Commentaire sont actifs : fichier en lecture seule)
  var MENUS = {
    move: [['move', 'Déplacer', 'V'], ['hand', 'Main', 'H'], ['scale', 'Mise à l’échelle', 'K']],
    frame: [['frame', 'Frame', 'F'], ['section', 'Section', '⇧S'], ['slice', 'Tranche', 'S']],
    image: [['rect', 'Rectangle', 'R'], ['line', 'Ligne', 'L'], ['ellipse', 'Ellipse', 'O'], ['image', 'Image ou vidéo…', '⇧⌘K']],
    pen: [['pen', 'Plume', 'P'], ['pencil', 'Crayon', '⇧P']],
    text: [['text', 'Texte', 'T']],
    comment: [['comment', 'Commentaire', 'C']]
  };
  var ACTIVE_TOOLS = ['move', 'hand', 'comment'];
  var toolMenu = document.getElementById('fgToolMenu');
  var openMenu = null;

  function groupOf(tool) {
    for (var g in MENUS) if (MENUS[g].some(function(it) { return it[0] === tool; })) return g;
    return null;
  }

  document.querySelectorAll('#fgTools .fg-tool').forEach(function(b) {
    b.addEventListener('click', function() { setTool(b.dataset.tool); });
  });
  document.querySelectorAll('#fgTools .fg-caret').forEach(function(b) {
    b.addEventListener('click', function(e) {
      e.stopPropagation();
      if (openMenu === b.dataset.menu) closeToolMenu(); else openToolMenu(b);
    });
  });

  function openToolMenu(btn) {
    closeToolMenu();
    var g = btn.dataset.menu;
    toolMenu.innerHTML = MENUS[g].map(function(it) {
      var on = state.tool === it[0];
      return '<button type="button" role="menuitemradio" aria-checked="' + on + '" data-pick="' + it[0] + '">' +
        '<span class="fg-tool-menu__check">' + (on ? ICON.check : '') + '</span>' + TOOL_ICONS[it[0]] +
        '<span>' + it[1] + '</span><kbd>' + it[2] + '</kbd></button>';
    }).join('');
    var tb = document.getElementById('fgTools').getBoundingClientRect(), r = btn.closest('.fg-tg').getBoundingClientRect();
    toolMenu.style.left = (r.left - tb.left) + 'px';
    toolMenu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    openMenu = g;
    var first = toolMenu.querySelector('[aria-checked="true"]') || toolMenu.querySelector('button');
    if (first) first.focus({ preventScroll: true });
  }
  function closeToolMenu() {
    if (!openMenu) return;
    toolMenu.hidden = true;
    document.querySelectorAll('#fgTools .fg-caret').forEach(function(b) { b.setAttribute('aria-expanded', 'false'); });
    openMenu = null;
  }
  toolMenu.addEventListener('click', function(e) {
    var b = e.target.closest('[data-pick]');
    if (!b) return;
    var grp = document.querySelector('#fgTools .fg-tg[data-group="' + openMenu + '"] .fg-tool');
    closeToolMenu();
    setTool(b.dataset.pick);
    if (grp) grp.focus({ preventScroll: true }); // le clavier reste dans la fenêtre Figma
  });
  toolMenu.addEventListener('keydown', function(e) {
    var items = Array.from(toolMenu.querySelectorAll('button')), i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation();
      var c = document.querySelector('#fgTools .fg-caret[data-menu="' + openMenu + '"]');
      closeToolMenu();
      if (c) c.focus({ preventScroll: true });
    }
  });
  document.addEventListener('click', function(e) { if (!e.target.closest('#fgToolMenu, .fg-caret')) closeToolMenu(); });

  function setTool(tool) {
    if (tool === 'actions') { toast('Actions : fichier en lecture seule 👀'); return; }
    if (ACTIVE_TOOLS.indexOf(tool) === -1) {
      toast('Fichier en lecture seule 👀');
      return;
    }
    state.tool = tool;
    if (tool !== 'comment' && state.draft) cancelDraft();
    if (tool === 'comment') toast('Clique n’importe où pour commenter');
    // Le bouton du groupe prend l'icône du dernier sous-outil choisi (comme dans Figma)
    var g = groupOf(tool);
    var main = g && document.querySelector('#fgTools .fg-tool[data-tool="' + g + '"], #fgTools .fg-tg[data-group="' + g + '"] .fg-tool');
    if (main && TOOL_ICONS[tool]) {
      main.innerHTML = TOOL_ICONS[tool];
      var item = MENUS[g].filter(function(it) { return it[0] === tool; })[0];
      main.setAttribute('aria-label', item[1]);
      main.dataset.tip = item[1] + ' · ' + item[2];
      main.dataset.tool = tool;
    }
    document.querySelectorAll('#fgTools .fg-tg').forEach(function(grp) {
      var on = grp.dataset.group === g;
      grp.classList.toggle('is-active', on);
      grp.querySelector('.fg-tool').setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    canvas.classList.toggle('is-hand', tool === 'hand');
    canvas.classList.toggle('is-comment', tool === 'comment');
  }

  /* ---------- Modes (barre d'outils) et onglets Design / Prototype ---------- */
  document.querySelectorAll('.fg-mode').forEach(function(b) {
    b.addEventListener('click', function() { setMode(b.dataset.mode); });
  });
  document.querySelectorAll('.fg-tab').forEach(function(b) {
    b.addEventListener('click', function() { setMode(b.dataset.tab); });
  });

  function setMode(mode) {
    if (mode === 'draw') { toast('Mode Dessin : fichier en lecture seule 👀'); return; }
    state.tab = mode;
    document.querySelectorAll('.fg-mode').forEach(function(m) {
      var on = m.dataset.mode === mode;
      m.classList.toggle('is-active', on);
      m.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('.fg-tab').forEach(function(t) {
      var on = t.dataset.tab === mode;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    canvas.classList.toggle('is-prototype', mode === 'prototype');
    win.classList.toggle('is-dev', mode === 'dev');
    if (mode === 'dev') toast('Dev Mode : sélectionne un écran pour voir son code');
    renderProps();
    scheduleOverlay();
  }

  /* ---------- Zoom ---------- */
  zoomBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var open = zoomMenu.hidden;
    zoomMenu.hidden = !open;
    zoomBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  zoomMenu.addEventListener('click', function(e) {
    var b = e.target.closest('[data-zoom]');
    if (!b) return;
    var z = b.dataset.zoom;
    if (z === 'in') zoomCenter(1.5);
    else if (z === 'out') zoomCenter(1 / 1.5);
    else if (z === '100') zoomAtLevel(1);
    else if (z === 'fit') fitPage(true);
    else if (z === 'sel') zoomTo(state.selected);
    closeZoomMenu();
  });
  function zoomAtLevel(k) { zoomAt(k / state.view.k, canvas.clientWidth / 2, canvas.clientHeight / 2); }
  function closeZoomMenu() { zoomMenu.hidden = true; zoomBtn.setAttribute('aria-expanded', 'false'); }
  document.addEventListener('click', function(e) { if (!e.target.closest('.fg-zoom-wrap')) closeZoomMenu(); });

  /* ---------- Partager / Présenter ---------- */
  shareBtn.addEventListener('click', function() {
    var url = new URL(page().caseUrl, location.href).href;
    copy(url, 'Lien de l’étude de cas copié');
  });

  /* ---------- Interactions sur le canevas ---------- */
  var pointers = new Map();
  var drag = null;      // { mode: 'pan' | 'marquee', ... }
  var spaceDown = false;

  function frameAt(target) {
    var fr = target.closest && target.closest('.fg-frame');
    return fr ? fr.dataset.id : null;
  }

  canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    var pt = canvasPoint(e);
    if (e.ctrlKey || e.metaKey) {
      // molette : ~1,5× par cran ; trackpad (petits deltas) : zoom fin et continu
      var dz = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      zoomAt(Math.exp(-clamp(dz, -40, 40) * 0.01), pt[0], pt[1]);
    } else {
      var dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      var dy = e.shiftKey && !e.deltaX ? 0 : e.deltaY;
      state.view.x -= dx;
      state.view.y -= dy;
      applyView();
    }
  }, { passive: false });

  canvas.addEventListener('pointerdown', function(e) {
    if (e.target.closest('.fg-toolbar, .fg-comments, .fg-toast')) return;
    canvas.focus({ preventScroll: true });
    pointers.set(e.pointerId, canvasPoint(e));
    canvas.setPointerCapture(e.pointerId);

    if (pointers.size === 2) { // pincement (tactile)
      var pts = Array.from(pointers.values());
      drag = { mode: 'pinch', d: dist(pts[0], pts[1]), mid: mid(pts[0], pts[1]) };
      return;
    }

    var pt = canvasPoint(e);
    var id = frameAt(e.target);
    var pan = state.tool === 'hand' || spaceDown || e.button === 1 || e.pointerType === 'touch';
    if (pan) {
      drag = { mode: 'pan', sx: pt[0], sy: pt[1], vx: state.view.x, vy: state.view.y, id: id, moved: false };
      canvas.classList.add('is-panning');
      return;
    }
    if (state.tool === 'comment') {
      var w = toWorld(pt[0], pt[1]);
      startDraft(w[0], w[1]);
      drag = null;
      return;
    }
    if (state.thread) closeThread();
    if (id) {
      select([id], e.shiftKey);
      drag = null;
      return;
    }
    if (!e.shiftKey) select([], false);
    drag = { mode: 'marquee', sx: pt[0], sy: pt[1], base: state.selected.slice() };
  });

  canvas.addEventListener('pointermove', function(e) {
    var pt = canvasPoint(e);
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, pt);

    if (drag && drag.mode === 'pinch' && pointers.size === 2) {
      var pts = Array.from(pointers.values());
      var d = dist(pts[0], pts[1]), m = mid(pts[0], pts[1]);
      zoomAt(d / drag.d, m[0], m[1]);
      state.view.x += m[0] - drag.mid[0];
      state.view.y += m[1] - drag.mid[1];
      applyView();
      drag.d = d; drag.mid = m;
      return;
    }
    if (drag && drag.mode === 'pan') {
      if (Math.abs(pt[0] - drag.sx) + Math.abs(pt[1] - drag.sy) > 3) drag.moved = true;
      state.view.x = drag.vx + pt[0] - drag.sx;
      state.view.y = drag.vy + pt[1] - drag.sy;
      applyView();
      return;
    }
    if (drag && drag.mode === 'marquee') {
      var x = Math.min(pt[0], drag.sx), y = Math.min(pt[1], drag.sy);
      var w = Math.abs(pt[0] - drag.sx), h = Math.abs(pt[1] - drag.sy);
      if (w + h < 4) return;
      marquee.hidden = false;
      marquee.style.cssText = 'transform:translate(' + x + 'px,' + y + 'px);width:' + w + 'px;height:' + h + 'px';
      var a = toWorld(x, y), b = toWorld(x + w, y + h);
      var hit = Object.keys(page().frames).filter(function(id) {
        var f = page().frames[id];
        return f.x < b[0] && f.x + f.w > a[0] && f.y < b[1] && f.y + f.h > a[1];
      });
      state.selected = drag.base.concat(hit.filter(function(id) { return drag.base.indexOf(id) === -1; }));
      syncLayerSelection();
      renderProps();
      scheduleOverlay();
      return;
    }
    if (e.pointerType === 'mouse') setHover(frameAt(e.target));
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (!drag) return;
    if (drag.mode === 'pan' && !drag.moved && e.pointerType === 'touch') {
      if (state.tool === 'comment') {   // toucher = poser un commentaire
        var w = toWorld(drag.sx, drag.sy);
        startDraft(w[0], w[1]);
      } else {
        if (state.thread) closeThread();
        select(drag.id ? [drag.id] : [], false); // toucher = sélection
      }
    }
    if (drag.mode === 'pinch' && pointers.size === 1) {
      var pt = Array.from(pointers.values())[0];
      drag = { mode: 'pan', sx: pt[0], sy: pt[1], vx: state.view.x, vy: state.view.y, moved: true };
      return;
    }
    drag = null;
    marquee.hidden = true;
    canvas.classList.remove('is-panning');
  }
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
  canvas.addEventListener('pointerleave', function(e) { if (e.pointerType === 'mouse') setHover(null); });

  canvas.addEventListener('dblclick', function(e) {
    var id = frameAt(e.target);
    if (id) zoomTo([id]);
  });

  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }

  /* ---------- Clavier ---------- */
  win.addEventListener('keydown', function(e) {
    if (e.target.closest('input, textarea')) return;
    var k = e.key;
    if (k === ' ' && !e.repeat && e.target === canvas) { spaceDown = true; canvas.classList.add('is-hand'); e.preventDefault(); return; }
    if (e.shiftKey && (k === '!' || k === '1' || e.code === 'Digit1')) { fitPage(true); e.preventDefault(); return; }
    if (e.shiftKey && (k === '@' || k === '2' || e.code === 'Digit2')) { zoomTo(state.selected); e.preventDefault(); return; }
    if (e.shiftKey && e.code === 'KeyD') { setMode(state.tab === 'dev' ? 'design' : 'dev'); e.preventDefault(); return; }
    if (e.shiftKey && e.code === 'KeyE') { setMode(state.tab === 'prototype' ? 'design' : 'prototype'); e.preventDefault(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (k === '+' || k === '=') { zoomCenter(1.5); e.preventDefault(); }
    else if (k === '-') { zoomCenter(1 / 1.5); e.preventDefault(); }
    else if (k === '0') { zoomAtLevel(1); e.preventDefault(); }
    else if (k === 'v' || k === 'V') setTool('move');
    else if (k === 'h' || k === 'H') setTool('hand');
    else if (k === 'c' || k === 'C') setTool('comment');
    else if (k === 'Escape') {
      // Échap remonte d'un cran : commentaire, outil, sélection… puis seulement la fenêtre
      if (openMenu) closeToolMenu();
      else if (state.draft) cancelDraft();
      else if (state.thread) closeThread();
      else if (!zoomMenu.hidden) closeZoomMenu();
      else if (state.tool === 'comment') setTool('move');
      else if (state.selected.length) select([], false);
      else return;
      e.stopPropagation();
    }
  });
  win.addEventListener('keyup', function(e) {
    if (e.key === ' ') { spaceDown = false; canvas.classList.toggle('is-hand', state.tool === 'hand'); }
  });

  /* ---------- Commentaires ---------- */
  var commentsEl = document.getElementById('fgComments');
  var STORE = 'figma-comments';
  var AUTHORS = {
    amandine: { name: 'Amandine', initial: 'A', cls: '' },
    toi: { name: 'Toi', initial: 'T', cls: ' is-you' }
  };
  var threads = [];        // tous les fils, toutes pages confondues
  var pinEls = {};         // id -> pastille
  var popEl = null;        // fil ouvert ou brouillon

  // Fils d'Amandine (un par page), ancrés en haut à droite d'un écran
  var loaded = Date.now();
  ORDER.forEach(function(key) {
    var c = PAGES[key].comment, f = c && PAGES[key].frames[c.frame];
    if (!f) return;
    threads.push({ id: 'seed-' + key, page: key, x: f.x + f.w, y: f.y, seed: true,
      msgs: [{ author: 'amandine', text: c.text, ts: loaded - 2 * 3600e3 }] });
  });

  // Commentaires du visiteur, gardés dans son navigateur
  try {
    var saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    (saved.threads || []).forEach(function(t) { if (PAGES[t.page]) threads.push(t); });
    Object.keys(saved.replies || {}).forEach(function(id) {
      var t = threadById(id);
      if (t) t.msgs = t.msgs.concat(saved.replies[id]);
    });
  } catch (e) {}

  function save() {
    try {
      var out = { threads: [], replies: {} };
      threads.forEach(function(t) {
        if (t.seed) { if (t.msgs.length > 1) out.replies[t.id] = t.msgs.slice(1); }
        else out.threads.push(t);
      });
      localStorage.setItem(STORE, JSON.stringify(out));
    } catch (e) {}
  }

  function threadById(id) { return threads.filter(function(t) { return t.id === id; })[0]; }

  function ago(ts) {
    var m = Math.round((Date.now() - ts) / 60000);
    if (m < 1) return 'à l’instant';
    if (m < 60) return 'il y a ' + m + ' min';
    var h = Math.round(m / 60);
    if (h < 24) return 'il y a ' + h + ' h';
    return 'il y a ' + Math.round(h / 24) + ' j';
  }

  // Crée / retire les pastilles de la page affichée (une seule fois, pas à chaque image)
  function syncComments() {
    Object.keys(pinEls).forEach(function(id) {
      var t = threadById(id);
      if (!t || t.page !== state.page) { pinEls[id].remove(); delete pinEls[id]; }
    });
    threads.forEach(function(t) {
      if (t.page !== state.page || pinEls[t.id]) return;
      var a = AUTHORS[t.msgs[0].author];
      var b = el('button', 'fg-pin' + a.cls, a.initial);
      b.type = 'button';
      b.dataset.id = t.id;
      b.setAttribute('aria-label', 'Commentaire de ' + a.name + ' : ' + t.msgs[0].text);
      b.addEventListener('click', function(e) {
        e.stopPropagation();
        if (state.thread === t.id) closeThread(); else openThread(t.id);
      });
      commentsEl.appendChild(b);
      pinEls[t.id] = b;
    });
    renderPop();
    positionComments();
  }

  function msgHtml(m, i, t) {
    var a = AUTHORS[m.author];
    var canDelete = m.author === 'toi';
    return '<div class="fg-msg"><p class="fg-msg__head"><span class="fg-avatar fg-avatar--sm' + a.cls + '">' + a.initial + '</span>' +
      '<strong>' + a.name + '</strong><span class="fg-muted">' + ago(m.ts) + '</span>' +
      (canDelete ? '<button type="button" class="fg-msg__del" data-del="' + i + '" aria-label="Supprimer ce commentaire">Supprimer</button>' : '') +
      '</p><p class="fg-msg__text">' + esc(m.text) + '</p></div>';
  }

  function composer(label, placeholder) {
    return '<form class="fg-compose"><label class="sr-only" for="fgCommentInput">' + label + '</label>' +
      '<textarea id="fgCommentInput" rows="2" placeholder="' + placeholder + '"></textarea>' +
      '<div class="fg-compose__foot"><span class="fg-muted">Visible seulement sur ton navigateur</span>' +
      '<button type="submit" class="fg-send" disabled aria-label="Publier">↑</button></div></form>';
  }

  // Construit la carte (fil ou brouillon) quand son contenu change
  function renderPop() {
    if (popEl) { popEl.remove(); popEl = null; }
    var t = state.thread && threadById(state.thread);
    if (!t && !state.draft) { syncPinStates(); return; }

    popEl = el('div', 'fg-thread');
    popEl.setAttribute('role', 'dialog');
    if (t) {
      popEl.setAttribute('aria-label', 'Fil de commentaires');
      popEl.innerHTML = '<div class="fg-thread__msgs">' + t.msgs.map(function(m, i) { return msgHtml(m, i, t); }).join('') + '</div>' +
        composer('Répondre', 'Répondre…');
    } else {
      popEl.setAttribute('aria-label', 'Nouveau commentaire');
      popEl.innerHTML = composer('Ajouter un commentaire', 'Ajouter un commentaire…');
      var ghost = el('span', 'fg-pin is-you is-draft', 'T');
      ghost.setAttribute('aria-hidden', 'true');
      popEl.appendChild(ghost);
    }
    commentsEl.appendChild(popEl);

    var form = popEl.querySelector('form'), input = popEl.querySelector('textarea'), send = popEl.querySelector('.fg-send');
    input.addEventListener('input', function() { send.disabled = !input.value.trim(); });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation(); // ne ferme pas la fenêtre Figma
        if (state.draft) cancelDraft(); else closeThread();
        canvas.focus({ preventScroll: true });
      }
    });
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      var msg = { author: 'toi', text: text, ts: Date.now() };
      if (state.draft) {
        var nt = { id: 'c' + Date.now(), page: state.page, x: state.draft.x, y: state.draft.y, msgs: [msg] };
        threads.push(nt);
        state.draft = null;
        state.thread = nt.id;
        setTool('move');
        toast('Commentaire publié');
      } else {
        t.msgs.push(msg);
      }
      save();
      syncComments();
      focusComposer();
    });
    popEl.addEventListener('click', function(e) {
      var d = e.target.closest('[data-del]');
      if (!d || !t) return;
      var i = +d.dataset.del;
      if (i === 0 && !t.seed) {        // supprimer le premier message supprime le fil
        threads.splice(threads.indexOf(t), 1);
        state.thread = null;
      } else t.msgs.splice(i, 1);
      save();
      syncComments();
    });
    popEl.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
    popEl.addEventListener('wheel', function(e) { e.stopPropagation(); }, { passive: true });
    syncPinStates();
  }

  function syncPinStates() {
    Object.keys(pinEls).forEach(function(id) {
      var on = state.thread === id;
      pinEls[id].classList.toggle('is-open', on);
      pinEls[id].setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  }

  // Après le clic : le navigateur redonne d'abord le focus au canevas
  function focusComposer() {
    requestAnimationFrame(function() {
      var i = popEl && popEl.querySelector('textarea');
      if (i) i.focus({ preventScroll: true });
    });
  }

  function openThread(id) {
    state.draft = null;
    state.thread = id;
    renderPop();
    positionComments();
    focusComposer();
  }
  function closeThread() {
    state.thread = null;
    renderPop();
  }
  function startDraft(x, y) {
    state.thread = null;
    state.draft = { x: x, y: y };
    renderPop();
    positionComments();
    focusComposer();
  }
  function cancelDraft() {
    state.draft = null;
    renderPop();
  }

  // Positionne pastilles et carte (appelé à chaque déplacement de la vue)
  function positionComments() {
    if (!commentsEl) return;
    Object.keys(pinEls).forEach(function(id) {
      var t = threadById(id), s = toScreen(t.x, t.y);
      pinEls[id].style.transform = 'translate(' + s[0] + 'px,' + (s[1] - 30) + 'px)';
    });
    if (!popEl) return;
    var anchor = state.draft || threadById(state.thread);
    if (!anchor) return;
    var p = toScreen(anchor.x, anchor.y);
    var cw = canvas.clientWidth, w = popEl.offsetWidth || 260;
    var x = p[0] + 40, y = p[1] - 34;
    if (x + w > cw - 8) x = Math.max(8, p[0] - w - 12); // pas de débordement à droite
    popEl.style.transform = 'translate(' + x + 'px,' + Math.max(8, y) + 'px)';
    var ghost = popEl.querySelector('.is-draft');
    if (ghost) ghost.style.transform = 'translate(' + (p[0] - x) + 'px,' + (p[1] - 30 - Math.max(8, y)) + 'px)';
  }

  /* ---------- Curseur multijoueur ---------- */
  var cursor = { page: null, x: 0, y: 0 };
  var cursorTimer = null, cursorAnim = null;
  function moveCursorSoon(delay) {
    clearTimeout(cursorTimer);
    cursorTimer = setTimeout(moveCursor, delay);
  }
  function moveCursor() {
    if (win.hidden || !canvas.clientWidth || reduceMotion()) { moveCursorSoon(3000); return; }
    var ids = Object.keys(page().frames);
    var f = page().frames[ids[Math.floor(Math.random() * ids.length)]];
    var tx = f.x + f.w * (0.25 + Math.random() * 0.5);
    var ty = f.y + Math.min(f.h, 900) * (0.2 + Math.random() * 0.6);
    if (cursor.page !== state.page) {
      var start = toWorld(canvas.clientWidth * 0.8, canvas.clientHeight * 0.85);
      cursor = { page: state.page, x: start[0], y: start[1] };
    }
    var fx = cursor.x, fy = cursor.y, t0 = performance.now(), D = 1400;
    cancelAnimationFrame(cursorAnim);
    (function step(t) {
      var p = Math.min(1, (t - t0) / D);
      var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      cursor.x = fx + (tx - fx) * e;
      cursor.y = fy + (ty - fy) * e + Math.sin(p * Math.PI) * -40;
      scheduleOverlay();
      if (p < 1) cursorAnim = requestAnimationFrame(step);
      else moveCursorSoon(1800 + Math.random() * 2200);
    })(t0);
  }

  /* ---------- Ouverture ---------- */
  new ResizeObserver(function() {
    if (!canvas.clientWidth) return;
    if (!sized) {
      sized = true;
      buildPage(state.page);
      world.querySelectorAll('.fg-page').forEach(function(l) { l.hidden = l.dataset.page !== state.page; });
      fitStart();
      if (!reduceMotion()) {
        loader.hidden = false;
        setTimeout(function() { loader.classList.add('is-done'); }, 650);
        setTimeout(function() { loader.hidden = true; }, 1000);
      }
      moveCursorSoon(1200);
    } else scheduleOverlay();
  }).observe(canvas);

  setTool('move');
  switchPage('masm');
})();
