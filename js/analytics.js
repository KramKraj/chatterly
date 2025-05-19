// Analytics tracking for Chatterly website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics tracking
    initializeAnalytics();
    
    // Track page views
    trackPageView();
    
    // Track CTA clicks
    trackCTAClicks();
    
    // Track form submissions
    trackFormSubmissions();
    
    // Track pricing toggle interactions
    trackPricingToggle();
    
    // Initialize analytics (in production, this would use Google Analytics, Segment, etc.)
    function initializeAnalytics() {
        // Create global analytics object
        window.chatterly_analytics = {
            events: [],
            pageViews: []
        };
        
        // Add Google Analytics (commented out for demo)
        /*
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(gaScript);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
        */
        
        console.log('Analytics initialized');
    }
    
    // Global tracking function
    window.trackEvent = function(eventName, eventData) {
        // Log event to console in development
        console.log('Event tracked:', eventName, eventData);
        
        // Store event in local analytics object
        window.chatterly_analytics.events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        
        // In production, send to actual analytics service
        /*
        gtag('event', eventName, eventData);
        */
    };
    
    // Track page views
    function trackPageView() {
        const pageData = {
            title: document.title,
            path: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
        };
        
        // Store page view in local analytics object
        window.chatterly_analytics.pageViews.push(pageData);
        
        // Track page view event
        window.trackEvent('page_view', pageData);
    }
    
    // Track CTA button clicks
    function trackCTAClicks() {
        const ctaButtons = document.querySelectorAll('.btn');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = button.textContent.trim();
                const buttonType = button.classList.contains('btn-primary') ? 'primary' : 
                                  button.classList.contains('btn-secondary') ? 'secondary' : 'outline';
                const buttonLocation = findButtonLocation(button);
                
                window.trackEvent('button_click', {
                    text: buttonText,
                    type: buttonType,
                    location: buttonLocation,
                    url: button.href || null
                });
            });
        });
    }
    
    // Helper function to determine button location
    function findButtonLocation(element) {
        let currentElement = element;
        while (currentElement && currentElement !== document.body) {
            if (currentElement.tagName === 'SECTION' && currentElement.className) {
                return currentElement.className.split(' ')[0];
            }
            currentElement = currentElement.parentElement;
        }
        return 'unknown';
    }
    
    // Track form submissions
    function trackFormSubmissions() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const formId = form.id || 'unknown-form';
                const formData = {};
                
                // Collect non-sensitive form data for analytics
                const formElements = form.querySelectorAll('input:not([type="password"]), select');
                formElements.forEach(element => {
                    if (element.name && element.type !== 'password') {
                        if (element.type === 'checkbox' || element.type === 'radio') {
                            formData[element.name] = element.checked;
                        } else {
                            // Don't collect actual values, just record that they were filled
                            formData[element.name] = element.value ? 'filled' : 'empty';
                        }
                    }
                });
                
                window.trackEvent('form_submit', {
                    form_id: formId,
                    form_data: formData
                });
            });
        });
    }
    
    // Track pricing toggle interactions
    function trackPricingToggle() {
        const pricingToggle = document.getElementById('pricing-toggle');
        
        if (pricingToggle) {
            pricingToggle.addEventListener('change', function(e) {
                const isAnnual = pricingToggle.checked;
                
                window.trackEvent('pricing_toggle', {
                    billing_period: isAnnual ? 'annual' : 'monthly'
                });
            });
        }
    }
    
    // Track scroll depth
    let maxScrollPercentage = 0;
    window.addEventListener('scroll', function() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);
        
        // Track scroll depth at 25%, 50%, 75%, and 100%
        if (scrollPercentage > maxScrollPercentage) {
            if (scrollPercentage >= 25 && maxScrollPercentage < 25) {
                window.trackEvent('scroll_depth', { depth: '25%' });
            }
            if (scrollPercentage >= 50 && maxScrollPercentage < 50) {
                window.trackEvent('scroll_depth', { depth: '50%' });
            }
            if (scrollPercentage >= 75 && maxScrollPercentage < 75) {
                window.trackEvent('scroll_depth', { depth: '75%' });
            }
            if (scrollPercentage >= 90 && maxScrollPercentage < 90) {
                window.trackEvent('scroll_depth', { depth: '100%' });
            }
            
            maxScrollPercentage = scrollPercentage;
        }
    });
    
    // Track time on page when user leaves
    let pageEntryTime = new Date();
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((new Date() - pageEntryTime) / 1000);
        
        window.trackEvent('time_on_page', {
            seconds: timeOnPage,
            page: window.location.pathname
        });
    });
});
