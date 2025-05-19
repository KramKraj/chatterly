// HubSpot integration for Chatterly website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize HubSpot tracking code
    const hubspotScript = document.createElement('script');
    hubspotScript.type = 'text/javascript';
    hubspotScript.async = true;
    hubspotScript.src = '//js.hs-scripts.com/12345678.js'; // Replace with actual HubSpot portal ID in production
    document.head.appendChild(hubspotScript);
    
    // Create global function to send data to HubSpot
    window.sendToHubSpot = function(formData) {
        // In production, this would use the HubSpot Forms API
        console.log('Sending data to HubSpot:', formData);
        
        // Example of how to use HubSpot's forms API (commented out for demo)
        /*
        const hubspotFormData = {
            portalId: "12345678",
            formId: "abcdef-1234-5678-abcd-1234567890ab",
            fields: [
                {
                    name: "email",
                    value: formData.email
                },
                {
                    name: "firstname",
                    value: formData.fullName.split(' ')[0]
                },
                {
                    name: "lastname",
                    value: formData.fullName.split(' ').slice(1).join(' ')
                },
                {
                    name: "company",
                    value: formData.company
                },
                {
                    name: "website",
                    value: formData.website
                },
                {
                    name: "phone",
                    value: formData.phone || ""
                },
                {
                    name: "selected_plan",
                    value: formData.plan
                }
            ]
        };
        
        fetch("https://api.hsforms.com/submissions/v3/integration/submit/12345678/abcdef-1234-5678-abcd-1234567890ab", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hubspotFormData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("HubSpot submission successful:", data);
        })
        .catch(error => {
            console.error("HubSpot submission error:", error);
        });
        */
    };
    
    // Track page views in HubSpot
    function trackPageView() {
        if (window._hsq) {
            window._hsq.push(['setPath', window.location.pathname]);
            window._hsq.push(['trackPageView']);
        }
    }
    
    // Initialize HubSpot tracking queue
    window._hsq = window._hsq || [];
    
    // Track initial page view
    trackPageView();
    
    // Track page changes for single-page applications (if applicable)
    window.addEventListener('popstate', trackPageView);
    
    // Add HubSpot chat widget (commented out for demo)
    /*
    function loadHubSpotChat() {
        window.HubSpotConversations = {
            config: {
                loadImmediately: true,
                disableAttachment: false
            }
        };
        
        const chatScript = document.createElement('script');
        chatScript.type = 'text/javascript';
        chatScript.async = true;
        chatScript.src = '//js.usemessages.com/conversations-embed.js';
        document.head.appendChild(chatScript);
    }
    
    // Load chat widget after a short delay to prioritize page load
    setTimeout(loadHubSpotChat, 2000);
    */
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (window._hsq) {
                window._hsq.push(['trackEvent', {
                    id: 'cta_click',
                    value: button.textContent.trim()
                }]);
            }
        });
    });
});
