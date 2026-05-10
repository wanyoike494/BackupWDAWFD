// ── Mobile menu toggle
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
  }

  // ── Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 0.07) + 's';
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Bar fills on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.bar-fill, .hbar-fill').forEach(bar => {
        if (bar.dataset.w) {
          bar.style.width = bar.dataset.w + '%';
        }
      });
    }, 500);
  });

  // ── Counter animation
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(document.getElementById('cnt-markets'), 180, '+');
        animateCounter(document.getElementById('cnt-crypto'), 450, '+');
        animateCounter(document.getElementById('cnt-calc'), 30, '+');
        animateCounter(document.getElementById('cnt-countries'), 195, '');
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  // ── Category bar active
  document.querySelectorAll('.cat-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ── Simulate live ticker value drift (tiny random tweaks)
  function nudgeTickerValues() {
    document.querySelectorAll('.tick-val').forEach((el, i) => {
      // Very subtle flicker effect
      if (Math.random() < 0.12) {
        el.style.opacity = '.6';
        setTimeout(() => el.style.opacity = '1', 200);
      }
    });
  }
  setInterval(nudgeTickerValues, 3000);

  // ── Search focus scale
  const searchInput = document.querySelector('.search-wrap input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => { searchInput.parentElement.style.transform = 'scale(1.01)'; });
    searchInput.addEventListener('blur',  () => { searchInput.parentElement.style.transform = 'scale(1)'; });
  }

  // ── Animate heatmap cells on reveal
  const heatObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.heat-cell').forEach((cell, i) => {
          cell.style.opacity = '0';
          cell.style.transform = 'scale(0.8)';
          cell.style.transition = `all .3s ease ${i * 0.03}s`;
          setTimeout(() => { cell.style.opacity = '1'; cell.style.transform = 'scale(1)'; }, 50);
        });
        heatObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.heatmap-bg').forEach(el => heatObserver.observe(el));