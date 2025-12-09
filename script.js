// script.js
// Injects a reusable site header + handles mobile menu behavior.
// Safe to include on every page; will not duplicate if header exists.

(function () {
  // Header HTML (edit links/text here if needed)
  const headerHTML = `
    <div class="site-header-inner" id="injected-site-header">
      <div class="brand">
        <a href="index.html" class="brand-link">Project Site</a>
      </div>

      <button class="menu-toggle" aria-expanded="false" aria-controls="main-navigation" aria-label="Toggle navigation">
        <span class="menu-icon">☰</span>
        <span class="visually-hidden">Menu</span>
      </button>

      <nav id="main-navigation" class="main-nav" role="navigation" aria-label="Main">
        <ul class="menu">
          <li><a href="index.html">Home</a></li>
          <li><a href="topic-devon.html">Devon’s Topic</a></li>
          <li><a href="topic-jermaine.html">Jermaine’s Topic</a></li>
          <li><a href="topic-salman.html">Salman’s Topic</a></li>
          <li><a href="jermaine-concepts.html">Jermaine’s Key Concepts</a></li>
          <li><a href="Salmans-concepts.html">Salman’s Key Concepts</a></li>
          <li><a href="references.html">References</a></li>
          <li><a href="concepts.html">Key Concepts</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </nav>
    </div>
  `;

  // Utility: create visually-hidden CSS for accessibility if not present
  function ensureVisuallyHiddenStyle() {
    if (document.getElementById('vh-style')) return;
    const css = `.visually-hidden{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);white-space:nowrap;border:0;padding:0;margin:-1px}`;
    const style = document.createElement('style');
    style.id = 'vh-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  // Insert header if not already present (guard against duplicates)
  function injectHeader() {
    // If there's an element with id 'injected-site-header' we assume header already exists
    if (document.getElementById('injected-site-header')) return;

    // If page already has a header element with meaningful nav, do not inject
    const existingHeader = document.querySelector('header');
    if (existingHeader && existingHeader.querySelector('.menu')) {
      // But if it's empty header, we can append to it
      if (!existingHeader.querySelector('#injected-site-header')) {
        existingHeader.insertAdjacentHTML('beforeend', headerHTML);
      }
      return;
    }

    // If there is no <header>, create one and insert at top of body
    const headerEl = existingHeader || document.createElement('header');
    if (!existingHeader) {
      document.body.insertBefore(headerEl, document.body.firstChild);
    }
    headerEl.insertAdjacentHTML('beforeend', headerHTML);
  }

  // Menu behavior: toggle, close on link click, reset on resize
  function wireMenuBehavior() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-navigation');
    const menu = nav ? nav.querySelector('.menu') : null;

    if (!toggle || !menu || !nav) return;

    // Toggle function
    function toggleMenu() {
      const isOpen = menu.classList.toggle('show');
      toggle.setAttribute('aria-expanded', String(isOpen));
      // For small screens, ensure nav is focusable when open
      if (isOpen) {
        nav.style.display = 'block';
      } else {
        nav.style.display = '';
      }
    }

    // Open/close on toggle click
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking a link inside the menu
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        nav.style.display = '';
      });
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        if (menu.classList.contains('show')) {
          menu.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
          nav.style.display = '';
        }
      }
    });

    // Reset on resize/orientation change: if desktop width, remove mobile classes
    function handleResize() {
      if (window.innerWidth >= 768) {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        nav.style.display = '';
      }
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
  }

  // Mark current page nav link with .active for visual cue
  function markActiveLink() {
    const pathname = window.location.pathname.split('/').pop() || 'index.html';
    const anchors = document.querySelectorAll('.main-nav .menu a');
    anchors.forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      // Compare only file names
      const linkFile = href.split('/').pop();
      if (linkFile === pathname || (linkFile === 'index.html' && pathname === '')) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // Run all setup when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    ensureVisuallyHiddenStyle();
    injectHeader();
    wireMenuBehavior();
    markActiveLink();
  });
})();
