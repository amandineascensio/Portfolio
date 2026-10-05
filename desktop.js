(function() {
  var desktop = document.getElementById('desktop');
  var mobileQuery = window.matchMedia('(max-width: 760px)');
  var zTop = 10;
  var openers = {};

  /* ===== HORLOGE ===== */
  var clock = document.getElementById('clock');
  function tick() {
    var now = new Date();
    var date = now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
    var time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    clock.textContent = date + '  ' + time;
    clock.setAttribute('datetime', now.toISOString());
  }
  tick();
  setInterval(tick, 15000);

  /* ===== FENÊTRES ===== */
  var groups = {
    about: ['win-photo1', 'win-photo2', 'win-music', 'win-about'],
    photos: ['win-photo1', 'win-photo2']
  };

  function placeWindow(win) {
    if (win.dataset.placed) return;
    win.dataset.placed = '1';
    var w = parseFloat(win.dataset.w) || 480;
    win.style.setProperty('--w', w + 'px');
    var area = desktop.getBoundingClientRect();
    var width = Math.min(w, area.width - 24);
    var left = area.width * parseFloat(win.dataset.x || 0.5) - width / 2;
    var top = area.height * parseFloat(win.dataset.y || 0.15);
    top = Math.max(12, top);
    win.style.left = clamp(left, 12, area.width - width - 12) + 'px';
    win.style.top = top + 'px';
    // Ne pas passer sous le dock
    if (!mobileQuery.matches) win.style.maxHeight = Math.max(240, area.height - top - 92) + 'px';
  }

  function focusWindow(win) {
    document.querySelectorAll('.win.is-front').forEach(function(w) { w.classList.remove('is-front'); });
    win.classList.add('is-front');
    win.style.zIndex = ++zTop;
  }

  function openWindow(id, opener) {
    var win = document.getElementById(id);
    if (!win) return;
    if (opener) openers[id] = opener;
    placeWindow(win);
    focusWindow(win);
    if (win.hidden) {
      win.hidden = false;
      requestAnimationFrame(function() { win.classList.add('is-visible'); });
      bounceDock(id, opener);
    }
    win.focus({ preventScroll: true });
    updateDock();
  }

  function closeWindow(win) {
    win.classList.remove('is-visible', 'is-front');
    setTimeout(function() {
      if (!win.classList.contains('is-visible')) win.hidden = true;
    }, 200);
    var opener = openers[win.id];
    var front = topWindow(win);
    if (front) focusWindow(front);
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    updateDock(win.id);
  }

  function topWindow(except) {
    var best = null;
    document.querySelectorAll('.win.is-visible').forEach(function(w) {
      if (w === except) return;
      if (!best || (+w.style.zIndex || 0) > (+best.style.zIndex || 0)) best = w;
    });
    return best;
  }

  function openGroup(name, opener) {
    (groups[name] || []).forEach(function(id) { openWindow(id, opener); });
  }

  document.addEventListener('click', function(e) {
    var openBtn = e.target.closest('[data-open]');
    if (openBtn) { openWindow(openBtn.dataset.open, openBtn); return; }

    var groupBtn = e.target.closest('[data-open-group]');
    if (groupBtn) { openGroup(groupBtn.dataset.openGroup, groupBtn); return; }

    var projectBtn = e.target.closest('[data-project]');
    if (projectBtn) {
      openProject(projectBtn.dataset.project, projectBtn);
      return;
    }

    var closeBtn = e.target.closest('[data-close]');
    if (closeBtn) { closeWindow(closeBtn.closest('.win')); return; }

    var maxBtn = e.target.closest('[data-max]');
    if (maxBtn) { maxBtn.closest('.win').classList.toggle('is-max'); return; }
  });

  document.addEventListener('pointerdown', function(e) {
    var win = e.target.closest('.win');
    if (win) focusWindow(win);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    var front = topWindow();
    if (front) closeWindow(front);
  });

  /* ===== DÉPLACEMENT ===== */
  document.querySelectorAll('.win').forEach(function(win) {
    var handle = win.querySelector('.win__bar') || win.querySelector('.music') || win.querySelector('.contact-card');
    if (!handle) return;
    var startX, startY, originX, originY, pointerId = null;

    handle.addEventListener('pointerdown', function(e) {
      if (mobileQuery.matches || win.classList.contains('is-max')) return;
      if (e.button !== 0 || e.target.closest('button, a')) return;
      pointerId = e.pointerId;
      handle.setPointerCapture(pointerId);
      startX = e.clientX;
      startY = e.clientY;
      originX = win.offsetLeft;
      originY = win.offsetTop;
      win.classList.add('is-dragging');
    });

    handle.addEventListener('pointermove', function(e) {
      if (e.pointerId !== pointerId) return;
      var area = desktop.getBoundingClientRect();
      var x = originX + e.clientX - startX;
      var y = originY + e.clientY - startY;
      win.style.left = clamp(x, -win.offsetWidth + 80, area.width - 80) + 'px';
      win.style.top = clamp(y, 0, area.height - 40) + 'px';
    });

    function stop(e) {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      win.classList.remove('is-dragging');
    }
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  });

  /* ===== DOCK ===== */
  function isOpen(id, closing) {
    var w = document.getElementById(id);
    return w && id !== closing && w.classList.contains('is-visible');
  }

  function updateDock(closing) {
    requestAnimationFrame(function() {
      document.querySelectorAll('.dock__item').forEach(function(item) {
        var open = false;
        if (item.dataset.open) open = isOpen(item.dataset.open, closing);
        if (item.dataset.openGroup) {
          open = (groups[item.dataset.openGroup] || []).some(function(id) { return isOpen(id, closing); });
        }
        item.classList.toggle('is-open', !!open);
      });
    });
  }

  function bounceDock(id, opener) {
    var item = opener && opener.classList.contains('dock__item') ? opener
      : document.querySelector('.dock__item[data-open="' + id + '"]');
    if (!item) return;
    item.classList.remove('is-bouncing');
    void item.offsetWidth;
    item.classList.add('is-bouncing');
  }

  /* ===== LECTEUR ===== */
  var music = document.querySelector('.music');
  var playBtn = document.querySelector('.music__play');
  if (music && playBtn) {
    playBtn.addEventListener('click', function() {
      var playing = music.classList.toggle('is-playing');
      playBtn.setAttribute('aria-pressed', playing);
      playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Lecture');
    });
  }

  /* ===== MESSAGES / FAQ ===== */
  var faq = [
    {
      q: 'Tu es quel genre de designer ?',
      a: 'Product designer en alternance chez Bamptee. Je navigue entre UI et UX : interfaces web & mobile, composants Figma, design system… et j\'aime aller jusqu\'à l\'intégration HTML/CSS.'
    },
    {
      q: 'Comment tu es arrivée au design ?',
      a: 'Par un chemin pas très droit ! Langues étrangères, commerce, management chez E.Leclerc… À chaque étape j\'ai appris à écouter les gens. Le design a été la pièce qui manquait.'
    },
    {
      q: 'Qu\'est-ce qui compte le plus pour toi ?',
      a: 'Les détails qui ont l\'air de rien mais qui changent tout : l\'accessibilité, la cohérence visuelle et l\'expérience réelle des utilisateurs.'
    },
    {
      q: 'C\'est quoi, un bon design ?',
      a: 'Celui qui ne se fait pas remarquer. Il guide sans forcer, rassure sans expliquer, et laisse de la place à ce qui compte : le contenu et les gens.'
    },
    {
      q: 'Tes outils du quotidien ?',
      a: 'Figma avant tout, Photoshop pour la création visuelle, WordPress & Elementor pour l\'intégration, et Notion, Slack, Trello pour rester organisée.'
    },
    {
      q: 'On peut travailler ensemble ?',
      a: 'Avec plaisir ! Écris-moi à <a href="mailto:amandine.ascensio@hotmail.fr">amandine.ascensio@hotmail.fr</a> ou sur <a href="https://www.linkedin.com/in/amandine-ascensio-46ab17260/" target="_blank" rel="noopener">LinkedIn</a>.'
    }
  ];

  var thread = document.getElementById('chatThread');
  var suggest = document.getElementById('chatSuggest');
  var chatBusy = false;

  faq.forEach(function(item) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chat__q';
    btn.textContent = item.q;
    btn.addEventListener('click', function() { ask(item, btn); });
    suggest.appendChild(btn);
  });

  function addBubble(cls, html) {
    var p = document.createElement('p');
    p.className = 'bubble ' + cls;
    p.innerHTML = html;
    thread.appendChild(p);
    thread.scrollTop = thread.scrollHeight;
    return p;
  }

  function ask(item, btn) {
    if (chatBusy) return;
    chatBusy = true;
    btn.disabled = true;
    addBubble('bubble--out', escapeHtml(item.q));
    var typing = addBubble('bubble--in bubble--typing', '<span></span><span></span><span></span>');
    typing.setAttribute('aria-label', 'Amandine écrit…');
    setTimeout(function() {
      typing.remove();
      addBubble('bubble--in', item.a);
      chatBusy = false;
    }, 900);
  }

  /* ===== PROJETS (Finder) ===== */
  var projects = [
    {
      id: 'masm',
      num: 'Projet 01',
      name: 'MASM menuiserie',
      sub: 'Charte graphique · Site vitrine',
      img: 'assets/images/MacbookMockupMASM.svg',
      href: 'projet-masm.html',
      files: [
        { type: 'web', name: 'masm-menuiserie.fr', href: 'https://masm-menuiserie.vercel.app' }
      ],
      tldr: [
        'Un artisan menuisier, un savoir-faire haut de gamme… et un vieux site qui ne lui rendait pas du tout justice.',
        'J\'ai tout repris de zéro : <em>charte graphique</em>, maquettes desktop &amp; mobile sur Figma, puis l\'intégration et le SEO. Objectif : un site épuré qui inspire confiance et donne envie de demander un devis.',
        'Si tu veux voir un projet mené de A à Z, du brief client à la mise en ligne, c\'est celui-là.'
      ]
    },
    {
      id: 'spoonia',
      num: 'Projet 02',
      name: 'Spoonia',
      sub: 'UX research · Maquettes UI',
      img: 'assets/images/Design sans titre (2) 1.png',
      href: 'projet-spoonia.html',
      files: [
        { type: 'figma', name: 'Prototype.fig', href: 'https://www.figma.com/proto/8yLNZzu7J6PKfnjHUreGov/My-Digital-Project?node-id=407-1334&starting-point-node-id=407%3A1334&scaling=scale-down&content-scaling=fixed&hide-ui=1' }
      ],
      tldr: [
        'Une appli de micro-nutrition pour les personnes qui ont des contraintes alimentaires.',
        'Le défi : les aider à faire de meilleurs choix <em>sans les noyer sous les données</em>. Six mois de recherche utilisateur, personas, parcours, accessibilité, puis un prototype haute-fidélité sur Figma — et même la com\' Instagram.',
        'C\'est mon projet UX le plus complet : si tu n\'en lis qu\'un, lis celui-ci.'
      ]
    },
    {
      id: 'beatway',
      num: 'Projet 03',
      name: 'BeatWay',
      sub: 'Concours étudiant · Vivre en 2050',
      img: 'assets/images/BeatWayMobile.png',
      href: 'projet-beatway.html',
      files: [],
      tldr: [
        'Et si ton GPS se souciait de ton stress, pas juste du chemin le plus court ?',
        'BeatWay, c\'est une appli de navigation imaginée pour 2050 : des trajets adaptés à ton <em>rythme</em>, ton état et ton environnement. Conçue en une semaine pour un concours étudiant.',
        'Un projet court, intense, et très fun à imaginer.'
      ]
    },
    {
      id: 'vforvape',
      num: 'Projet 04',
      name: 'V For Vape',
      sub: 'Community Manager · Graphiste',
      img: 'assets/images/vforvape/Couverture Vforvape.svg',
      href: 'projet-vforvape.html',
      files: [],
      tldr: [
        '32 bannières produits, un an de réseaux sociaux, et beaucoup (beaucoup) d\'heures sur Photoshop.',
        'Le but : mettre en scène chaque produit de façon <em>immersive</em> tout en respectant l\'identité de chaque marque.',
        'C\'est ici que j\'ai appris le montage photo créatif — la galerie vaut le détour.'
      ]
    }
  ];

  var icons = { web: 'i-web', figma: 'i-figma', txt: 'i-txt', image: 'i-image' };
  var grid = document.getElementById('finderGrid');
  var finderTitle = document.getElementById('win-finder-title');
  var finderSub = document.getElementById('finderSub');

  function findProject(id) {
    for (var i = 0; i < projects.length; i++) if (projects[i].id === id) return projects[i];
    return null;
  }

  function filesFor(p) {
    return [{ type: 'folder', name: 'Étude de cas', href: p.href }]
      .concat(p.files)
      .concat([
        { type: 'txt', name: 'TL;DR.txt', action: 'tldr' },
        { type: 'image', name: 'aperçu.png', action: 'shot' }
      ]);
  }

  function fileHtml(f, attrs) {
    var img = f.type === 'folder'
      ? '<img class="icon__img icon__img--folder" src="assets/images/folder.png" alt="" width="56" height="56">'
      : '<svg class="icon__img icon__img--file" aria-hidden="true"><use href="#' + icons[f.type] + '"/></svg>';
    var inner = img +
      '<span class="icon__label">' + escapeHtml(f.name) + '</span>';
    if (f.href) {
      var ext = /^https?:/.test(f.href) ? ' target="_blank" rel="noopener"' : '';
      return '<a class="icon__btn" href="' + f.href + '"' + ext + attrs + '>' + inner + '</a>';
    }
    return '<button type="button" class="icon__btn"' + attrs + '>' + inner + '</button>';
  }

  function showProject(id) {
    var p = findProject(id);
    document.querySelectorAll('.finder__side-item[data-project]').forEach(function(b) {
      b.classList.toggle('is-active', b.dataset.project === (p ? id : 'all'));
    });

    if (!p) {
      finderTitle.textContent = 'Projets';
      finderSub.textContent = projects.length + ' projets récents';
      grid.innerHTML = projects.map(function(pr) {
        return '<li>' + fileHtml({ type: 'folder', name: pr.num + ' (' + pr.name + ')' }, ' data-project="' + pr.id + '"') + '</li>';
      }).join('');
      return;
    }

    finderTitle.textContent = p.name + ' (' + p.num + ')';
    finderSub.textContent = p.sub;
    grid.innerHTML = filesFor(p).map(function(f) {
      var attrs = f.action ? ' data-file="' + f.action + '" data-id="' + p.id + '"' : '';
      return '<li>' + fileHtml(f, attrs) + '</li>';
    }).join('');
  }

  grid.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-file]');
    if (!btn) return;
    var p = findProject(btn.dataset.id);
    if (btn.dataset.file === 'tldr') {
      document.getElementById('win-tldr-title').textContent = p.id + '.txt';
      document.getElementById('tldrBody').innerHTML = p.tldr.map(function(t) { return '<p>' + t + '</p>'; }).join('') +
        '<p class="doc__more"><a href="' + p.href + '">Lire l\'étude de cas complète →</a></p>';
      openWindow('win-tldr', btn);
    } else if (btn.dataset.file === 'shot') {
      document.getElementById('win-shot-title').textContent = p.id + '_aperçu.png';
      var img = document.getElementById('shotImg');
      img.src = p.img;
      img.alt = 'Aperçu du projet ' + p.name;
      openWindow('win-shot', btn);
    }
  });

  function openProject(id, opener) {
    openWindow('win-finder', opener);
    showProject(id);
  }

  showProject('all');

  // Retour depuis une étude de cas : index.html#masm, index.html#win-cv…
  function openFromHash() {
    var hash = decodeURIComponent(location.hash.slice(1));
    if (!hash) return;
    if (findProject(hash) || hash === 'projets') openProject(hash);
    else if (document.getElementById(hash) && document.getElementById(hash).classList.contains('win')) openWindow(hash);
    else if (groups[hash]) openGroup(hash);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  /* ===== TEXTE D'ACCUEIL : lettres au survol ===== */
  document.querySelectorAll('.welcome__small, .welcome__big').forEach(function(line) {
    var text = line.textContent;
    line.textContent = '';
    Array.prototype.forEach.call(text, function(ch) {
      if (ch === ' ') { line.appendChild(document.createTextNode(' ')); return; }
      var span = document.createElement('span');
      span.className = 'welcome__char';
      span.textContent = ch;
      line.appendChild(span);
    });
  });

  /* ===== DÉPLACEMENT DES ICÔNES DU BUREAU ===== */
  var ICONS_KEY = 'desktop-icons';
  var iconItems = Array.prototype.slice.call(document.querySelectorAll('.icons > .icon'));
  var justDragged = false;

  function iconKey(li, i) {
    var b = li.querySelector('.icon__btn');
    return (b && (b.dataset.project || b.dataset.open || b.dataset.openGroup)) || 'icon-' + i;
  }

  // Positions mémorisées (confort par visiteur, facultatif)
  try {
    var saved = JSON.parse(localStorage.getItem(ICONS_KEY) || '{}');
    iconItems.forEach(function(li, i) {
      var p = saved[iconKey(li, i)];
      if (p) { li.style.setProperty('--x', p.x + '%'); li.style.setProperty('--y', p.y + '%'); }
    });
  } catch (e) {}

  function saveIcons() {
    try {
      var out = {};
      iconItems.forEach(function(li, i) {
        out[iconKey(li, i)] = {
          x: parseFloat(li.style.getPropertyValue('--x')),
          y: parseFloat(li.style.getPropertyValue('--y'))
        };
      });
      localStorage.setItem(ICONS_KEY, JSON.stringify(out));
    } catch (e) {}
  }

  function selectIcon(btn) {
    document.querySelectorAll('.icons .icon__btn.is-selected').forEach(function(b) {
      if (b !== btn) b.classList.remove('is-selected');
    });
    if (btn) btn.classList.add('is-selected');
  }

  iconItems.forEach(function(li) {
    var btn = li.querySelector('.icon__btn');
    if (!btn) return;
    var pointerId = null, startX, startY, grabX, grabY, dragging = false;

    btn.addEventListener('dragstart', function(e) { e.preventDefault(); });

    btn.addEventListener('pointerdown', function(e) {
      if (mobileQuery.matches || e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      var r = li.getBoundingClientRect();
      grabX = e.clientX - (r.left + r.width / 2);
      grabY = e.clientY - r.top;
      dragging = false;
      btn.setPointerCapture(pointerId);
      selectIcon(btn);
    });

    btn.addEventListener('pointermove', function(e) {
      if (e.pointerId !== pointerId) return;
      if (!dragging) {
        if (Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY) < 5) return;
        dragging = true;
        li.classList.add('is-dragging');
      }
      var area = desktop.getBoundingClientRect();
      var x = clamp(e.clientX - grabX - area.left, 48, area.width - 48);
      var y = clamp(e.clientY - grabY - area.top, 4, area.height - li.offsetHeight - 96);
      li.style.setProperty('--x', (x / area.width * 100).toFixed(2) + '%');
      li.style.setProperty('--y', (y / area.height * 100).toFixed(2) + '%');
    });

    function end(e) {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (!dragging) return;
      dragging = false;
      li.classList.remove('is-dragging');
      justDragged = true;
      setTimeout(function() { justDragged = false; }, 0);
      saveIcons();
    }
    btn.addEventListener('pointerup', end);
    btn.addEventListener('pointercancel', end);
  });

  // Un dépôt ne doit pas ouvrir le dossier
  document.addEventListener('click', function(e) {
    if (justDragged && e.target.closest('.icons')) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);

  // Clic sur le fond du bureau : désélection
  desktop.addEventListener('pointerdown', function(e) {
    if (!e.target.closest('.icon__btn')) selectIcon(null);
  });

  /* ===== UTILS ===== */
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
