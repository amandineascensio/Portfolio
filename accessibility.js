(function() {
  var panelHTML = '' +
    '<div class="a11y-reading-guide" id="a11yReadingGuide"></div>' +
    '<button class="a11y-toggle" id="a11yToggle" aria-label="Accessibilité">' +
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="12" cy="4.5" r="2.5" fill="white"/>' +
        '<path d="M12 10V14M12 14L8.5 21M12 14L15.5 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M4.5 9.5L12 11L19.5 9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
    '</button>' +
    '<div class="a11y-panel" id="a11yPanel">' +
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

  document.body.insertAdjacentHTML('beforeend', panelHTML);

  var toggle = document.getElementById('a11yToggle');
  var panel = document.getElementById('a11yPanel');
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
      },
      reset: function() {
        document.documentElement.style.fontSize = '';
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

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    panel.classList.toggle('active');
  });

  document.addEventListener('click', function(e) {
    if (!panel.contains(e.target) && e.target !== toggle) {
      panel.classList.remove('active');
    }
  });

  options.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var key = btn.getAttribute('data-a11y');
      state[key] = !state[key];
      applyToggle(key);
      btn.classList.toggle('active', state[key]);
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
