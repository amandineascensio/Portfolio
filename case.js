(function() {
  /* Horloge de la barre de menu */
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

  /* Échap = fermer la fenêtre → retour au bureau */
  var close = document.querySelector('.case-win .light--close');
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && close) window.location.href = close.getAttribute('href');
  });
})();
