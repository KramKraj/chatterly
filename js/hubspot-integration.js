// HubSpot Integration for Chatterly

document.addEventListener('DOMContentLoaded', function() {
    // Initialize HubSpot tracking
    const initHubSpot = function() {
        // HubSpot tracking code
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//js.hs-scripts.com/HUBSPOT_PORTAL_ID.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    };

    // Initialize HubSpot forms
    const initHubSpotForms = function() {
        // Process all forms with hubspot-form class
        const forms = document.querySelectorAll('.hubspot-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                // Send to HubSpot
                sendToHubSpot(data, form.getAttribute('data-form-id'));
                
                // Show success message
                const successMessage = form.nextElementSibling;
                if (successMessage && successMessage.classList.contains('form-success')) {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            });
        });
    };
    
    // Send data to HubSpot
    const sendToHubSpot = function(data, formId) {
        // This would be replaced with actual HubSpot form submission
        // For now, we'll log the data
        console.log('Sending to HubSpot:', data, 'Form ID:', formId);
        
        // In production, this would use the HubSpot Forms API
        // Example:
        /*
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.hsforms.com/submissions/v3/integration/submit/PORTAL_ID/' + formId);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        const hubspotData = {
            fields: Object.keys(data).map(key => {
                return {
                    name: key,
                    value: data[key]
                };
            }),
            context: {
                pageUri: window.location.href,
                pageName: document.title
            }
        };
        
        xhr.send(JSON.stringify(hubspotData));
        */
    };
    
    // Track page views
    const trackPageView = function() {
        if (window._hsq) {
            window._hsq.push(['setPath', window.location.pathname]);
            window._hsq.push(['trackPageView']);
        }
    };
    
    // Track trial signup clicks
    const trackTrialSignupClicks = function() {
        const trialButtons = document.querySelectorAll('a[href*="trial-signup.html"]');
        
        trialButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (window._hsq) {
                    window._hsq.push(['trackEvent', {
                        id: 'trial_signup_click',
                        value: 1
                    }]);
                }
            });
        });
    };
    
    // Track pricing page views
    const trackPricingPageViews = function() {
        if (window.location.pathname.includes('pricing.html') && window._hsq) {
            window._hsq.push(['trackEvent', {
                id: 'pricing_page_view',
                value: 1
            }]);
        }
    };
    
    // Initialize all tracking
    const init = function() {
        // Initialize HubSpot
        initHubSpot();
        
        // Initialize forms after a short delay to ensure HubSpot is loaded
        setTimeout(initHubSpotForms, 1000);
        
        // Track page views
        trackPageView();
        
        // Track trial signup clicks
        trackTrialSignupClicks();
        
        // Track pricing page views
        trackPricingPageViews();
    };
    
    // Initialize
    init();
});
