/* ==========================================================
   VERSION MOBILE — écran d'accueil façon iPhone
   Les apps ouvrent les fenêtres du bureau en plein écran ;
   la barre du bas (ou un glissé vers le haut) ramène à l'accueil.
   ========================================================== */
(function() {
  var phone = document.getElementById('phone');
  var homebar = document.getElementById('phHomebar');

  // Pages d'étude de cas : la barre du bas ramène à l'écran d'accueil
  if (!phone) {
    if (!document.body.classList.contains('case-page')) return;
    var link = document.createElement('a');
    link.className = 'ph-homebar ph-homebar--link';
    link.href = 'index.html';
    link.setAttribute('aria-label', 'Revenir à l’écran d’accueil');
    link.innerHTML = '<span></span>';
    document.body.appendChild(link);
    return;
  }

  var mobile = window.matchMedia('(max-width: 760px)');

  /* ---------- Heure ---------- */
  var clock = document.getElementById('phClock');
  function tick() {
    clock.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 15000);

  /* ---------- App ouverte ? ---------- */
  var wins = Array.prototype.slice.call(document.querySelectorAll('.win'));
  function sync() {
    var open = wins.some(function(w) { return w.classList.contains('is-visible'); });
    document.body.classList.toggle('ph-app-open', open);
    homebar.hidden = !open;
  }
  var obs = new MutationObserver(sync);
  wins.forEach(function(w) { obs.observe(w, { attributes: true, attributeFilter: ['class'] }); });
  sync();

  // Fermer l'app du dessus : on réutilise le raccourci Échap du bureau
  function goHome() {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  }
  homebar.addEventListener('click', goHome);

  // Glisser vers le haut depuis le bas de l'écran
  var startY = null;
  homebar.addEventListener('pointerdown', function(e) { startY = e.clientY; });
  window.addEventListener('pointerup', function(e) {
    if (startY !== null && startY - e.clientY > 40) goHome();
    startY = null;
  });

  /* ---------- Dossier « Projets » ---------- */
  var folder = document.getElementById('phFolder');
  var folderBtn = document.getElementById('phFolderBtn');
  function setFolder(open) {
    folder.hidden = !open;
    folderBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      requestAnimationFrame(function() { folder.classList.add('is-open'); });
      folder.querySelector('.ph-app').focus();
    } else {
      folder.classList.remove('is-open');
    }
  }
  folderBtn.addEventListener('click', function() { setFolder(true); });
  folder.addEventListener('click', function(e) {
    if (e.target.closest('[data-project]')) { setFolder(false); return; }
    if (!e.target.closest('.ph-folder__panel')) { setFolder(false); folderBtn.focus(); }
  });
  folder.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { e.stopPropagation(); setFolder(false); folderBtn.focus(); }
  });

  /* ---------- Réglages : panneau d'accessibilité ---------- */
  document.getElementById('phA11yBtn').addEventListener('click', function(e) {
    e.stopPropagation(); // sinon le clic referme aussitôt le panneau
    var btn = document.getElementById('a11yMenubarBtn');
    if (btn) btn.click();
  });

  // Repasser en version bureau referme le dossier
  mobile.addEventListener('change', function() { if (!mobile.matches) setFolder(false); });
})();
