// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + entry.target.id) a.classList.add('active');
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PROJECT FILTER =====
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.categories.split(' ');
      if (filter === 'todos' || categories.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== ANIMATED COUNTER FOR STATS =====
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.target), 1200);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));
