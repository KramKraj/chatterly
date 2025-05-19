// Google Analytics Integration for Chatterly

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Analytics
    const initGoogleAnalytics = function() {
        // Google Analytics tracking code (GA4)
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MEASUREMENT_ID');
        
        // Make gtag available globally
        window.gtag = gtag;
    };
    
    // Track specific events
    const trackEvents = function() {
        // Track trial signup button clicks
        const trialButtons = document.querySelectorAll('a[href*="trial-signup.html"]');
        trialButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (window.gtag) {
                    gtag('event', 'trial_signup_click', {
                        'event_category': 'engagement',
                        'event_label': 'Trial Signup Button'
                    });
                }
            });
        });
        
        // Track pricing page views
        if (window.location.pathname.includes('pricing.html') && window.gtag) {
            gtag('event', 'pricing_page_view', {
                'event_category': 'page_view',
                'event_label': 'Pricing Page'
            });
        }
        
        // Track feature page views
        if (window.location.pathname.includes('features.html') && window.gtag) {
            gtag('event', 'features_page_view', {
                'event_category': 'page_view',
                'event_label': 'Features Page'
            });
        }
        
        // Track solutions page views
        if (window.location.pathname.includes('solutions.html') && window.gtag) {
            gtag('event', 'solutions_page_view', {
                'event_category': 'page_view',
                'event_label': 'Solutions Page'
            });
        }
        
        // Track resource downloads
        const resourceDownloads = document.querySelectorAll('a[href*="download"]');
        resourceDownloads.forEach(link => {
            link.addEventListener('click', function() {
                if (window.gtag) {
                    gtag('event', 'resource_download', {
                        'event_category': 'engagement',
                        'event_label': link.textContent || 'Resource Download'
                    });
                }
            });
        });
        
        // Track form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function() {
                if (window.gtag) {
                    gtag('event', 'form_submission', {
                        'event_category': 'conversion',
                        'event_label': form.getAttribute('id') || 'Form Submission'
                    });
                }
            });
        });
        
        // Track outbound links
        const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        outboundLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.gtag) {
                    gtag('event', 'outbound_link_click', {
                        'event_category': 'engagement',
                        'event_label': link.href
                    });
                }
            });
        });
    };
    
    // Track scroll depth
    const trackScrollDepth = function() {
        let scrollMarks = [25, 50, 75, 100];
        let marks = new Set();
        
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            scrollMarks.forEach(mark => {
                if (scrollPercent >= mark && !marks.has(mark)) {
                    marks.add(mark);
                    if (window.gtag) {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'event_label': 'Scroll Depth',
                            'value': mark
                        });
                    }
                }
            });
        });
    };
    
    // Track time on page
    const trackTimeOnPage = function() {
        const timeMarks = [30, 60, 120, 300]; // in seconds
        let startTime = new Date();
        let marks = new Set();
        
        setInterval(function() {
            const timeSpent = Math.round((new Date() - startTime) / 1000);
            
            timeMarks.forEach(mark => {
                if (timeSpent >= mark && !marks.has(mark)) {
                    marks.add(mark);
                    if (window.gtag) {
                        gtag('event', 'time_on_page', {
                            'event_category': 'engagement',
                            'event_label': 'Time on Page',
                            'value': mark
                        });
                    }
                }
            });
        }, 1000);
    };
    
    // Initialize all tracking
    const init = function() {
        // Initialize Google Analytics
        initGoogleAnalytics();
        
        // Initialize event tracking after a short delay to ensure GA is loaded
        setTimeout(function() {
            trackEvents();
            trackScrollDepth();
            trackTimeOnPage();
        }, 1000);
    };
    
    // Initialize
    init();
});
