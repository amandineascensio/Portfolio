(function() {
  var panelHTML = '' +
    '<div class="a11y-reading-guide" id="a11yReadingGuide"></div>' +
    '<div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="Accessibilité">' +
      '<div class="a11y-panel__header">' +
        '<span class="a11y-panel__title">Accessibilité</span>' +
        '<button class="a11y-panel__reset" id="a11yReset">Réinitialiser</button>' +
      '</div>' +

      '<div class="a11y-group">' +
        '<span class="a11y-group__label">Texte</span>' +

        '<div class="a11y-slider">' +
          '<div class="a11y-slider__header">' +
            '<div class="a11y-slider__label">' +
              '<div class="a11y-slider__icon">Aa</div>' +
              '<span class="a11y-slider__text">Taille du texte</span>' +
            '</div>' +
            '<span class="a11y-slider__value" id="fontsizeValue">100%</span>' +
          '</div>' +
          '<div class="a11y-slider__track">' +
            '<span class="a11y-slider__min">A</span>' +
            '<input type="range" id="fontsizeSlider" min="50" max="250" value="100" step="5">' +
            '<span class="a11y-slider__max">A</span>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-slider">' +
          '<div class="a11y-slider__header">' +
            '<div class="a11y-slider__label">' +
              '<div class="a11y-slider__icon">↕</div>' +
              '<span class="a11y-slider__text">Interlignage</span>' +
            '</div>' +
            '<span class="a11y-slider__value" id="lineheightValue">Normal</span>' +
          '</div>' +
          '<div class="a11y-slider__track">' +
            '<span class="a11y-slider__min">≡</span>' +
            '<input type="range" id="lineheightSlider" min="0" max="50" value="0" step="2">' +
            '<span class="a11y-slider__max">☰</span>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-slider">' +
          '<div class="a11y-slider__header">' +
            '<div class="a11y-slider__label">' +
              '<div class="a11y-slider__icon">A⋅B</div>' +
              '<span class="a11y-slider__text">Espacement lettres</span>' +
            '</div>' +
            '<span class="a11y-slider__value" id="letterspacingValue">Normal</span>' +
          '</div>' +
          '<div class="a11y-slider__track">' +
            '<span class="a11y-slider__min">AB</span>' +
            '<input type="range" id="letterspacingSlider" min="0" max="20" value="0" step="1">' +
            '<span class="a11y-slider__max">A  B</span>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-slider">' +
          '<div class="a11y-slider__header">' +
            '<div class="a11y-slider__label">' +
              '<div class="a11y-slider__icon">W⋅W</div>' +
              '<span class="a11y-slider__text">Espacement mots</span>' +
            '</div>' +
            '<span class="a11y-slider__value" id="wordspacingValue">Normal</span>' +
          '</div>' +
          '<div class="a11y-slider__track">' +
            '<span class="a11y-slider__min">AB</span>' +
            '<input type="range" id="wordspacingSlider" min="0" max="30" value="0" step="1">' +
            '<span class="a11y-slider__max">A   B</span>' +
          '</div>' +
        '</div>' +

        '<button class="a11y-option" data-a11y="dyslexia">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">Dy</div>' +
            '<span class="a11y-option__label">Police dyslexie</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
      '</div>' +

      '<div class="a11y-separator"></div>' +

      '<div class="a11y-group">' +
        '<span class="a11y-group__label">Affichage</span>' +
        '<button class="a11y-option" data-a11y="contrast">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">◐</div>' +
            '<span class="a11y-option__label">Contraste élevé</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="darkmode">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">🌙</div>' +
            '<span class="a11y-option__label">Mode sombre</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="desaturate">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">◻</div>' +
            '<span class="a11y-option__label">Désaturer</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="hide-images">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">🖼</div>' +
            '<span class="a11y-option__label">Masquer les images</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
      '</div>' +

      '<div class="a11y-separator"></div>' +

      '<div class="a11y-group">' +
        '<span class="a11y-group__label">Navigation</span>' +
        '<button class="a11y-option" data-a11y="underline-links">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon"><u>A</u></div>' +
            '<span class="a11y-option__label">Souligner les liens</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="highlight-links">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">🔗</div>' +
            '<span class="a11y-option__label">Surligner les liens</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="focus-indicators">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">⊡</div>' +
            '<span class="a11y-option__label">Indicateurs de focus</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="no-animations">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">◼</div>' +
            '<span class="a11y-option__label">Stopper les animations</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
        '<button class="a11y-option" data-a11y="big-cursor">' +
          '<div class="a11y-option__left">' +
            '<div class="a11y-option__icon">➚</div>' +
            '<span class="a11y-option__label">Grand curseur</span>' +
          '</div>' +
          '<div class="a11y-option__toggle"></div>' +
        '</button>' +
      '</div>' +
    '</div>';

  // Le panneau s'ouvre depuis le bouton de la barre de menu
  var toggle = document.getElementById('a11yMenubarBtn');
  if (!toggle) return;

  document.body.insertAdjacentHTML('beforeend', panelHTML);

  var panel = document.getElementById('a11yPanel');
  panel.classList.add('a11y-panel--menubar');

  // Icônes au trait façon macOS
  {
    var ic = function(d) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
    };
    var icons = {
      fontsize: ic('<path d="M3 18l4.5-12L12 18M4.6 14h5.8"/><path d="M14 18l3-8 3 8M15 15.5h4"/>'),
      lineheight: ic('<path d="M10 6h10M10 12h10M10 18h10"/><path d="M5 4v16M3 6l2-2 2 2M3 18l2 2 2-2"/>'),
      letterspacing: ic('<path d="M4 15l2.5-7L9 15M4.8 12.8h3.4"/><path d="M15 8v7M15 8h2.4a1.7 1.7 0 010 3.4H15h2.8a1.8 1.8 0 010 3.6H15"/><path d="M3 19h18M3 19l2-1.5M3 19l2 1.5M21 19l-2-1.5M21 19l-2 1.5"/>'),
      wordspacing: ic('<path d="M3 7h5M3 11h5M16 7h5M16 11h5"/><path d="M9.5 17h5M9.5 17l1.6-1.4M9.5 17l1.6 1.4M14.5 17l-1.6-1.4M14.5 17l-1.6 1.4"/>'),
      dyslexia: ic('<path d="M5 18V6h3.5a6 6 0 010 12H5z"/><path d="M15 10l2.5 5 2.5-5M17.5 15l-1.8 4"/>'),
      contrast: ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 000-17z" fill="currentColor"/>'),
      darkmode: ic('<path d="M19.5 14.5A8 8 0 019.5 4.5a8 8 0 1010 10z"/>'),
      desaturate: ic('<circle cx="9" cy="9.5" r="5"/><circle cx="15" cy="9.5" r="5"/><circle cx="12" cy="14.5" r="5"/>'),
      'hide-images': ic('<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M3.5 16l5-5 4 4 2.5-2.5 5 5"/><path d="M3 3l18 18"/>'),
      'underline-links': ic('<path d="M7 5v6a5 5 0 0010 0V5M5 20h14"/>'),
      'highlight-links': ic('<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>'),
      'focus-indicators': ic('<path d="M4 9V5.5A1.5 1.5 0 015.5 4H9M15 4h3.5A1.5 1.5 0 0120 5.5V9M20 15v3.5a1.5 1.5 0 01-1.5 1.5H15M9 20H5.5A1.5 1.5 0 014 18.5V15"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.2"/>'),
      'no-animations': ic('<circle cx="12" cy="12" r="8.5"/><path d="M10 9v6M14 9v6"/>'),
      'big-cursor': ic('<path d="M6 3.5l12 9.2-5.4.9 3.1 6.2-2.6 1.3-3.1-6.3L6 18.6z"/>')
    };
    panel.querySelectorAll('.a11y-option[data-a11y]').forEach(function(btn) {
      var i = btn.querySelector('.a11y-option__icon');
      if (icons[btn.dataset.a11y]) i.innerHTML = icons[btn.dataset.a11y];
    });
    ['fontsize', 'lineheight', 'letterspacing', 'wordspacing'].forEach(function(k) {
      var i = panel.querySelector('#' + k + 'Slider').closest('.a11y-slider').querySelector('.a11y-slider__icon');
      i.innerHTML = icons[k];
    });
    panel.querySelector('.a11y-panel__title').textContent = 'Accessibilité';
  }
  var resetBtn = document.getElementById('a11yReset');
  var guide = document.getElementById('a11yReadingGuide');
  var options = panel.querySelectorAll('.a11y-option[data-a11y]');

  var sliders = {
    fontsize: {
      el: document.getElementById('fontsizeSlider'),
      valueEl: document.getElementById('fontsizeValue'),
      min: 50, max: 250, dflt: 100,
      format: function(v) { return v + '%'; },
      apply: function(v) {
        document.documentElement.style.fontSize = v + '%';
        // Bureau macOS (tailles en px) : agrandissement du contenu
        document.body.style.setProperty('--a11y-zoom', v / 100);
        document.body.classList.toggle('a11y-zoom', v !== 100);
      },
      reset: function() {
        document.documentElement.style.fontSize = '';
        document.body.style.removeProperty('--a11y-zoom');
        document.body.classList.remove('a11y-zoom');
      }
    },
    lineheight: {
      el: document.getElementById('lineheightSlider'),
      valueEl: document.getElementById('lineheightValue'),
      min: 0, max: 50, dflt: 0,
      format: function(v) { return v === 0 ? 'Normal' : (1.6 + v * 0.06).toFixed(1); },
      apply: function(v) {
        if (v > 0) {
          var lh = 1.6 + v * 0.06;
          document.documentElement.style.setProperty('--a11y-lh', lh);
          document.body.classList.add('a11y-lineheight-active');
        } else {
          document.body.classList.remove('a11y-lineheight-active');
          document.documentElement.style.removeProperty('--a11y-lh');
        }
      },
      reset: function() {
        document.body.classList.remove('a11y-lineheight-active');
        document.documentElement.style.removeProperty('--a11y-lh');
      }
    },
    letterspacing: {
      el: document.getElementById('letterspacingSlider'),
      valueEl: document.getElementById('letterspacingValue'),
      min: 0, max: 20, dflt: 0,
      format: function(v) { return v === 0 ? 'Normal' : v + 'px'; },
      apply: function(v) {
        if (v > 0) {
          document.documentElement.style.setProperty('--a11y-ls', v + 'px');
          document.body.classList.add('a11y-letterspacing-active');
        } else {
          document.body.classList.remove('a11y-letterspacing-active');
          document.documentElement.style.removeProperty('--a11y-ls');
        }
      },
      reset: function() {
        document.body.classList.remove('a11y-letterspacing-active');
        document.documentElement.style.removeProperty('--a11y-ls');
      }
    },
    wordspacing: {
      el: document.getElementById('wordspacingSlider'),
      valueEl: document.getElementById('wordspacingValue'),
      min: 0, max: 30, dflt: 0,
      format: function(v) { return v === 0 ? 'Normal' : v + 'px'; },
      apply: function(v) {
        if (v > 0) {
          document.documentElement.style.setProperty('--a11y-ws', v + 'px');
          document.body.classList.add('a11y-wordspacing-active');
        } else {
          document.body.classList.remove('a11y-wordspacing-active');
          document.documentElement.style.removeProperty('--a11y-ws');
        }
      },
      reset: function() {
        document.body.classList.remove('a11y-wordspacing-active');
        document.documentElement.style.removeProperty('--a11y-ws');
      }
    }
  };

  var STORAGE_KEY = 'portfolio-a11y';

  var defaults = {
    fontsize: 100,
    lineheight: 0,
    letterspacing: 0,
    wordspacing: 0,
    dyslexia: false,
    'align-left': false,
    contrast: false,
    darkmode: false,
    desaturate: false,
    'hide-images': false,
    'underline-links': false,
    'highlight-links': false,
    'focus-indicators': false,
    'no-animations': false,
    'big-cursor': false,
    'reading-guide': false
  };

  var state = loadState();
  migrateOldValues();
  applyAll();

  function setOpen(open) {
    panel.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    setOpen(!panel.classList.contains('active'));
  });

  document.addEventListener('click', function(e) {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  // Échap ferme le panneau sans fermer la fenêtre du bureau derrière
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      e.stopImmediatePropagation();
      setOpen(false);
      toggle.focus();
    }
  }, true);

  options.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.getAttribute('data-a11y');
      state[key] = !state[key];
      applyToggle(key);
      btn.classList.toggle('active', state[key]);
      btn.setAttribute('aria-pressed', state[key] ? 'true' : 'false');
      saveState();
    });
  });

  Object.keys(sliders).forEach(function(key) {
    var s = sliders[key];
    s.el.addEventListener('input', function() {
      state[key] = parseInt(s.el.value);
      applySlider(key);
      saveState();
    });
  });

  resetBtn.addEventListener('click', function() {
    Object.keys(sliders).forEach(function(key) {
      sliders[key].reset();
    });
    state = JSON.parse(JSON.stringify(defaults));
    applyAll();
    saveState();
  });

  document.addEventListener('mousemove', function(e) {
    if (state['reading-guide']) {
      guide.style.top = (e.clientY - 6) + 'px';
    }
  });

  function migrateOldValues() {
    if (state.fontsize < 50) state.fontsize = 100;
    if (state.lineheight > 0 && state.lineheight <= 2) {
      state.lineheight = state.lineheight === 1 ? 10 : 20;
    }
    if (state.letterspacing > 0 && state.letterspacing <= 2) {
      state.letterspacing = state.letterspacing === 1 ? 5 : 10;
    }
    if (state.wordspacing > 0 && state.wordspacing <= 2) {
      state.wordspacing = state.wordspacing === 1 ? 6 : 12;
    }
  }

  function applyAll() {
    Object.keys(sliders).forEach(function(key) {
      applySlider(key);
    });

    options.forEach(function(btn) {
      var key = btn.getAttribute('data-a11y');
      applyToggle(key);
      btn.classList.toggle('active', !!state[key]);
      btn.setAttribute('aria-pressed', state[key] ? 'true' : 'false');
    });
  }

  function applySlider(key) {
    var s = sliders[key];
    var val = state[key];
    s.el.value = val;
    s.valueEl.textContent = s.format(val);
    var progress = ((val - s.min) / (s.max - s.min)) * 100;
    s.el.style.setProperty('--slider-progress', progress + '%');
    s.apply(val);
  }

  function applyToggle(key) {
    var className = 'a11y-' + key;
    if (state[key]) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    if (key === 'reading-guide') {
      guide.classList.toggle('active', !!state[key]);
    }

    if (key === 'dyslexia' && state[key]) {
      loadDyslexiaFont();
    }
  }

  function loadDyslexiaFont() {
    if (document.getElementById('a11y-dyslexia-font')) return;
    var link = document.createElement('link');
    link.id = 'a11y-dyslexia-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
    document.head.appendChild(link);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function loadState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        var merged = JSON.parse(JSON.stringify(defaults));
        for (var key in merged) {
          if (parsed.hasOwnProperty(key)) {
            merged[key] = parsed[key];
          }
        }
        return merged;
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(defaults));
  }
})();
