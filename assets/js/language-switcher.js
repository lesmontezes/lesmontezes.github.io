(function () {
  var GOOGLE_SCRIPT_SRC = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  var PREFERENCE_DAYS = 365;

  function parseConfig() {
    var element = document.getElementById('language-switcher-config');
    if (!element) return null;
    try {
      var config = JSON.parse(element.textContent || '{}');
      if (!config || !Array.isArray(config.supportedLanguages)) return null;
      return config;
    } catch (error) {
      return null;
    }
  }

  function supportedCodes(config) {
    return config.supportedLanguages.map(function (language) { return language.code; });
  }

  function isSupported(config, code) {
    return supportedCodes(config).indexOf(code) !== -1;
  }

  function getCookie(name) {
    var cookies = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < cookies.length; i += 1) {
      var parts = cookies[i].split('=');
      var key = decodeURIComponent(parts.shift().trim());
      if (key === name) return decodeURIComponent(parts.join('='));
    }
    return null;
  }

  function setCookie(name, value, days) {
    var cookie = name + '=' + encodeURIComponent(value) + '; path=/; SameSite=Lax';
    if (typeof days === 'number' && days > 0) {
      cookie += '; max-age=' + Math.round(days * 86400);
    }
    document.cookie = cookie;
  }

  function readPreference(config) {
    var fromCookie = getCookie(config.preferenceKey);
    if (fromCookie && isSupported(config, fromCookie)) return fromCookie;
    try {
      var fromStorage = window.localStorage.getItem(config.preferenceKey);
      if (fromStorage && isSupported(config, fromStorage)) return fromStorage;
    } catch (error) {}
    return null;
  }

  function writePreference(config, code) {
    setCookie(config.preferenceKey, code, PREFERENCE_DAYS);
    try {
      window.localStorage.setItem(config.preferenceKey, code);
    } catch (error) {}
  }

  function googleTarget(config) {
    var raw = getCookie(config.googleCookieName);
    if (!raw) return null;
    var parts = String(raw).split('/').filter(Boolean);
    var target = parts.length ? parts[parts.length - 1] : null;
    return target && isSupported(config, target) ? target : null;
  }

  function resolveInitialLanguage(config) {
    var stored = readPreference(config);
    if (stored) return stored;
    var target = googleTarget(config);
    if (target) {
      writePreference(config, target);
      return target;
    }
    var pageLanguage = document.documentElement.getAttribute('lang');
    if (pageLanguage && isSupported(config, pageLanguage)) return pageLanguage;
    return config.sourceLanguage;
  }

  function setGoogleCookie(config, code) {
    setCookie(config.googleCookieName, '/' + config.sourceLanguage + '/' + code);
  }

  function findEntry(config, code) {
    for (var i = 0; i < config.supportedLanguages.length; i += 1) {
      if (config.supportedLanguages[i].code === code) return config.supportedLanguages[i];
    }
    return null;
  }

  function setFlagFromOption(root, code) {
    var option = root.querySelector('[data-language-option="' + code + '"]');
    var source = option ? option.querySelector('.language-flag') : null;
    var target = root.querySelector('[data-language-flag]');
    if (source && target) target.innerHTML = source.innerHTML;
  }

  function updateActive(root, config, code) {
    var entry = findEntry(config, code) || findEntry(config, config.sourceLanguage);
    if (!entry) return;
    setFlagFromOption(root, entry.code);
    var label = root.querySelector('[data-language-label]');
    var button = root.querySelector('[data-language-button]');
    if (label) label.textContent = entry.label;
    if (button) button.setAttribute('aria-label', 'Langue : ' + entry.label);
    var options = root.querySelectorAll('[data-language-option]');
    options.forEach(function (option) {
      option.setAttribute('aria-checked', option.getAttribute('data-language-option') === entry.code ? 'true' : 'false');
    });
    root.setAttribute('data-active-language', entry.code);
  }

  function focusableOptions(root) {
    return Array.prototype.slice.call(root.querySelectorAll('[data-language-option]'));
  }

  function setMenuOpen(root, open, focusFirst) {
    var button = root.querySelector('[data-language-button]');
    var menu = root.querySelector('[data-language-menu]');
    if (!button || !menu) return;
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
    root.classList.toggle('language-switcher-open', open);
    if (open && focusFirst) {
      var current = menu.querySelector('[data-language-option][aria-checked="true"]');
      (current || menu.querySelector('[data-language-option]')).focus();
    }
  }

  function isMenuOpen(root) {
    var menu = root.querySelector('[data-language-menu]');
    return Boolean(menu && !menu.hidden);
  }

  function ensureGoogleScript(config) {
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      return Promise.resolve();
    }
    if (window.__lesmontezesTranslateLoading) return window.__lesmontezesTranslateLoading;
    window.__lesmontezesTranslateLoading = new Promise(function (resolve, reject) {
      window.googleTranslateElementInit = function () {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: config.sourceLanguage,
              includedLanguages: supportedCodes(config).join(','),
              autoDisplay: false
            },
            'google_translate_element'
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      var script = document.createElement('script');
      script.src = GOOGLE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    window.__lesmontezesTranslateLoading.catch(function (error) {
      window.__lesmontezesTranslateLoading = null;
      console.error('Translation service failed to load:', error);
    });
    return window.__lesmontezesTranslateLoading;
  }

  function selectLanguage(root, config, code) {
    var active = root.getAttribute('data-active-language');
    setMenuOpen(root, false, false);
    if (code === active) return;
    writePreference(config, code);
    setGoogleCookie(config, code);
    updateActive(root, config, code);
    window.setTimeout(function () {
      window.location.reload();
    }, 80);
  }

  function wireKeyboard(root, config) {
    root.addEventListener('keydown', function (event) {
      var options = focusableOptions(root);
      if (!options.length) return;
      var index = options.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        setMenuOpen(root, false, false);
        var button = root.querySelector('[data-language-button]');
        if (button) button.focus();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!isMenuOpen(root)) {
          setMenuOpen(root, true, true);
          return;
        }
        var direction = event.key === 'ArrowDown' ? 1 : -1;
        var next = options[(index + direction + options.length) % options.length];
        next.focus();
      } else if (event.key === 'Home' && isMenuOpen(root)) {
        event.preventDefault();
        options[0].focus();
      } else if (event.key === 'End' && isMenuOpen(root)) {
        event.preventDefault();
        options[options.length - 1].focus();
      } else if (event.key === 'Tab' && isMenuOpen(root)) {
        setMenuOpen(root, false, false);
      }
    });
  }

  function initializeRoot(root, config) {
    var button = root.querySelector('[data-language-button]');
    var menu = root.querySelector('[data-language-menu]');
    if (!button || !menu) return config.sourceLanguage;
    var active = resolveInitialLanguage(config);
    updateActive(root, config, active);
    writePreference(config, active);
    setGoogleCookie(config, active);
    if (active !== config.sourceLanguage) {
      ensureGoogleScript(config);
    }
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      setMenuOpen(root, !isMenuOpen(root), true);
    });
    menu.addEventListener('click', function (event) {
      event.stopPropagation();
      var option = event.target.closest('[data-language-option]');
      if (option) selectLanguage(root, config, option.getAttribute('data-language-option'));
    });
    wireKeyboard(root, config);
    return active;
  }

  function initialize() {
    var config = parseConfig();
    if (!config || !config.sourceLanguage) return;
    var roots = Array.prototype.slice.call(document.querySelectorAll('[data-language-switcher]'));
    if (!roots.length) return;
    roots.forEach(function (root) {
      initializeRoot(root, config);
    });
    document.addEventListener('click', function (event) {
      roots.forEach(function (root) {
        if (!root.contains(event.target)) setMenuOpen(root, false, false);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
