// Parallax tilt for hero card
(function(){
  const card = document.querySelector('.hero-card');
  if(!card) return;
  let rect;
  function calc(e){
    rect = rect || card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -6;
    const ry = ((x / rect.width) - 0.5) * 8;
    card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
  }
  function reset(){ card.style.transform = 'rotateX(0deg) rotateY(0deg)'; rect = null; }
  card.addEventListener('mousemove', calc);
  card.addEventListener('mouseleave', reset);
})();

// Intersection Observer for Apple-like side-in reveals
// Pattern follows MDN guidance for performant scroll-triggered animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

// Skills filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

function applyFilter(group){
  skillCards.forEach(card=>{
    const match = group === 'all' || card.dataset.group === group;
    card.style.display = match ? '' : 'none';
  });
}

filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterButtons.forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    applyFilter(btn.dataset.filter);
  });
});

// Default filter
applyFilter('all');

// Reduced motion preference
const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
function applyReducedMotion(){
  if(mql.matches){
    document.documentElement.style.setProperty('scroll-behavior','auto');
    document.querySelectorAll('.stars2,.stars3,.ring').forEach(el=> el.style.animation = 'none');
  }
}
if (mql.addEventListener) { mql.addEventListener('change', applyReducedMotion); }
else if (mql.addListener) { mql.addListener(applyReducedMotion); }
applyReducedMotion();
