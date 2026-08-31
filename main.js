/**
 * VSP Techies — Main JavaScript (Enhanced)
 * Pure vanilla JS · No frameworks
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Course Data with Pricing and Details --- */
  const courseData = {
    robotics: {
      icon: '🤖',
      title: 'Robotics',
      desc: 'Build, code & race real robots. Learn sensors, motors & teamwork.',
      details: [
        { label: 'Age Group', value: '8+ years' },
        { label: 'Duration', value: '3 months · 2 sessions/week' },
        { label: 'Fee', value: '₹ 7,500 / level(6 levels)' },
        { label: 'Includes', value: 'Robotic kits, materials, competition prep, certificate' }
      ]
    },
    ai: {
      icon: '🧠',
      title: 'Artificial Intelligence',
      desc: 'Discover how machines learn, see & decide — no boring lectures!',
      details: [
        { label: 'Age Group', value: '12+ years' },
        { label: 'Duration', value: '2 months · 2 sessions/week' },
        { label: 'Fee', value: '₹ 6,000 / level(5 levels)' },
        { label: 'Includes', value: 'Python basics, ML projects, certificate' }
      ]
    },
    coreldraw: {
      icon: '🎨',
      title: 'CorelDRAW',
      desc: 'Design logos, posters & graphics like a pro designer.',
      details: [
        { label: 'Age Group', value: '8+ years' },
        { label: 'Duration', value: '2-3 months · 2 sessions/week' },
        { label: 'Fee', value: '₹ 5,000 on whole' },
        { label: 'Includes', value: 'Design projects, portfolio building, certificate' }
      ]
    },
    photoshop: {
      icon: '📸',
      title: 'Photoshop',
      desc: 'Edit photos, create digital art & bring imagination to life.',
      details: [
        { label: 'Age Group', value: '8+ years' },
        { label: 'Duration', value: '2-4 months · 2 sessions/week' },
        { label: 'Fee', value: '₹ 7,500 on whole' },
        { label: 'Includes', value: 'Photo editing, digital art projects, certificate' }
      ]
    },
    software: {
      icon: '💻',
      title: 'Software Courses',
      desc: 'Coding, apps & web basics — start your software journey early.',
      details: [
        { label: 'Age Group', value: '12+ years' },
        { label: 'Duration', value: '3 months · 2 sessions/week' },
        { label: 'Fee', value: '₹ 5,000-₹ 7,500 on whole according to the course' },
        { label: 'Includes', value: 'HTML/CSS/JS, project builds, certificate' }
      ]
    },
    chess: {
      icon: '♟️',
      title: 'Chess',
      desc: 'Sharpen strategy, focus & critical thinking — one move at a time.',
      details: [
        { label: 'Age Group', value: '6+ years' },
        { label: 'Duration', value: 'Ongoing · 2 sessions/week' },
        { label: 'Fee', value: '₹ 2,000 / month' },
        { label: 'Includes', value: 'Tournament prep, rating improvement, certificate' }
      ]
    }
  };

  /* --- Inspirational Quotes --- */
  const quotes = [
    { text: '"The future belongs to those who learn more skills."', author: '— Robert Greene' },
    { text: '"Technology is best when it brings people together."', author: '— Matt Mullenweg' },
    { text: '"The science of today is the technology of tomorrow."', author: '— Edward Teller' },
    { text: '"Learning never exhausts the mind."', author: '— Leonardo da Vinci' },
    { text: '"Innovation distinguishes between a leader and a follower."', author: '— Steve Jobs' }
  ];

  let quoteIndex = 0;
  let quoteInterval = null;

  /* --- DOM Ready --- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initQuoteRotator();
    initCounters();
    initContactForm();
    initNewsletterForm();
    initFaqAccordion();
    initNavScroll();
    initCourseModal();
    initTestimonialCarousel();
    initBackToTopButton();
    applyStaggerDelays();
  }

  /* --- Mobile Navigation --- */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    let overlay = document.querySelector('.nav__overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav__overlay';
      document.body.appendChild(overlay);
    }

    function closeMenu() {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }

    function openMenu() {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      links.classList.add('open');
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function () {
      if (links.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    links.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* --- Smooth Scroll --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        history.pushState(null, '', targetId);
      });
    });
  }

  /* --- Scroll Reveal (Intersection Observer) --- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (prefersReducedMotion) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* --- Stagger Delays for Course Cards --- */
  function applyStaggerDelays() {
    const cards = document.querySelectorAll('.courses__grid .reveal');
    cards.forEach(function (card, i) {
      card.classList.add('reveal-delay-' + Math.min(i + 1, 5));
    });
  }

  /* --- Quote Rotator --- */
  function initQuoteRotator() {
    const quoteEl = document.getElementById('heroQuote');
    const authorEl = document.getElementById('heroQuoteAuthor');
    if (!quoteEl || !authorEl) return;

    if (prefersReducedMotion) return;

    quoteInterval = setInterval(function () {
      quoteEl.classList.add('fade-out');

      setTimeout(function () {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteEl.textContent = quotes[quoteIndex].text;
        authorEl.textContent = quotes[quoteIndex].author;
        quoteEl.classList.remove('fade-out');
      }, 500);
    }, 5000);
  }

  /* --- Animated Counters --- */
  function initCounters() {
    const stats = document.querySelectorAll('.stat__number');
    if (!stats.length) return;

    if (prefersReducedMotion) {
      stats.forEach(function (stat) {
        stat.textContent = stat.getAttribute('data-target');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(function (stat) { observer.observe(stat); });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  /* --- Nav Scroll Effect --- */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }

      let current = '';
      sections.forEach(function (section) {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Course Modal --- */
  function initCourseModal() {
    const modal = document.getElementById('courseModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalClose');
    const enrollBtn = document.getElementById('modalEnroll');
    const cards = document.querySelectorAll('.course-card');

    if (!modal) return;

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        const key = card.getAttribute('data-course');
        openModal(key);
      });
    });

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openModal(key) {
      const data = courseData[key];
      if (!data) return;

      document.getElementById('modalIcon').textContent = data.icon;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalDesc').textContent = data.desc;

      const detailsEl = document.getElementById('modalDetails');
      detailsEl.innerHTML = data.details
        .map(function (d) {
          return '<p><strong>' + d.label + ':</strong> ' + d.value + '</p>';
        })
        .join('');

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (enrollBtn) {
      enrollBtn.addEventListener('click', function () {
        closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* --- Testimonial Carousel --- */
  function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');

    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    let current = 0;
    let autoInterval = null;

    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

    function resetAuto() {
      if (autoInterval) clearInterval(autoInterval);
      if (!prefersReducedMotion) {
        autoInterval = setInterval(function () { goTo(current + 1); }, 6000);
      }
    }

    resetAuto();
  }

  /* --- FAQ Accordion --- */
  function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(function (question) {
      question.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const isOpen = answer.classList.contains('open');

        // Close all other answers
        document.querySelectorAll('.faq__answer.open').forEach(function (openAnswer) {
          openAnswer.classList.remove('open');
          openAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
        });

        // Toggle current answer
        if (!isOpen) {
          answer.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
        } else {
          answer.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* --- Back to Top Button --- */
  function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.classList.remove('show');
        setTimeout(function () {
          if (!backToTopBtn.classList.contains('show')) {
            backToTopBtn.style.display = 'none';
          }
        }, 300);
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* --- Contact Form --- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      name: {
        el: document.getElementById('name'),
        error: document.getElementById('nameError'),
        validate: function (v) {
          if (!v.trim()) return 'Please enter your name.';
          if (v.trim().length < 2) return 'Name must be at least 2 characters.';
          return '';
        }
      },
      email: {
        el: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: function (v) {
          if (!v.trim()) return 'Please enter your email.';
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(v)) return 'Please enter a valid email address.';
          return '';
        }
      },
      phone: {
        el: document.getElementById('phone'),
        error: document.getElementById('phoneError'),
        validate: function (v) {
          if (!v.trim()) return 'Please enter your phone number.';
          var phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
          if (!phoneRegex.test(v)) return 'Please enter a valid phone number.';
          return '';
        }
      },
      role: {
        el: document.getElementById('role'),
        error: document.getElementById('roleError'),
        validate: function (v) {
          if (!v) return 'Please select if you are a parent or student.';
          return '';
        }
      },
      course: {
        el: document.getElementById('course'),
        error: document.getElementById('courseError'),
        validate: function (v) {
          if (!v) return 'Please select a course.';
          return '';
        }
      },
      message: {
        el: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: function (v) {
          if (!v.trim()) return 'Please enter a message.';
          if (v.trim().length < 10) return 'Message must be at least 10 characters.';
          return '';
        }
      }
    };

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      field.el.addEventListener('input', function () {
        clearError(field);
      });
      field.el.addEventListener('blur', function () {
        var err = field.validate(field.el.value);
        if (err) showError(field, err);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        var err = field.validate(field.el.value);
        if (err) {
          showError(field, err);
          valid = false;
        } else {
          clearError(field);
        }
      });

      if (valid) {
        submitFormToService(form);
      }
    });
  }

  /* --- Submit form to Formspree --- */
  function submitFormToService(form) {
    var formData = new FormData(form);
    var formspreeEndpoint = 'https://formspree.io/f/xzebbnjg';
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function (response) {
      if (response.ok) {
        form.reset();
        showToast('✓ Thank you! We\'ll get back to you soon.');
      } else {
        showToast('⚠ Something went wrong. Please try again.');
      }
    })
    .catch(function (error) {
      console.error('Form submission error:', error);
      showToast('⚠ Network error. Please check your connection.');
    })
    .finally(function () {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }

  /* --- Newsletter Form --- */
  function initNewsletterForm() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var emailInput = document.getElementById('newsletterEmail');
    var errorEl = document.getElementById('newsletterError');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = emailInput.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        errorEl.textContent = 'Please enter your email.';
        errorEl.style.color = '#ef4444';
        return;
      }

      if (!emailRegex.test(email)) {
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.style.color = '#ef4444';
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;

      setTimeout(function () {
        emailInput.value = '';
        errorEl.textContent = '✓ Successfully subscribed! Check your email.';
        errorEl.style.color = '#22c55e';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(function () {
          errorEl.textContent = '';
        }, 4000);
      }, 1000);
    });
  }

  /* --- Form Utilities --- */
  function showError(field, msg) {
    field.el.classList.add('error');
    field.error.textContent = msg;
  }

  function clearError(field) {
    field.el.classList.remove('error');
    field.error.textContent = '';
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    var msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    setTimeout(function () {
      toast.classList.remove('show');
    }, 4000);
  }

})();
