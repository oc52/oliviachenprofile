const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const progress = document.getElementById('scrollProgress');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
});
