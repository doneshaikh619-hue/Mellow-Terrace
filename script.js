(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const year = document.getElementById('year');

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Dynamic footer year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Header scroll state
  const setHeader = () => {
    if (!header) return;

    header.classList.toggle(
      'scrolled',
      window.scrollY > 12
    );
  };

  setHeader();

  window.addEventListener(
    'scroll',
    setHeader,
    { passive: true }
  );

  // Mobile navigation
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded =
        menuToggle.getAttribute('aria-expanded') === 'true';

      menuToggle.setAttribute(
        'aria-expanded',
        String(!expanded)
      );

      mobileMenu.classList.toggle(
        'open',
        !expanded
      );
    });

    // Close mobile menu after clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        mobileMenu.classList.remove('open');
      });
    });
  }

  // Scroll reveal animations
  const revealItems =
    document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealItems.forEach(element => {
      element.classList.add('in-view');
    });

  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach(element => {
      observer.observe(element);
    });

  } else {
    revealItems.forEach(element => {
      element.classList.add('in-view');
    });
  }

  // Smooth scrolling for internal links
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener('click', event => {
        const id =
          link.getAttribute('href');

        if (!id || id === '#') return;

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion
            ? 'auto'
            : 'smooth',
          block: 'start'
        });
      });
    });
})();