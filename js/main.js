// Main JavaScript for Chatterly website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize pricing toggle
    initPricingToggle();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize resource category tabs
    initResourceTabs();
    
    // Mobile menu toggle functionality
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Track menu toggle in analytics
                if (typeof window.trackEvent === 'function') {
                    window.trackEvent('mobile_menu_toggle', {
                        state: mainNav.classList.contains('active') ? 'open' : 'closed'
                    });
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !mainNav.contains(e.target) && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    }
    
    // Pricing toggle functionality
    function initPricingToggle() {
        const pricingToggle = document.getElementById('pricing-toggle');
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const annualPrices = document.querySelectorAll('.price-annual');
        const monthlyLabel = document.querySelector('.toggle-monthly');
        const annualLabel = document.querySelector('.toggle-annual');
        
        if (pricingToggle) {
            // Set initial state
            updatePricingDisplay();
            
            // Handle toggle change
            pricingToggle.addEventListener('change', function() {
                updatePricingDisplay();
                
                // Track pricing toggle in analytics
                if (typeof window.trackEvent === 'function') {
                    window.trackEvent('pricing_toggle', {
                        billing_period: pricingToggle.checked ? 'annual' : 'monthly'
                    });
                }
            });
            
            // Handle label clicks
            if (monthlyLabel) {
                monthlyLabel.addEventListener('click', function() {
                    pricingToggle.checked = false;
                    updatePricingDisplay();
                });
            }
            
            if (annualLabel) {
                annualLabel.addEventListener('click', function() {
                    pricingToggle.checked = true;
                    updatePricingDisplay();
                });
            }
            
            // Update pricing display based on toggle state
            function updatePricingDisplay() {
                const isAnnual = pricingToggle.checked;
                
                // Update active label
                if (monthlyLabel && annualLabel) {
                    monthlyLabel.classList.toggle('active', !isAnnual);
                    annualLabel.classList.toggle('active', isAnnual);
                }
                
                // Update visible prices
                monthlyPrices.forEach(price => {
                    price.style.display = isAnnual ? 'none' : 'block';
                });
                
                annualPrices.forEach(price => {
                    price.style.display = isAnnual ? 'block' : 'none';
                });
                
                // Update savings badges
                const savingsBadges = document.querySelectorAll('.savings-badge');
                savingsBadges.forEach(badge => {
                    badge.style.display = isAnnual ? 'block' : 'none';
                });
            }
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId !== '#') {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Get header height for offset
                        const headerHeight = document.querySelector('header').offsetHeight;
                        
                        // Calculate position
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        // Smooth scroll
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Track scroll event in analytics
                        if (typeof window.trackEvent === 'function') {
                            window.trackEvent('anchor_click', {
                                target: targetId
                            });
                        }
                    }
                }
            });
        });
    }
    
    // Testimonial slider functionality
    function initTestimonialSlider() {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        
        if (testimonialSlider) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            // Mouse events for desktop
            testimonialSlider.addEventListener('mousedown', (e) => {
                isDown = true;
                testimonialSlider.classList.add('active');
                startX = e.pageX - testimonialSlider.offsetLeft;
                scrollLeft = testimonialSlider.scrollLeft;
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                isDown = false;
                testimonialSlider.classList.remove('active');
            });
            
            testimonialSlider.addEventListener('mouseup', () => {
                isDown = false;
                testimonialSlider.classList.remove('active');
            });
            
            testimonialSlider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - testimonialSlider.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed
                testimonialSlider.scrollLeft = scrollLeft - walk;
            });
            
            // Touch events for mobile
            testimonialSlider.addEventListener('touchstart', (e) => {
                isDown = true;
                testimonialSlider.classList.add('active');
                startX = e.touches[0].pageX - testimonialSlider.offsetLeft;
                scrollLeft = testimonialSlider.scrollLeft;
            });
            
            testimonialSlider.addEventListener('touchend', () => {
                isDown = false;
                testimonialSlider.classList.remove('active');
            });
            
            testimonialSlider.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
                const walk = (x - startX) * 2;
                testimonialSlider.scrollLeft = scrollLeft - walk;
            });
        }
    }
    
    // Resource category tabs functionality
    function initResourceTabs() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        const resourceSections = document.querySelectorAll('.resource-section');
        
        if (categoryTabs.length > 0 && resourceSections.length > 0) {
            // Handle tab clicks
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get target section ID
                    const targetId = this.getAttribute('href');
                    
                    // Update active tab
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Smooth scroll to section
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Get header and tabs height for offset
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const tabsHeight = document.querySelector('.category-tabs').offsetHeight;
                        
                        // Calculate position
                        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - tabsHeight;
                        
                        // Smooth scroll
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Track tab click in analytics
                        if (typeof window.trackEvent === 'function') {
                            window.trackEvent('resource_tab_click', {
                                tab: targetId.substring(1)
                            });
                        }
                    }
                });
            });
            
            // Set active tab based on scroll position
            window.addEventListener('scroll', function() {
                // Get current scroll position
                const scrollPosition = window.scrollY + window.innerHeight / 3;
                
                // Find current section
                let currentSection = null;
                
                resourceSections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = section;
                    }
                });
                
                // Update active tab
                if (currentSection) {
                    const currentId = '#' + currentSection.id;
                    
                    categoryTabs.forEach(tab => {
                        if (tab.getAttribute('href') === currentId) {
                            tab.classList.add('active');
                        } else {
                            tab.classList.remove('active');
                        }
                    });
                }
            });
        }
    }
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .competitive-card, .pricing-card, .testimonial, .resource-card');
    
    if (animatedElements.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
            );
        }
        
        // Add animation class when element is in viewport
        function animateOnScroll() {
            animatedElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Run on page load
        animateOnScroll();
    }
});
