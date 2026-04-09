// ============================================
// Betty Adera Foundation - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ============ HERO SLIDER ============
  const slides      = document.querySelectorAll('.slide');
  const dots        = document.querySelectorAll('.dot');
  const prevBtn     = document.querySelector('.arrow-prev');
  const nextBtn     = document.querySelector('.arrow-next');
  let currentSlide  = 0;
  let sliderInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function startSlider() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 2000);
  }

  function resetSlider() {
    clearInterval(sliderInterval);
    startSlider();
  }

  if (slides.length > 0) {
    startSlider();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetSlider(); });
    });

    prevBtn?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSlider(); });
    nextBtn?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSlider(); });

    // Touch/swipe support for hero slider
    let touchStartX = 0;
    const hero = document.querySelector('.hero');
    hero?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    hero?.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
        resetSlider();
      }
    }, { passive: true });
  }

  // ============ MOBILE NAV ============
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu(open) {
    hamburger?.classList.toggle('open', open);
    navMenu?.classList.toggle('open', open);
    navOverlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';

    // Animate hamburger lines
    const lines = hamburger?.querySelectorAll('span');
    if (lines && lines.length === 3) {
      if (open) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity   = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        lines[0].style.transform = '';
        lines[1].style.opacity   = '';
        lines[2].style.transform = '';
      }
    }
  }

  hamburger?.addEventListener('click', () => {
    toggleMenu(!navMenu.classList.contains('open'));
  });

  navOverlay?.addEventListener('click', () => toggleMenu(false));

  // Mobile: toggle dropdowns on parent link click
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const link = item.querySelector('.nav-link');
    link?.addEventListener('click', e => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        // Close other open dropdowns
        document.querySelectorAll('.has-dropdown.open').forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      }
    });
  });

  // Close menu when a leaf link is clicked
  document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu when a non-dropdown nav-link is clicked (mobile)
  document.querySelectorAll('.nav-item:not(.has-dropdown) .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) toggleMenu(false);
    });
  });

  // ============ STICKY HEADER SHADOW ============
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.12)'
        : '0 2px 12px rgba(0,0,0,0.08)';
    }
  }, { passive: true });

  // ============ SCROLL TO TOP ============
  const scrollBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============ ACTIVE NAV LINK ============
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ============ WHATSAPP FLOATING BUTTON ============
  const waBtn = document.createElement('a');
  waBtn.className = 'whatsapp-fab';
  waBtn.href = 'https://wa.me/254XXXXXXXXX?text=Hello%20BAF%2C%20I%27d%20like%20to%20know%20more%20about...';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waBtn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="wa-tooltip">Chat with us on WhatsApp</span>
  `;
  document.body.appendChild(waBtn);

  // ============ IMPACT COUNTER ============
  const counters = document.querySelectorAll('.impact-number');
  if (counters.length) {
    let counted = false;
    const runCounters = () => {
      counters.forEach(el => {
        const target = +el.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current).toLocaleString();
        }, 16);
      });
    };
    const section = document.getElementById('impact-counter');
    if (section) {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          runCounters();
        }
      }, { threshold: 0.3 });
      obs.observe(section);
    }
  }

  // ============ TESTIMONIALS SLIDER ============
  const tSlides = document.querySelectorAll('.testimonial-slide');
  const tDots   = document.querySelectorAll('.t-dot');
  let tCurrent  = 0;

  if (tSlides.length) {
    const goToT = (idx) => {
      tSlides[tCurrent].classList.remove('active');
      tDots[tCurrent]?.classList.remove('active');
      tCurrent = (idx + tSlides.length) % tSlides.length;
      tSlides[tCurrent].classList.add('active');
      tDots[tCurrent]?.classList.add('active');
    };
    tDots.forEach((dot, i) => dot.addEventListener('click', () => goToT(i)));
    setInterval(() => goToT(tCurrent + 1), 6000);
  }

});
