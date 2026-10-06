/* ==========================================================
   LECTEUR — « Playlist focus »
   Une boucle lo-fi générée en direct avec la Web Audio API
   (aucun fichier audio). Elle démarre quand le lecteur s'ouvre
   et s'arrête quand on le ferme.
   ========================================================== */
(function() {
  var win = document.getElementById('win-music');
  var music = win && win.querySelector('.music');
  var playBtn = win && win.querySelector('.music__play');
  if (!music || !playBtn) return;

  var AC = window.AudioContext || window.webkitAudioContext;
  var BPM = 76, BEAT = 60 / BPM, STEP = BEAT / 2; // croches
  // Fmaj7 – Em7 – Dm7 – Cmaj7, une mesure chacun
  var CHORDS = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]];
  var BASS = [41, 40, 38, 36];
  var MELODY = [72, null, 69, null, 67, null, null, 64, 71, null, 67, null, 64, null, 62, null,
    69, null, 65, null, 64, null, null, 62, 67, null, 64, null, 60, null, null, null];

  var ctx = null, master, noiseBuf, timer = null, step = 0, nextTime = 0, playing = false;

  function freq(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function setup() {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    var tone = ctx.createBiquadFilter(); // son feutré, comme une vieille cassette
    tone.type = 'lowpass';
    tone.frequency.value = 2600;
    master.connect(tone);
    tone.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var d = noiseBuf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    crackle();
  }

  // Note de piano électrique : sinus + triangle, attaque douce
  function keys(n, t, dur, vol) {
    [['sine', 1, 1], ['triangle', 2, 0.18]].forEach(function(o) {
      var osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = o[0];
      osc.frequency.value = freq(n) * o[1];
      osc.detune.value = (Math.random() - 0.5) * 8; // léger flottement
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol * o[2], t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + dur + 0.05);
    });
  }
  function kick(t) {
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.18);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(g); g.connect(master);
    osc.start(t); osc.stop(t + 0.4);
  }
  function noise(t, dur, vol, type, f) {
    var src = ctx.createBufferSource(), flt = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = noiseBuf;
    flt.type = type; flt.frequency.value = f;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(flt); flt.connect(g); g.connect(master);
    src.start(t, Math.random() * 0.5); src.stop(t + dur);
  }
  // Crépitement de vinyle en fond
  function crackle() {
    var src = ctx.createBufferSource(), flt = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = noiseBuf; src.loop = true;
    flt.type = 'highpass'; flt.frequency.value = 3000;
    g.gain.value = 0.012;
    src.connect(flt); flt.connect(g); g.connect(master);
    src.start();
  }

  function schedule(s, t) {
    var bar = Math.floor(s / 8) % 4, inBar = s % 8;
    if (inBar === 0) {
      CHORDS[bar].forEach(function(n) { keys(n, t, BEAT * 3.8, 0.07); });
      keys(BASS[bar], t, BEAT * 1.8, 0.16);
    }
    if (inBar === 5) CHORDS[bar].forEach(function(n) { keys(n + 12, t, BEAT * 1.2, 0.025); });
    if (inBar === 4) keys(BASS[bar] + 7, t, BEAT, 0.1);
    var m = MELODY[s % MELODY.length];
    if (m && Math.floor(s / 32) % 2 === 1) keys(m, t, BEAT * 1.5, 0.05); // mélodie une boucle sur deux
    if (inBar === 0 || inBar === 3 && bar % 2 === 1) kick(t);
    if (inBar === 2 || inBar === 6) noise(t, 0.18, 0.12, 'bandpass', 1800); // caisse claire feutrée
    noise(t + (inBar % 2 ? STEP * 0.12 : 0), 0.05, 0.035, 'highpass', 7000); // charleston « swing »
  }
  function tick() {
    while (nextTime < ctx.currentTime + 0.15) {
      schedule(step, nextTime);
      nextTime += STEP;
      step++;
    }
  }

  function setUI(on) {
    playing = on;
    music.classList.toggle('is-playing', on);
    playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    playBtn.setAttribute('aria-label', on ? 'Pause' : 'Lecture');
  }

  function play() {
    if (!AC || playing) return;
    if (!ctx) setup();
    ctx.resume().then(function() {
      if (ctx.state !== 'running') return; // lecture bloquée sans clic : on reste en pause
      clearInterval(timer);
      nextTime = ctx.currentTime + 0.05;
      timer = setInterval(tick, 25);
      tick();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2); // fondu d'entrée
      setUI(true);
    });
  }
  function pause() {
    setUI(false);
    if (!ctx) return;
    clearInterval(timer);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); // fondu de sortie
    setTimeout(function() { if (!playing) ctx.suspend(); }, 450);
  }

  playBtn.addEventListener('click', function() { if (playing) pause(); else play(); });

  // Safari sur iPhone n'autorise le son que pendant le geste : on démarre dès le clic sur l'icône
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-open="win-music"], [data-open-group="about"]') && !win.classList.contains('is-visible')) play();
  }, true);

  // Ouverture du lecteur = lecture, fermeture = arrêt
  var wasOpen = false;
  new MutationObserver(function() {
    var open = win.classList.contains('is-visible');
    if (open && !wasOpen) play();
    if (!open && wasOpen) pause();
    wasOpen = open;
  }).observe(win, { attributes: true, attributeFilter: ['class'] });

  // Onglet en arrière-plan : on coupe pour ne pas jouer dans le vide
  document.addEventListener('visibilitychange', function() { if (document.hidden && playing) pause(); });
})();
