const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const track = document.querySelector('#logo-track');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

if (track) {
  const originalLogos = [...track.children];
  originalLogos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  requestAnimationFrame(() => track.classList.add('is-moving'));
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
document.querySelector('#year').textContent = new Date().getFullYear();
