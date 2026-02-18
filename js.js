 // SCROLL PROGRESS
  const progress = document.getElementById('scrollProgress');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    progress.style.width = pct + '%';
    backTop.classList.toggle('show', scrollTop > 400);
  });

  // ACCORDION TOC
  function toggleTOC(btn) {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const body = btn.closest('.toc-wrapper').querySelector('.toc-body');
    btn.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('open', !isOpen);
  }

  // FAQ ACCORDION
  function toggleFAQ(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = answer.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isOpen) {
      answer.classList.add('open');
      item.classList.add('active');
    }
  }

  // SMOOTH SCROLL
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    target.style.outline = '3px solid rgba(201,168,76,0.7)';
    target.style.borderRadius = '8px';
    setTimeout(() => {
      target.style.outline = '3px solid transparent';
      target.style.transition = 'outline 0.8s ease';
      setTimeout(() => { target.style.outline = ''; target.style.transition = ''; }, 900);
    }, 600);
    window.scrollTo({ top, behavior: 'smooth' });
  });

  // INTERSECTION OBSERVER
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const selectors = [
    '.article-card',
    '.info-box',
    '.section-heading',
    '.price-table',
    '.steps-list li',
    '.highlight-cta',
    '.sidebar-widget',
    '.ornamental-divider',
    '.testimonial',
    '.faq-item',
    '.notice-box',
    '.section-divider'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => observer.observe(el));
  });