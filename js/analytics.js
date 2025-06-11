// Google Analytics integration for Chatterly
// Version: 1.0.0
// Author: Chatterly Development Team

// Google Analytics 4 implementation
(function() {
  // Replace with actual measurement ID
  const measurementId = 'G-XXXXXXXXXX';
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', measurementId);
  
  // Track page views
  document.addEventListener('DOMContentLoaded', function() {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  });
  
  // Track button clicks
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.btn');
    if (target) {
      const buttonText = target.textContent.trim();
      const buttonHref = target.getAttribute('href');
      
      gtag('event', 'button_click', {
        button_text: buttonText,
        button_destination: buttonHref
      });
    }
  });
  
  // Track form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const formId = form.id || 'unknown_form';
      
      gtag('event', 'form_submission', {
        form_id: formId,
        form_name: form.getAttribute('name') || 'unnamed_form'
      });
    });
  });
  
  // Track testimonial views
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const testimonialAuthor = entry.target.querySelector('.author-info h4')?.textContent || 'Unknown';
          
          gtag('event', 'testimonial_view', {
            testimonial_author: testimonialAuthor
          });
          
          // Unobserve after tracking once
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    testimonials.forEach(testimonial => {
      observer.observe(testimonial);
    });
  }
  
  // Track pricing plan views
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const planName = entry.target.querySelector('h3')?.textContent || 'Unknown Plan';
          
          gtag('event', 'pricing_plan_view', {
            plan_name: planName
          });
          
          // Unobserve after tracking once
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    pricingCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Add cookie consent notice if needed
  if (!localStorage.getItem('cookie_consent')) {
    const consentNotice = document.createElement('div');
    consentNotice.className = 'analytics-notice';
    consentNotice.innerHTML = `
      This website uses cookies to improve your experience and analyze site traffic. 
      <a href="cookies.html">Learn more</a>
      <button id="cookie-consent-btn" class="btn btn-primary btn-sm">Accept</button>
    `;
    
    document.body.appendChild(consentNotice);
    
    document.getElementById('cookie-consent-btn').addEventListener('click', function() {
      localStorage.setItem('cookie_consent', 'true');
      consentNotice.style.display = 'none';
      
      gtag('event', 'cookie_consent_accepted');
    });
  }
})();
