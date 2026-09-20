/**
 * DR. BRUNO NORONHA — CIRURGIÃO BUCOMAXILOFACIAL
 * Lipo de Papada — Interactive Script (Premium Dark Gold Theme & Modal Capture)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Announce Bar Close
  const announceBar = document.getElementById('announce-bar');
  const announceClose = document.getElementById('announce-close');
  const header = document.getElementById('header');

  if (announceClose && announceBar) {
    announceClose.addEventListener('click', () => {
      announceBar.style.display = 'none';
      if (header) {
        header.style.top = '0px';
      }
    });
  }

  // 2. Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // 3. Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Trust Bar Counter Animation
  const counters = document.querySelectorAll('.trust-number');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const step = Math.max(1, Math.floor(target / (duration / 20)));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 20);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const trustBar = document.querySelector('.trust-bar');
  if (trustBar) {
    observer.observe(trustBar);
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const btn = item.querySelector('.faq-question');
    if (index === 0) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5b. Mobile Cases Carousel
  const carouselTrack = document.querySelector('.case-carousel');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let carouselAutoplay = null;

  const updateCarousel = () => {
    if (!carouselTrack || carouselSlides.length === 0) return;
    // Only animate on mobile
    if (window.innerWidth <= 768) {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    } else {
      carouselTrack.style.transform = '';
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  const goToSlide = (index) => {
    currentSlide = (index + carouselSlides.length) % carouselSlides.length;
    updateCarousel();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide, 10));
      resetAutoplay();
    });
  });

  // Touch / Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
        resetAutoplay();
      }
    }, { passive: true });
  }

  // Autoplay every 5s on mobile
  const startAutoplay = () => {
    if (window.innerWidth <= 768 && carouselSlides.length > 1) {
      carouselAutoplay = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }
  };

  const resetAutoplay = () => {
    clearInterval(carouselAutoplay);
    startAutoplay();
  };

  startAutoplay();

  // Recalculate on resize
  window.addEventListener('resize', () => {
    updateCarousel();
    resetAutoplay();
  });

  // 6. Smooth Scroll for Anchor Links (excluding buttons)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 7. Mobile Sticky CTA Bar on Scroll
  const mobileBar = document.getElementById('mobile-sticky-bar');
  const heroSection = document.getElementById('inicio');

  if (mobileBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (window.innerWidth <= 768) {
        if (heroBottom < 100) {
          mobileBar.style.display = 'block';
        } else {
          mobileBar.style.display = 'none';
        }
      }
    }, { passive: true });
  }

  // ==========================================
  // 8. POP-UP MODAL FORM & LEAD REDIRECTION
  // ==========================================
  const modal = document.getElementById('lead-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTriggers = document.querySelectorAll('.open-lead-modal');
  const leadForm = document.getElementById('lead-form');
  const phoneInput = document.getElementById('lead-phone');

  // Open Modal
  const openModal = () => {
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('#lead-name');
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }
  };

  // Close Modal
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Phone Mask (+55 (XX) XXXXX-XXXX)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let raw = e.target.value;
      
      // Remove the prefix from the raw string before getting digits
      if (raw.startsWith('+55 ')) {
         raw = raw.substring(4);
      } else if (raw.startsWith('+55')) {
         raw = raw.substring(3);
      }
      
      let value = raw.replace(/\D/g, '');
      
      if (value.length === 0) {
        e.target.value = '';
        return;
      }
      
      if (value.length > 11) value = value.slice(0, 11);

      let formatted = '+55 ';
      if (value.length <= 2) {
        formatted += `(${value}`;
      } else if (value.length <= 6) {
        formatted += `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 10) {
        formatted += `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else {
        formatted += `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      }
      
      e.target.value = formatted;
    });
  }

  // Form Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('btn-submit-form');
      const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

      if (submitBtn) {
        submitBtn.disabled = true;
        if (btnText) btnText.textContent = 'ENVIANDO...';
      }

      const formData = new FormData(leadForm);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const age = formData.get('age') || '';
      const procedure = formData.get('procedure') || '';
      const location = formData.get('consultation_location') || '';

      // Save lead details to localStorage if needed
      const leadData = {
        name,
        phone,
        age,
        procedure,
        location,
        createdAt: new Date().toISOString(),
        page: window.location.href
      };
      try {
        localStorage.setItem('drbruno_lead', JSON.stringify(leadData));
      } catch (err) {
        console.warn('Storage unavailable', err);
      }

      // Send to Make.com webhook
      const webhookUrl = 'https://hook.eu1.make.com/yu6u7m8cevg8h1v3khestu9a98dcaz2v';

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      })
      .then(() => {
        // Build redirection URL to obrigado.html with parameters
        const params = new URLSearchParams({
          name: name,
          procedure: procedure,
          location: location
        });
        window.location.href = `obrigado.html?${params.toString()}`;
      })
      .catch((err) => {
        console.warn('Webhook error:', err);
        // Redirect anyway even if webhook fails
        const params = new URLSearchParams({
          name: name,
          procedure: procedure,
          location: location
        });
        window.location.href = `obrigado.html?${params.toString()}`;
      });
    });
  }

});
