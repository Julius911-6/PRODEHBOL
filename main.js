/* ================================================
   PRODEHBOL — JavaScript de navegación e interacción
   ================================================ */

(function () {
  'use strict';

  /* ---- Navegación por pestañas ---- */
  const navButtons = document.querySelectorAll('#main-nav button[data-tab]');
  const sections   = document.querySelectorAll('.section');

  function activateTab(tabId) {
    sections.forEach(s => s.classList.remove('active'));
    navButtons.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    navButtons.forEach(b => {
      if (b.dataset.tab === tabId) b.classList.add('active');
    });

    // Cierra el menú móvil si está abierto
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('open');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  /* ---- Botones de acción del Hero que navegan a secciones ---- */
  document.addEventListener('click', e => {
    if (e.target.closest('[data-goto]')) {
      const tabId = e.target.closest('[data-goto]').dataset.goto;
      activateTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* ---- Menú hamburguesa (móvil) ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---- Scroll to top ---- */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Año dinámico en el footer ---- */
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---- Efecto header al hacer scroll ---- */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      siteHeader.style.boxShadow = '0 6px 28px rgba(0,0,0,0.18)';
    } else {
      siteHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)';
    }
  });

  /* ---- Activar la primera pestaña (Inicio) por defecto ---- */
  activateTab('inicio');

})();
