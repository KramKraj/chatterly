// Main JavaScript for Chatterly
// Version: 1.0.0
// Author: Chatterly Development Team

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Pricing toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingAmounts = document.querySelectorAll('.pricing-amount');
    const monthlyPrices = ['$19', '$49', '$99'];
    const annualPrices = ['$15', '$39', '$79'];
    
    if (pricingToggle && pricingAmounts.length > 0) {
        pricingToggle.addEventListener('change', function() {
            pricingAmounts.forEach((amount, index) => {
                if (this.checked) {
                    // Annual pricing
                    amount.innerHTML = annualPrices[index] + ' <span class="pricing-period">/month</span>';
                } else {
                    // Monthly pricing
                    amount.innerHTML = monthlyPrices[index] + ' <span class="pricing-period">/month</span>';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set up button destinations
    setupButtonDestinations();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Add active class to current page in navigation
    highlightCurrentPage();
});

// Function to set up all button destinations
function setupButtonDestinations() {
    // Map of button text to destinations
    const buttonDestinations = {
        'Explore All Features': 'features.html',
        'See Features': 'features.html',
        'See More Success Stories': 'features.html#success-stories',
        'View Full Pricing Details': 'pricing.html',
        'Start Your Free Trial': 'trial-signup.html',
        'Contact Sales': 'contact.html',
        'Learn More': 'features.html'
    };
    
    // Get all buttons and links
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        const buttonText = button.textContent.trim();
        
        // If this button text has a defined destination and doesn't already have an href
        if (buttonDestinations[buttonText] && (!button.hasAttribute('href') || button.getAttribute('href') === '#' || button.getAttribute('href') === '')) {
            button.setAttribute('href', buttonDestinations[buttonText]);
        }
    });
    
    // Add IDs to sections for anchor links
    const sections = {
        'success-stories': document.querySelector('.success-stories'),
        'roi': document.querySelector('.business-impact'),
        'features': document.querySelector('.features-section'),
        'pricing': document.querySelector('.pricing-section'),
        'testimonials': document.querySelector('.testimonials'),
        'how-it-works': document.querySelector('.how-it-works')
    };
    
    // Add IDs to sections if they exist and don't already have an ID
    for (const [id, section] of Object.entries(sections)) {
        if (section && !section.id) {
            section.id = id;
        }
    }
}

// Function to initialize testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Auto scroll for testimonials
    let scrollInterval;
    
    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            slider.scrollLeft += 2;
            
            // Reset scroll position when reaching the end
            if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) {
                slider.scrollLeft = 0;
            }
        }, 30);
    }
    
    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }
    
    // Start auto scroll
    startAutoScroll();
    
    // Pause auto scroll on hover
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
}

// Function to highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') || 
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add scroll animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.feature-card, .benefit-card, .step, .testimonial, .pricing-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        }
    });
});
