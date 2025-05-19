// HubSpot integration for Chatterly
// Version: 1.0.0
// Author: Chatterly Development Team

// HubSpot tracking code and form integration
(function() {
  // HubSpot tracking code
  const hubspotScript = document.createElement('script');
  hubspotScript.type = 'text/javascript';
  hubspotScript.async = true;
  hubspotScript.src = '//js.hs-scripts.com/YOUR_HUBSPOT_ID.js';
  document.head.appendChild(hubspotScript);
  
  // Initialize HubSpot forms
  function initHubSpotForms() {
    // Check if HubSpot Forms script is already loaded
    if (window.hbspt) {
      createForms();
    } else {
      // Load HubSpot Forms script
      const formScript = document.createElement('script');
      formScript.type = 'text/javascript';
      formScript.src = '//js.hsforms.net/forms/embed/v2.js';
      formScript.onload = createForms;
      document.head.appendChild(formScript);
    }
  }
  
  // Create HubSpot forms
  function createForms() {
    // Contact form
    const contactFormContainer = document.getElementById('hubspot-contact-form');
    if (contactFormContainer) {
      window.hbspt.forms.create({
        region: 'na1',
        portalId: 'YOUR_HUBSPOT_ID',
        formId: 'YOUR_CONTACT_FORM_ID',
        target: '#hubspot-contact-form',
        onFormSubmit: function($form) {
          // Track form submission in Google Analytics
          if (window.gtag) {
            gtag('event', 'form_submission', {
              'form_id': 'contact',
              'form_name': 'Contact Form'
            });
          }
        }
      });
    }
    
    // Trial signup form
    const trialFormContainer = document.getElementById('hubspot-trial-form');
    if (trialFormContainer) {
      window.hbspt.forms.create({
        region: 'na1',
        portalId: 'YOUR_HUBSPOT_ID',
        formId: 'YOUR_TRIAL_FORM_ID',
        target: '#hubspot-trial-form',
        onFormSubmit: function($form) {
          // Track form submission in Google Analytics
          if (window.gtag) {
            gtag('event', 'form_submission', {
              'form_id': 'trial_signup',
              'form_name': 'Trial Signup Form'
            });
          }
          
          // Store trial signup info in localStorage for Stripe integration
          const email = $form.find('input[name="email"]').val();
          if (email) {
            localStorage.setItem('chatterly_trial_email', email);
          }
        }
      });
    }
    
    // Newsletter subscription form
    const newsletterFormContainer = document.getElementById('hubspot-newsletter-form');
    if (newsletterFormContainer) {
      window.hbspt.forms.create({
        region: 'na1',
        portalId: 'YOUR_HUBSPOT_ID',
        formId: 'YOUR_NEWSLETTER_FORM_ID',
        target: '#hubspot-newsletter-form',
        onFormSubmit: function($form) {
          // Track form submission in Google Analytics
          if (window.gtag) {
            gtag('event', 'form_submission', {
              'form_id': 'newsletter',
              'form_name': 'Newsletter Subscription'
            });
          }
        }
      });
    }
  }
  
  // HubSpot Chat widget integration
  function initHubSpotChat() {
    window.HubSpotConversations = window.HubSpotConversations || {};
    window.HubSpotConversations.config = {
      loadImmediately: false,
      inlineEmbedSelector: '#hubspot-chat-embed'
    };
    
    // Load HubSpot Chat script
    const chatScript = document.createElement('script');
    chatScript.type = 'text/javascript';
    chatScript.async = true;
    chatScript.src = '//js.usemessages.com/conversations-embed.js';
    chatScript.onload = function() {
      // Initialize chat widget
      if (window.HubSpotConversations.widget) {
        window.HubSpotConversations.widget.load();
      }
    };
    document.head.appendChild(chatScript);
  }
  
  // HubSpot Analytics integration
  function initHubSpotAnalytics() {
    // Track page views
    if (window._hsq) {
      window._hsq.push(['setPath', window.location.pathname]);
      window._hsq.push(['trackPageView']);
    }
    
    // Track button clicks
    document.addEventListener('click', function(e) {
      const target = e.target.closest('.btn');
      if (target) {
        const buttonText = target.textContent.trim();
        const buttonHref = target.getAttribute('href');
        
        if (window._hsq) {
          window._hsq.push(['trackEvent', {
            id: 'button_click',
            value: {
              button_text: buttonText,
              button_destination: buttonHref
            }
          }]);
        }
      }
    });
  }
  
  // Initialize all HubSpot integrations when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initHubSpotForms();
    initHubSpotChat();
    initHubSpotAnalytics();
  });
})();

// HubSpot CRM API integration helper functions
// Note: These functions are for server-side use and should be implemented in your backend
/*
// Create or update a contact in HubSpot CRM
function createOrUpdateContact(properties) {
  const url = 'https://api.hubapi.com/crm/v3/objects/contacts';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_HUBSPOT_API_KEY'
    },
    body: JSON.stringify({
      properties: properties
    })
  };
  
  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error creating/updating contact:', error);
      throw error;
    });
}

// Create a deal in HubSpot CRM
function createDeal(properties, associatedContactId) {
  const url = 'https://api.hubapi.com/crm/v3/objects/deals';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_HUBSPOT_API_KEY'
    },
    body: JSON.stringify({
      properties: properties,
      associations: [
        {
          to: {
            id: associatedContactId
          },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 3
            }
          ]
        }
      ]
    })
  };
  
  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error creating deal:', error);
      throw error;
    });
}
*/
