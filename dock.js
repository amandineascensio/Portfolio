/* Dock : grossissement des icônes autour du curseur, comme sur macOS.
   Tout passe par des transformations (pas de recalcul de mise en page). */
(function() {
  var dock = document.querySelector('.dock');
  var list = dock && dock.querySelector('.dock__list');
  if (!list) return;

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var MAX_SCALE = 1.85;   // taille max de l'icône sous le curseur
  var RANGE = 3.2;        // portée de la vague, en nombre d'icônes
  var FOLLOW = 0.55;      // réactivité (1 = colle au curseur)

  var slots = Array.prototype.slice.call(list.children); // <li> : icônes et séparateurs
  var base = 48;
  var centers = [];   // centres au repos (null = séparateur ou masqué)
  var scale = [];     // échelle affichée
  var goal = [];      // échelle visée
  var pointerX = null;
  var raf = null;

  function enabled() {
    return canHover.matches && !reduce.matches && window.innerWidth > 760;
  }

  function measure() {
    base = parseFloat(getComputedStyle(dock).getPropertyValue('--dock-icon')) || 48;
    centers = slots.map(function(li) {
      if (!li.offsetParent || !li.querySelector('.dock__item')) return null;
      var r = li.getBoundingClientRect();
      return r.left + r.width / 2;
    });
    slots.forEach(function(_, i) {
      if (scale[i] == null) scale[i] = 1;
      goal[i] = 1;
    });
  }

  function setGoals() {
    var range = base * RANGE;
    slots.forEach(function(_, i) {
      if (centers[i] == null || pointerX == null) { goal[i] = 1; return; }
      var t = Math.max(0, 1 - Math.abs(pointerX - centers[i]) / range);
      goal[i] = 1 + (MAX_SCALE - 1) * (1 - Math.cos(t * Math.PI)) / 2;
    });
  }

  function frame() {
    raf = null;
    var moving = false;
    var extra = [];
    var total = 0;

    slots.forEach(function(_, i) {
      var d = goal[i] - scale[i];
      if (Math.abs(d) > 0.002) { scale[i] += d * FOLLOW; moving = true; }
      else scale[i] = goal[i];
      extra[i] = centers[i] == null ? 0 : (scale[i] - 1) * base;
      total += extra[i];
    });

    // Décale chaque icône pour lui faire de la place, en restant centré
    var before = 0;
    slots.forEach(function(li, i) {
      var tx = before + extra[i] / 2 - total / 2;
      before += extra[i];
      if (total < 0.05) {
        li.style.removeProperty('transform');
        li.style.removeProperty('--s');
        li.style.removeProperty('--size');
      } else {
        li.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,0,0)';
        li.style.setProperty('--s', scale[i].toFixed(4));
        li.style.setProperty('--size', (base * scale[i]).toFixed(1) + 'px');
      }
    });
    dock.style.setProperty('--grow', total.toFixed(2) + 'px');

    if (moving) raf = requestAnimationFrame(frame);
    else if (pointerX == null) {
      dock.classList.remove('is-magnify');
      dock.style.removeProperty('--grow');
    }
  }

  function tick() { if (!raf) raf = requestAnimationFrame(frame); }

  dock.addEventListener('pointermove', function(e) {
    if (e.pointerType !== 'mouse' || !enabled()) return;
    if (pointerX == null && !raf) measure(); // mesure au repos uniquement
    dock.classList.add('is-magnify');
    pointerX = e.clientX;
    setGoals();
    tick();
  });

  dock.addEventListener('pointerleave', function() {
    if (pointerX == null) return;
    pointerX = null;
    setGoals();
    tick();
  });

  window.addEventListener('resize', function() {
    if (pointerX == null && !raf) { centers = []; scale = []; }
  });
})();
