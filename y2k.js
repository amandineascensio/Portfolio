(function() {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function calm() { return reduce || document.body.classList.contains('a11y-no-animations'); }

  // Menu mobile
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    function setMenu(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Menu');
      links.classList.toggle('is-open', open);
    }
    burger.addEventListener('click', function() { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    links.addEventListener('click', function(e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
    });
  }

  // Lien actif dans la nav selon la section visible
  var navAnchors = links ? links.querySelectorAll('a[href^="#"]') : [];
  if (navAnchors.length && 'IntersectionObserver' in window) {
    var byId = {};
    navAnchors.forEach(function(a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function(a) { a.removeAttribute('aria-current'); });
        var a = byId[en.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id], #top').forEach(function(s) { spy.observe(s); });
  }

  // Collection : inclinaison + reflet holographique qui suit la souris
  var runway = document.getElementById('runway');
  if (runway && finePointer) {
    runway.querySelectorAll('.look__link').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        if (calm()) return;
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', px * 100 + '%');
        card.style.setProperty('--my', py * 100 + '%');
        card.style.setProperty('--ry', (px - 0.5) * 6 + 'deg');
        card.style.setProperty('--rx', (0.5 - py) * 6 + 'deg');
      });
      card.addEventListener('mouseleave', function() {
        card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
      });
    });
  }

  // Cartes projets : au toucher, un premier tap retourne la carte, le second ouvre le projet
  document.querySelectorAll('.flip').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (finePointer) return;
      if (!card.classList.contains('is-flipped')) {
        e.preventDefault();
        document.querySelectorAll('.flip.is-flipped').forEach(function(c) { c.classList.remove('is-flipped'); });
        card.classList.add('is-flipped');
      }
    });
  });

  // Copier l'adresse mail
  var copyBtn = document.getElementById('copyMail');
  var copyStatus = document.getElementById('copyStatus');
  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(copyBtn.dataset.mail).then(function() {
        copyStatus.textContent = 'Adresse copiée ✦';
        setTimeout(function() { copyStatus.textContent = ''; }, 2500);
      }, function() {
        copyStatus.textContent = 'Copie impossible, sélectionne l’adresse à la main.';
      });
    });
  } else if (copyBtn) {
    copyBtn.hidden = true;
  }

  // Apparitions au scroll
  var targets = document.querySelectorAll('.section-head, .look, .flip, .bento__card, .atelier__photo, .atelier__text, .service, .timeline li, .skills > div, .contact__title, .case__body > section');
  if ('IntersectionObserver' in window && !reduce && !document.body.classList.contains('no-reveal')) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function(el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
