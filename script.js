const $ = id => document.getElementById(id);

// Mobile menu
const btn = $('menuBtn'), nav = $('nav');
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', nav.classList.toggle('open')));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });

// Seamless logo marquee: clone the set until one half is wider than the screen
const track = $('track'), orig = [...track.children];
do {
  orig.forEach(el => { const c = el.cloneNode(true); c.alt = ''; c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });
} while (track.scrollWidth / 2 < innerWidth + 300 && track.children.length < 60);
if (track.children.length % (orig.length * 2)) orig.forEach(el => { const c = el.cloneNode(true); c.alt = ''; track.appendChild(c); });

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Gallery lightbox
const lb = $('lightbox'), lbImg = lb.querySelector('img');
document.querySelectorAll('.g').forEach(g => g.addEventListener('click', () => { lbImg.src = g.dataset.src; lb.hidden = false; }));
lb.addEventListener('click', () => lb.hidden = true);
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

// Open / closed badge (office hours 8:00-19:00, Pahrump time)
const h = +new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Los_Angeles' }).format(new Date()) % 24;
const badge = $('openNow'); const isOpen = h >= 8 && h < 19;
badge.textContent = isOpen ? 'Open now' : 'Closed now'; badge.classList.toggle('closed', !isOpen);

// Forms (search goes to the live listings page; message form needs a real backend)
$('searchForm').addEventListener('submit', e => { e.preventDefault(); window.open('https://marcimetzger.com/listings', '_blank', 'noopener'); });
$('msgForm').addEventListener('submit', e => { e.preventDefault(); $('formNote').textContent = 'Thank you! We will be in touch soon.'; e.target.reset(); });

// Cookie notice
try { if (!localStorage.getItem('cookieOk')) $('cookie').hidden = false; } catch { $('cookie').hidden = false; }
$('cookieOk').addEventListener('click', () => { $('cookie').hidden = true; try { localStorage.setItem('cookieOk', '1'); } catch {} });
