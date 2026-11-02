// LEO Clube de Palmas – interações da landing page

// Navbar: fundo ao rolar
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

// Animação de entrada ao rolar
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.12}s`;
  io.observe(el);
});

// Pétalas de girassol caindo no hero
const petals = document.querySelector('.petals');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (petals && !reduceMotion) {
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    const size = 0.5 + Math.random() * 0.7;
    p.style.left = `${Math.random() * 100}%`;
    p.style.width = `${14 * size}px`;
    p.style.height = `${26 * size}px`;
    p.style.animationDuration = `${10 + Math.random() * 12}s`;
    p.style.animationDelay = `${-Math.random() * 20}s`;
    p.style.setProperty('--drift', `${(Math.random() - 0.5) * 240}px`);
    p.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
    petals.appendChild(p);
  }
}

// Girassol desenhado em SVG (seção Sobre)
const petalGroup = document.querySelector('.sunflower__petals');
if (petalGroup) {
  const ns = 'http://www.w3.org/2000/svg';
  const layers = [
    { count: 18, rx: 13, ry: 42, dist: 52, color: '#d4a12e', offset: 10 },
    { count: 18, rx: 12, ry: 40, dist: 50, color: '#f7c31a', offset: 0 },
  ];
  layers.forEach(l => {
    for (let i = 0; i < l.count; i++) {
      const angle = (360 / l.count) * i + l.offset;
      const e = document.createElementNS(ns, 'ellipse');
      e.setAttribute('cx', 100);
      e.setAttribute('cy', 100 - l.dist);
      e.setAttribute('rx', l.rx);
      e.setAttribute('ry', l.ry);
      e.setAttribute('fill', l.color);
      e.setAttribute('transform', `rotate(${angle} 100 100)`);
      petalGroup.appendChild(e);
    }
  });
}

// Formulário de contato: abre o e-mail com a mensagem preenchida
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const subject = `[Site] ${d.interesse} – ${d.nome}`;
  const body =
    `Nome: ${d.nome}\nIdade: ${d.idade || '-'}\nContato: ${d.contato}\nInteresse: ${d.interesse}\n\n${d.mensagem || ''}`;
  window.location.href =
    `mailto:contato@leoclubedepalmas.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Obrigado! Abrimos o seu e-mail para enviar a mensagem. 🌻';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
