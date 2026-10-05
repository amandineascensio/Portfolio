/* ==========================================================
   SLACK — espace de travail fictif « Studio Amandine »
   Canaux de design, réactions, fils de discussion et envoi de
   messages (enregistrés dans ce navigateur uniquement).
   ========================================================== */
(function() {
  var win = document.getElementById('win-slack');
  if (!win) return;

  var STORE_KEY = 'slack-messages';
  var IMG = 'assets/images/figma/';

  /* ---------- Membres (fictifs, hormis Amandine) ---------- */
  var USERS = {
    amandine: { name: 'Amandine Ascensio', role: 'UI/UX designer', img: 'assets/images/avatar.png' },
    lea: { name: 'Léa', role: 'UX researcher', color: '#e8912d' },
    hugo: { name: 'Hugo', role: 'Développeur front-end', color: '#2bac76' },
    ines: { name: 'Inès', role: 'Directrice artistique', color: '#1264a3' },
    tom: { name: 'Tom', role: 'Product owner', color: '#e01e5a' },
    figma: { name: 'Figma', role: 'Application', img: 'assets/images/figma.png', bot: true },
    me: { name: 'Toi', role: 'Visiteur·se du portfolio', color: '#611f69' }
  };

  /* ---------- Canaux ---------- */
  var CHANNELS = [
    { id: 'general', name: 'général', topic: 'Les coulisses du portfolio d’Amandine', members: 6, msgs: [
      { day: 'Hier' },
      { u: 'amandine', t: '09:12', text: 'Bienvenue sur le Slack du studio 👋 Ici je partage mes **inspis**, mes **crits** et les coulisses de mes projets. Fais comme chez toi : tu peux réagir et écrire dans tous les canaux.', react: [['👋', 5], ['💜', 3]], pinned: true },
      { u: 'tom', t: '09:20', text: 'Rappel : la démo de **Spoonia** est jeudi 14 h. On montre le parcours d’onboarding et le dashboard 🍏', react: [['👍', 4]] },
      { day: 'Aujourd’hui' },
      { u: 'ines', t: '10:02', text: 'Petit tour dans #design-crit, il y a le nouveau mockup BeatWay à commenter 🎧' },
      { u: 'hugo', t: '10:05', text: 'Et dans #ui-kit j’ai poussé les tokens de couleur, dites-moi si les noms vous vont 🙏', react: [['👀', 2]] }
    ] },
    { id: 'design-crit', name: 'design-crit', topic: 'Critiques bienveillantes, mais honnêtes', members: 5, unread: 3, msgs: [
      { day: 'Aujourd’hui' },
      { u: 'amandine', t: '09:41', text: 'Nouvelle version du dashboard **Spoonia** ! J’ai allégé la hiérarchie et regroupé les alertes en haut. Vos avis ?', img: IMG + 'sp-dashboard.webp', imgAlt: 'Dashboard de l’application Spoonia', react: [['🔥', 4], ['🍏', 2]],
        thread: [
          { u: 'lea', t: '09:48', text: 'Beaucoup plus lisible 👏 En test, 4 personnes sur 5 trouvaient les alertes du premier coup.' },
          { u: 'ines', t: '09:52', text: 'J’aime le vert ! Peut-être un peu plus d’air entre les cartes ?' },
          { u: 'amandine', t: '09:55', text: 'Bien vu, je passe la marge à 24 px 👌' }
        ] },
      { u: 'figma', t: '10:14', text: 'Inès a commenté **BeatWay — Mockup principal** : « Le bouton “Lancer le trajet” mérite plus de contraste sur fond sombre. »', figma: true },
      { u: 'amandine', t: '10:20', text: 'Et voilà la refonte du mockup **BeatWay**, avec le bouton plus contrasté.', img: IMG + 'bw-mockup-main.webp', imgAlt: 'Mockup de l’application BeatWay', react: [['🎧', 3], ['✅', 2]] },
      { u: 'tom', t: '10:26', text: 'Validé côté produit ✅ On peut l’envoyer en test cette semaine ?' }
    ] },
    { id: 'inspiration', name: 'inspiration', topic: 'Les sites et apps qui nous font de l’effet ✨', members: 6, unread: 2, msgs: [
      { day: 'Hier' },
      { u: 'ines', t: '16:30', text: 'Le site du jour sur Awwwards est une claque. Le scroll est si fluide 🤯', link: 'awwwards', react: [['🤯', 3]] },
      { u: 'lea', t: '17:02', text: 'Pour le benchmark des onboardings, Mobbin c’est la mine d’or. Il y a tous les écrans des grosses apps.', link: 'mobbin' },
      { day: 'Aujourd’hui' },
      { u: 'hugo', t: '08:55', text: 'Je vous laisse ça pour le café : des effets de survol avec le code pour les refaire ☕', link: 'codrops', react: [['😍', 2]] },
      { u: 'amandine', t: '09:10', text: 'Ma routine du matin : Godly pour les animations, et Laws of UX quand je dois justifier un choix en réunion 😇', link: 'godly' }
    ] },
    { id: 'typographie', name: 'typographie', topic: 'Kerning, graisses et débats passionnés', members: 4, msgs: [
      { day: 'Aujourd’hui' },
      { u: 'ines', t: '11:03', text: 'Débat du jour : pour les titres du portfolio, serif ou grotesque ?' },
      { u: 'amandine', t: '11:05', text: 'Team serif pour les titres, sans-serif pour le texte. Le contraste fait tout ✍️', react: [['💯', 3]] },
      { u: 'hugo', t: '11:07', text: 'Et si on testait Comic Sans ?', react: [['😱', 4], ['🚫', 3]],
        thread: [
          { u: 'ines', t: '11:08', text: 'Non.' },
          { u: 'amandine', t: '11:08', text: 'Le fichier est déjà dans la corbeille 🗑️' }
        ] },
      { u: 'lea', t: '11:15', text: 'Fonts In Use pour voir les polices en situation réelle, c’est parfait pour trancher.', link: 'fontsinuse' }
    ] },
    { id: 'ui-kit', name: 'ui-kit', topic: 'Tokens, composants et conventions de nommage', members: 4, unread: 1, msgs: [
      { day: 'Aujourd’hui' },
      { u: 'hugo', t: '10:01', text: 'J’ai poussé les tokens de couleur du design system :', swatches: [['primary', '#ECBCBC'], ['ink', '#242221'], ['accent', '#FBE48B'], ['success', '#3FAE6A'], ['surface', '#F6F1E7']] },
      { u: 'hugo', t: '10:02', text: 'Côté code, ça donne ça :', code: ':root {\n  --color-primary: #ecbcbc;\n  --color-ink: #242221;\n  --color-accent: #fbe48b;\n  --radius-card: 16px;\n}' },
      { u: 'amandine', t: '10:12', text: 'Top ! Petite règle : on nomme selon l’**usage** (`primary`, `surface`), jamais selon la couleur (`rose-clair`). Comme ça on peut changer de palette sans tout renommer.', react: [['🙏', 2], ['📌', 1]] }
    ] },
    { id: 'accessibilite', name: 'accessibilité', topic: 'Un design réussi est un design utilisable par tout le monde', members: 5, msgs: [
      { day: 'Aujourd’hui' },
      { u: 'lea', t: '14:20', text: 'Rappel contraste : **4,5:1** minimum pour le texte courant, **3:1** pour les gros titres et les icônes.' },
      { u: 'amandine', t: '14:24', text: 'J’ai ajouté un panneau d’accessibilité au portfolio, il se trouve dans la barre du haut. On peut y agrandir le texte, passer en mode sombre et réduire les animations ♿', react: [['💜', 4]] },
      { u: 'hugo', t: '14:30', text: 'Et je vérifie toujours la navigation au clavier : Tab, Entrée, Échap. Si on se perd, c’est un bug 🐛' }
    ] },
    { id: 'pause-cafe', name: 'pause-café', topic: 'Rien de sérieux ici ☕', members: 6, msgs: [
      { day: 'Aujourd’hui' },
      { u: 'tom', t: '12:30', text: 'Qui a encore renommé un fichier « logo_final_FINAL_v3.fig » ? 😂', react: [['😂', 5]] },
      { u: 'amandine', t: '12:32', text: 'Coupable 🙋‍♀️ Il est dans la corbeille maintenant, promis.' },
      { u: 'ines', t: '12:40', text: 'Rappel : on ne met pas d’ombre portée à 100 % d’opacité. Merci de votre attention.', react: [['🫡', 3]] }
    ] }
  ];
  var DMS = [
    { id: 'dm-lea', dm: 'lea', msgs: [
      { day: 'Aujourd’hui' },
      { u: 'lea', t: '09:30', text: 'Coucou ! J’ai fini la synthèse des tests utilisateurs Spoonia, je te l’envoie après le déjeuner 📋' },
      { u: 'amandine', t: '09:33', text: 'Génial, merci Léa 🙏' }
    ] },
    { id: 'dm-ines', dm: 'ines', unread: 1, msgs: [
      { day: 'Aujourd’hui' },
      { u: 'ines', t: '15:02', text: 'Ton portfolio en mode macOS, c’est une super idée. Le dock avec l’effet loupe 😍' }
    ] },
    { id: 'dm-hugo', dm: 'hugo', msgs: [
      { day: 'Hier' },
      { u: 'hugo', t: '18:10', text: 'Les maquettes BeatWay sont intégrées. Tu me fais un retour pixel-perfect demain ?' },
      { u: 'amandine', t: '18:12', text: 'Avec plaisir, prépare le café ☕' }
    ] }
  ];
  var ALL = CHANNELS.concat(DMS);
  var byId = {};
  ALL.forEach(function(c) {
    byId[c.id] = c;
    c.msgs.forEach(function(m, i) { m.id = c.id + '-' + i; });
  });

  var SITE_INFO = {
    awwwards: ['Awwwards', 'awwwards.com', 'Les meilleurs sites web du moment, récompensés chaque jour.'],
    mobbin: ['Mobbin', 'mobbin.com', 'Des milliers d’écrans d’apps réelles, classés par parcours.'],
    codrops: ['Codrops', 'tympanus.net/codrops', 'Tutoriels et démos d’effets web créatifs.'],
    godly: ['Godly', 'godly.website', 'L’inspiration web la plus audacieuse, en vidéo.'],
    fontsinuse: ['Fonts In Use', 'fontsinuse.com', 'Les typographies utilisées dans de vrais projets.']
  };

  /* Réponses automatiques de l'équipe quand le visiteur écrit */
  var REPLIES = {
    general: [['amandine', 'Merci pour ton message ! 😊 Pour me contacter pour de vrai, l’app Contacts du dock t’attend.'], ['tom', 'Bienvenue dans l’équipe 🎉']],
    'design-crit': [['ines', 'Bon retour ! Je le note pour la prochaine itération ✍️'], ['lea', 'Intéressant, on pourrait le tester avec des utilisateurs 🧪']],
    inspiration: [['ines', 'Oh je ne connaissais pas, merci du partage ✨'], ['hugo', 'Ajouté à mes favoris 🔖']],
    typographie: [['ines', 'Tant que ce n’est pas Comic Sans, je valide 😌']],
    'ui-kit': [['hugo', 'Ok, je l’ajoute dans les tokens 🛠️']],
    accessibilite: [['lea', 'Merci ! Chaque détail compte pour l’accessibilité 💜']],
    'pause-cafe': [['tom', 'Haha 😂'], ['amandine', '☕☕☕']],
    'dm-lea': [['lea', 'Bien reçu, merci ! 📋']],
    'dm-ines': [['ines', 'Avec plaisir 😍']],
    'dm-hugo': [['hugo', 'Ça marche, je regarde ça 👨‍💻']]
  };

  /* ---------- Stockage (messages du visiteur) ---------- */
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { saved = {}; }
  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) { /* stockage indisponible */ }
  }
  function extra(key) { return saved[key] || (saved[key] = []); }

  /* ---------- État ---------- */
  var current = 'general';
  var threadOf = null;
  var reacted = {}; // msgId|emoji -> true

  var sideEl = document.getElementById('slSidebar');
  var headEl = document.getElementById('slHead');
  var listEl = document.getElementById('slMessages');
  var formEl = document.getElementById('slComposer');
  var inputEl = document.getElementById('slInput');
  var typingEl = document.getElementById('slTyping');
  var threadEl = document.getElementById('slThread');
  var searchEl = document.getElementById('slSearch');
  var appEl = win.querySelector('.sl');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Mise en forme façon Slack : **gras**, `code`, #canal
  function format(text) {
    return esc(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/#([a-zà-ÿ-]+)/gi, function(all, name) {
        var c = CHANNELS.filter(function(x) { return x.name === name; })[0];
        return c ? '<button type="button" class="sl-chan-link" data-chan="' + c.id + '">#' + esc(name) + '</button>' : all;
      })
      .replace(/\n/g, '<br>');
  }
  function now() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  function avatar(id, cls) {
    var u = USERS[id];
    return u.img ? '<img class="sl-av' + (cls ? ' ' + cls : '') + '" src="' + u.img + '" alt="" width="36" height="36">' :
      '<span class="sl-av' + (cls ? ' ' + cls : '') + '" style="background:' + u.color + '" aria-hidden="true">' + esc(u.name.charAt(0)) + '</span>';
  }
  function title(c) { return c.dm ? USERS[c.dm].name : c.name; }
  function messagesOf(c) { return c.msgs.concat(extra(c.id)); }
  function repliesOf(m) { return (m.thread || []).concat(extra('thread:' + m.id)); }

  /* ---------- Barre latérale ---------- */
  var HASH = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 3L6 17M14 3l-2 14M3.5 7.5h13M3 12.5h13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  function renderSidebar() {
    function item(c) {
      var on = c.id === current, unread = c.unread && !on;
      var icon = c.dm ? '<span class="sl-side__av">' + avatar(c.dm, 'sl-av--xs') + '<i class="sl-presence"></i></span>' : '<span class="sl-side__hash">' + HASH + '</span>';
      return '<li><button type="button" class="sl-side__item' + (on ? ' is-active' : '') + (unread ? ' is-unread' : '') + '" data-chan="' + c.id + '"' + (on ? ' aria-current="true"' : '') + '>' +
        icon + '<span class="sl-side__name">' + esc(title(c)) + '</span>' + (unread ? '<span class="sl-badge">' + c.unread + '<span class="sr-only"> non lus</span></span>' : '') + '</button></li>';
    }
    sideEl.innerHTML =
      '<div class="sl-side__ws"><button type="button" class="sl-side__wsname" tabindex="-1">Studio Amandine <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div>' +
      '<p class="sl-side__sec">Canaux</p><ul>' + CHANNELS.map(item).join('') + '</ul>' +
      '<p class="sl-side__sec">Messages directs</p><ul>' + DMS.map(item).join('') + '</ul>';
  }

  /* ---------- Messages ---------- */
  function linkCard(id) {
    var s = SITE_INFO[id];
    return '<div class="sl-unfurl"><p class="sl-unfurl__site">' + esc(s[1]) + '</p><p class="sl-unfurl__title">' + esc(s[0]) + '</p>' +
      '<p class="sl-unfurl__desc">' + esc(s[2]) + '</p>' +
      '<button type="button" class="sl-btn" data-open="win-safari" data-sf="' + id + '">Ouvrir dans Safari</button></div>';
  }
  function msgBody(m) {
    var h = '<div class="sl-text">' + format(m.text) + '</div>';
    if (m.img) h += '<img class="sl-img" src="' + m.img + '" alt="' + esc(m.imgAlt || '') + '" loading="lazy">';
    if (m.link) h += linkCard(m.link);
    if (m.figma) h += '<div class="sl-unfurl sl-unfurl--figma"><button type="button" class="sl-btn" data-open="win-figma">Voir dans Figma</button></div>';
    if (m.code) h += '<pre class="sl-code"><code>' + esc(m.code) + '</code></pre>';
    if (m.swatches) h += '<ul class="sl-swatches">' + m.swatches.map(function(s) {
      return '<li><span style="background:' + s[1] + '"></span><b>' + esc(s[0]) + '</b><small>' + s[1] + '</small></li>';
    }).join('') + '</ul>';
    return h;
  }
  function reactions(m) {
    var list = (m.react || []).map(function(r) { return [r[0], r[1]]; });
    Object.keys(reacted).forEach(function(k) {
      var p = k.split('|');
      if (p[0] !== m.id || !reacted[k]) return;
      var hit = list.filter(function(r) { return r[0] === p[1]; })[0];
      if (!hit) list.push([p[1], 0]);
    });
    if (!list.length) return '';
    return '<div class="sl-reacts">' + list.map(function(r) {
      var mine = reacted[m.id + '|' + r[0]];
      var n = r[1] + (mine ? 1 : 0);
      return '<button type="button" class="sl-react' + (mine ? ' is-mine' : '') + '" data-react="' + r[0] + '" data-msg="' + m.id + '" aria-pressed="' + !!mine + '" aria-label="' + r[0] + ' ' + n + ' réaction' + (n > 1 ? 's' : '') + '">' + r[0] + ' <span>' + n + '</span></button>';
    }).join('') + '</div>';
  }
  function message(m, prev, inThread) {
    if (m.day) return '<li class="sl-day" role="separator"><span>' + esc(m.day) + '</span></li>';
    var u = USERS[m.u];
    var grouped = prev && prev.u === m.u && !prev.day && !m.pinned;
    var replies = inThread ? [] : repliesOf(m);
    return '<li class="sl-msg' + (grouped ? ' is-grouped' : '') + (m.pinned ? ' is-pinned' : '') + '" data-id="' + m.id + '">' +
      (m.pinned ? '<p class="sl-pin">📌 Épinglé par Amandine Ascensio</p>' : '') +
      '<div class="sl-msg__row">' + (grouped ? '<span class="sl-msg__time sl-msg__time--side">' + esc(m.t) + '</span>' : avatar(m.u)) +
      '<div class="sl-msg__main">' + (grouped ? '' : '<p class="sl-msg__head"><b>' + esc(u.name) + '</b>' + (u.bot ? '<span class="sl-app">APP</span>' : '') + '<span class="sl-msg__time">' + esc(m.t) + '</span></p>') +
      msgBody(m) + reactions(m) +
      (replies.length ? '<button type="button" class="sl-replies" data-thread="' + m.id + '">' + uniq(replies).map(function(id) { return avatar(id, 'sl-av--xs'); }).join('') +
        '<b>' + replies.length + ' réponse' + (replies.length > 1 ? 's' : '') + '</b><span>Dernière réponse à ' + esc(replies[replies.length - 1].t) + '</span></button>' : '') +
      '</div></div>' +
      (inThread || !m.u ? '' : '<div class="sl-hover" role="toolbar" aria-label="Actions sur le message">' +
        ['✅', '👀', '🙌'].map(function(e) { return '<button type="button" data-react="' + e + '" data-msg="' + m.id + '" aria-label="Réagir avec ' + e + '">' + e + '</button>'; }).join('') +
        '<button type="button" data-thread="' + m.id + '" aria-label="Répondre dans le fil">💬</button></div>') +
      '</li>';
  }
  function uniq(list) {
    var seen = {}, out = [];
    list.forEach(function(m) { if (!seen[m.u]) { seen[m.u] = 1; out.push(m.u); } });
    return out.slice(0, 3);
  }
  function list(msgs, inThread) {
    return msgs.map(function(m, i) { return message(m, msgs[i - 1], inThread); }).join('');
  }
  function findMsg(id) {
    var found = null;
    ALL.forEach(function(c) { messagesOf(c).forEach(function(m) { if (m.id === id) found = m; }); });
    return found;
  }

  function renderHead() {
    var c = byId[current];
    headEl.innerHTML = '<button type="button" class="sl-back" data-back aria-label="Retour aux canaux"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4.5L6.5 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<h3 class="sl-head__title" id="slChanTitle">' + (c.dm ? avatar(c.dm, 'sl-av--xs') : HASH) + esc(title(c)) + '</h3>' +
      (c.dm ? '<p class="sl-head__topic">' + esc(USERS[c.dm].role) + '</p>' : '<p class="sl-head__topic">' + esc(c.topic) + '</p>') +
      (c.dm ? '' : '<span class="sl-head__members" aria-label="' + c.members + ' membres">' + ['amandine', 'ines', 'lea'].map(function(id) { return avatar(id, 'sl-av--xs'); }).join('') + '<b>' + c.members + '</b></span>');
    inputEl.placeholder = 'Envoyer un message ' + (c.dm ? 'à ' + title(c) : 'dans #' + c.name);
    inputEl.setAttribute('aria-label', inputEl.placeholder);
  }
  function renderMessages(stick) {
    var c = byId[current];
    var intro = '<li class="sl-intro"><p class="sl-intro__title">' + (c.dm ? avatar(c.dm) + esc(title(c)) : '# ' + esc(c.name)) + '</p>' +
      '<p>' + (c.dm ? 'Début de ta conversation avec <b>' + esc(title(c)) + '</b>.' : 'Début du canal <b>#' + esc(c.name) + '</b>. ' + esc(c.topic) + '.') + '</p></li>';
    listEl.innerHTML = intro + list(messagesOf(c));
    if (stick !== false) listEl.parentNode.scrollTop = listEl.parentNode.scrollHeight;
  }
  function renderThread() {
    if (!threadOf) { threadEl.hidden = true; threadEl.innerHTML = ''; appEl.classList.remove('has-thread'); return; }
    var m = findMsg(threadOf);
    var r = repliesOf(m);
    threadEl.hidden = false;
    appEl.classList.add('has-thread');
    threadEl.innerHTML = '<header class="sl-thread__head"><h3>Fil de discussion</h3><button type="button" class="sl-icon-btn" data-close-thread aria-label="Fermer le fil">✕</button></header>' +
      '<div class="sl-thread__scroll"><ul class="sl-list">' + message(m, null, true) +
      '<li class="sl-thread__count"><span>' + r.length + ' réponse' + (r.length > 1 ? 's' : '') + '</span></li>' + list(r, true) + '</ul></div>' +
      '<form class="sl-composer sl-composer--thread" data-thread-form><label class="sr-only" for="slThreadInput">Répondre dans le fil</label>' +
      '<textarea id="slThreadInput" rows="1" placeholder="Répondre…"></textarea><button type="submit" class="sl-send" aria-label="Envoyer"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10l14-6-5 14-2.5-5.5z" fill="currentColor"/></svg></button></form>';
    var sc = threadEl.querySelector('.sl-thread__scroll');
    sc.scrollTop = sc.scrollHeight;
  }

  function open(id, focusInput) {
    if (!byId[id]) return;
    current = id;
    byId[id].unread = 0;
    searchEl.value = '';
    appEl.classList.add('is-chat');
    renderSidebar(); renderHead(); renderMessages(); renderThread();
    if (focusInput) inputEl.focus();
  }

  /* ---------- Envoi ---------- */
  var typingTimer;
  function send(text, threadId) {
    var msg = { u: 'me', t: now(), text: text };
    if (threadId) {
      msg.id = threadId + '-r' + extra('thread:' + threadId).length;
      extra('thread:' + threadId).push(msg);
    } else {
      msg.id = current + '-x' + extra(current).length;
      extra(current).push(msg);
    }
    trim(); persist();
    renderMessages(); renderThread();
    reply(current, threadId);
  }
  function trim() {
    Object.keys(saved).forEach(function(k) { if (saved[k].length > 40) saved[k] = saved[k].slice(-40); });
  }
  function reply(chanId, threadId) {
    var opts = REPLIES[chanId] || REPLIES.general;
    var r = opts[Math.floor(Math.random() * opts.length)];
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
      typingEl.textContent = USERS[r[0]].name + ' est en train d’écrire…';
      typingTimer = setTimeout(function() {
        typingEl.textContent = '';
        var key = threadId ? 'thread:' + threadId : chanId;
        var msg = { u: r[0], t: now(), text: r[1] };
        msg.id = (threadId || chanId) + '-a' + extra(key).length;
        extra(key).push(msg);
        trim(); persist();
        if (current === chanId) { renderMessages(); renderThread(); }
        else { byId[chanId].unread = (byId[chanId].unread || 0) + 1; renderSidebar(); }
      }, 1400);
    }, 600);
  }

  formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    var t = inputEl.value.trim();
    if (!t) return;
    inputEl.value = '';
    autosize(inputEl);
    send(t);
  });
  function autosize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 140) + 'px'; }
  win.addEventListener('input', function(e) { if (e.target.tagName === 'TEXTAREA') autosize(e.target); });
  win.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'TEXTAREA' && e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      e.target.form.requestSubmit();
      return;
    }
    if (e.key === 'Escape') {
      // Échap ferme d'abord la recherche ou le fil, puis seulement la fenêtre
      if (searchEl.value) { searchEl.value = ''; renderMessages(); renderHead(); }
      else if (threadOf) { threadOf = null; renderThread(); inputEl.focus(); }
      else return;
      e.stopPropagation();
    }
  });
  win.addEventListener('submit', function(e) {
    if (!e.target.matches('[data-thread-form]')) return;
    e.preventDefault();
    var ta = e.target.querySelector('textarea'), t = ta.value.trim();
    if (!t) return;
    send(t, threadOf);
    var again = document.getElementById('slThreadInput');
    if (again) again.focus();
  });

  /* ---------- Clics ---------- */
  win.addEventListener('click', function(e) {
    var t = e.target;
    var chan = t.closest('[data-chan]');
    if (chan) { threadOf = null; open(chan.dataset.chan, true); return; }
    var re = t.closest('[data-react]');
    if (re) {
      var k = re.dataset.msg + '|' + re.dataset.react;
      reacted[k] = !reacted[k];
      var sc = listEl.parentNode.scrollTop;
      renderMessages(false); listEl.parentNode.scrollTop = sc;
      if (threadOf) renderThread();
      var again = win.querySelector('.sl-react[data-msg="' + re.dataset.msg + '"][data-react="' + re.dataset.react + '"]');
      if (again && re.classList.contains('sl-react')) again.focus();
      return;
    }
    var th = t.closest('[data-thread]');
    if (th) {
      threadOf = th.dataset.thread;
      renderThread();
      var ti = document.getElementById('slThreadInput');
      if (ti) ti.focus();
      return;
    }
    if (t.closest('[data-close-thread]')) { threadOf = null; renderThread(); inputEl.focus(); return; }
    if (t.closest('[data-back]')) { appEl.classList.remove('is-chat'); threadOf = null; renderThread(); return; }
    var sf = t.closest('[data-sf]');
    if (sf && window.safariGo) window.safariGo(sf.dataset.sf); // desktop.js ouvre ensuite la fenêtre Safari
  });

  /* ---------- Recherche ---------- */
  searchEl.addEventListener('input', function() {
    var q = searchEl.value.trim().toLowerCase();
    if (!q) { renderHead(); renderMessages(); return; }
    var hits = [];
    ALL.forEach(function(c) {
      messagesOf(c).forEach(function(m) { if (m.text && m.text.toLowerCase().indexOf(q) !== -1) hits.push([c, m]); });
    });
    headEl.innerHTML = '<h3 class="sl-head__title" id="slChanTitle">Résultats pour « ' + esc(searchEl.value.trim()) + ' »</h3><p class="sl-head__topic">' + hits.length + ' message' + (hits.length > 1 ? 's' : '') + '</p>';
    listEl.innerHTML = hits.length ? hits.map(function(h) {
      return '<li class="sl-hit"><button type="button" class="sl-hit__chan" data-chan="' + h[0].id + '">' + (h[0].dm ? '' : '#') + esc(title(h[0])) + '</button>' + message(h[1], null, true) + '</li>';
    }).join('') : '<li class="sl-empty">Aucun message ne correspond. Essaie « Spoonia » ou « typo ».</li>';
    appEl.classList.add('is-chat');
    listEl.parentNode.scrollTop = 0;
  });
  document.getElementById('slSearchForm').addEventListener('submit', function(e) { e.preventDefault(); });

  open('general');
  appEl.classList.remove('is-chat'); // sur mobile, on commence par la liste des canaux
})();
