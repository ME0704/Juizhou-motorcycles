/* ============================================================
   JIUZHOU MOTORCYCLES — shared site behaviour
   ============================================================ */

// header shrink on scroll
const header = document.querySelector('header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// mobile nav
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuToggle.textContent = mainNav.classList.contains('open') ? '\u2715' : '\u2630';
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.textContent = '\u2630';
  }));
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// animated stat counters
const statNums = document.querySelectorAll('.stat .num[data-count]');
if (statNums.length) {
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNums.forEach(el => statIo.observe(el));
}

// scroll progress bar
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// hero cursor-follow spotlight (desktop only, subtle)
const heroEl = document.querySelector('.hero');
if (heroEl && window.matchMedia('(hover: hover)').matches) {
  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    heroEl.style.setProperty('--mx', mx + '%');
    heroEl.style.setProperty('--my', my + '%');
  });
}

// magnetic buttons (subtle pull toward cursor)
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.btn-red, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// tilt on hover for bike / catalog cards
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.bike-card, .catalog-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${py * -5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// testimonial slider
const testiSlides = document.querySelectorAll('.testi-slide');
const testiDotsWrap = document.querySelector('.testi-dots');
if (testiSlides.length && testiDotsWrap) {
  let active = 0;
  testiSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    dot.addEventListener('click', () => showTesti(i));
    testiDotsWrap.appendChild(dot);
  });
  const dots = testiDotsWrap.querySelectorAll('button');
  function showTesti(i) {
    testiSlides[active].classList.remove('active');
    dots[active].classList.remove('active');
    active = i;
    testiSlides[active].classList.add('active');
    dots[active].classList.add('active');
  }
  setInterval(() => showTesti((active + 1) % testiSlides.length), 5000);
}
