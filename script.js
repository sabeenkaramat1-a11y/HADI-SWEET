// ===== Splash / welcome screen =====
const splash = document.getElementById('splash');
const body = document.body;
function dismissSplash(){
  if (!splash) return;
  splash.classList.add('hide');
  body.classList.remove('preload');
  setTimeout(() => splash.remove(), 800);
}
// show splash for a beat, then reveal the site
window.addEventListener('load', () => {
  setTimeout(dismissSplash, 2200);
});
// allow tapping the splash to skip it
if (splash) splash.addEventListener('click', dismissSplash);
// safety fallback in case 'load' is delayed by big video files
setTimeout(dismissSplash, 4500);

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== Nav shadow on scroll =====
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 12 ? '0 8px 24px -12px rgba(36,17,8,.25)' : 'none';
});

// ===== Scroll reveal (fade-up + slide-in-left/right) =====
const revealEls = document.querySelectorAll('.reveal, .slide-left, .slide-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// ===== Video play overlays =====
document.querySelectorAll('[data-play-target]').forEach(btn => {
  const video = document.getElementById(btn.dataset.playTarget);
  if (!video) return;

  const hideOverlay = () => btn.classList.add('hidden');
  const showOverlay = () => btn.classList.remove('hidden');

  btn.addEventListener('click', () => {
    video.muted = false;
    video.play();
  });

  video.addEventListener('play', hideOverlay);
  video.addEventListener('pause', showOverlay);
  video.addEventListener('ended', showOverlay);
});

// ===== Pause other videos when one plays (nice UX, avoids audio overlap) =====
const allVideos = Array.from(document.querySelectorAll('.phone-video'));
allVideos.forEach(v => {
  v.addEventListener('play', () => {
    allVideos.forEach(other => {
      if (other !== v && !other.paused) other.pause();
    });
  });
});

// ===== Smooth-scroll for in-page nav links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }
  });
});



