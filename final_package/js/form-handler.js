// Form handler for Chatterly website
// Version: 1.0.0
// Author: Chatterly Development Team

// Email integration and form handling
(function() {
  // Initialize form handlers
  function initFormHandlers() {
    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      setupFormValidation(contactForm, handleContactFormSubmit);
    }
    
    // Trial signup form handler
    const trialForm = document.getElementById('trial-signup-form');
    if (trialForm) {
      setupFormValidation(trialForm, handleTrialFormSubmit);
    }
    
    // Newsletter subscription form handler
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      setupFormValidation(newsletterForm, handleNewsletterFormSubmit);
    }
    
    // Footer subscription form handler
    const footerForm = document.querySelector('.footer-subscribe');
    if (footerForm) {
      setupFooterFormHandler(footerForm);
    }
  }
  
  // Set up form validation
  function setupFormValidation(form, submitHandler) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Reset previous error messages
      const errorElements = form.querySelectorAll('.error-message');
      errorElements.forEach(el => el.textContent = '');
      
      // Validate form fields
      let isValid = true;
      
      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showError(field, 'This field is required');
        }
      });
      
      // Validate email fields
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach(field => {
        if (field.value.trim() && !isValidEmail(field.value)) {
          isValid = false;
          showError(field, 'Please enter a valid email address');
        }
      });
      
      // If form is valid, submit it
      if (isValid) {
        submitHandler(form);
      }
    });
  }
  
  // Show error message for a field
  function showError(field, message) {
    let errorElement = field.nextElementSibling;
    
    // Create error element if it doesn't exist
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    field.classList.add('error');
    
    // Remove error styling when field is edited
    field.addEventListener('input', function() {
      field.classList.remove('error');
      errorElement.textContent = '';
    }, { once: true });
  }
  
  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Handle contact form submission
  function handleContactFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }
    
    // Collect form data
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message')
    };
    
    // In a real implementation, you would send this data to your server
    // For demo purposes, we'll simulate a successful submission
    console.log('Contact form data:', data);
    
    // Simulate API call
    setTimeout(() => {
      // Show success message
      form.innerHTML = `
        <div class="form-success">
          <i class="fas fa-check-circle"></i>
          <h3>Message Sent!</h3>
          <p>Thank you for contacting us. We'll get back to you shortly.</p>
        </div>
      `;
      
      // Track form submission in Google Analytics
      if (window.gtag) {
        gtag('event', 'form_submission', {
          'form_id': 'contact',
          'form_name': 'Contact Form'
        });
      }
      
      // Send email notification (in a real implementation)
      // sendEmailNotification('contact', data);
    }, 1500);
  }
  
  // Handle trial signup form submission
  function handleTrialFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Processing...';
    }
    
    // Collect form data
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      website: formData.get('website'),
      plan: formData.get('plan')
    };
    
    // In a real implementation, you would send this data to your server
    // For demo purposes, we'll simulate a successful submission
    console.log('Trial signup form data:', data);
    
    // Simulate API call
    setTimeout(() => {
      // Show success message
      form.innerHTML = `
        <div class="form-success">
          <i class="fas fa-check-circle"></i>
          <h3>Trial Account Created!</h3>
          <p>Thank you for signing up. Check your email for instructions to get started.</p>
        </div>
      `;
      
      // Track form submission in Google Analytics
      if (window.gtag) {
        gtag('event', 'form_submission', {
          'form_id': 'trial_signup',
          'form_name': 'Trial Signup Form'
        });
      }
      
      // Send welcome email (in a real implementation)
      // sendWelcomeEmail(data);
    }, 1500);
  }
  
  // Handle newsletter form submission
  function handleNewsletterFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
    }
    
    // Collect form data
    const data = {
      email: formData.get('email')
    };
    
    // In a real implementation, you would send this data to your server
    // For demo purposes, we'll simulate a successful submission
    console.log('Newsletter form data:', data);
    
    // Simulate API call
    setTimeout(() => {
      // Show success message
      form.innerHTML = `
        <div class="form-success">
          <i class="fas fa-check-circle"></i>
          <h3>Subscribed!</h3>
          <p>Thank you for subscribing to our newsletter.</p>
        </div>
      `;
      
      // Track form submission in Google Analytics
      if (window.gtag) {
        gtag('event', 'form_submission', {
          'form_id': 'newsletter',
          'form_name': 'Newsletter Subscription'
        });
      }
      
      // Send confirmation email (in a real implementation)
      // sendSubscriptionConfirmation(data.email);
    }, 1000);
  }
  
  // Set up footer subscription form
  function setupFooterFormHandler(formContainer) {
    const input = formContainer.querySelector('input[type="email"]');
    const button = formContainer.querySelector('button');
    
    if (input && button) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Validate email
        if (!input.value.trim()) {
          input.classList.add('error');
          return;
        }
        
        if (!isValidEmail(input.value)) {
          input.classList.add('error');
          return;
        }
        
        // Disable button
        button.disabled = true;
        button.textContent = '...';
        
        // Collect data
        const email = input.value.trim();
        
        // In a real implementation, you would send this data to your server
        // For demo purposes, we'll simulate a successful submission
        console.log('Footer subscription email:', email);
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          input.value = '';
          input.placeholder = 'Subscribed!';
          button.textContent = '✓';
          
          // Reset after a few seconds
          setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Subscribe';
            input.placeholder = 'Your email';
          }, 3000);
          
          // Track form submission in Google Analytics
          if (window.gtag) {
            gtag('event', 'form_submission', {
              'form_id': 'footer_subscribe',
              'form_name': 'Footer Subscription'
            });
          }
          
          // Send confirmation email (in a real implementation)
          // sendSubscriptionConfirmation(email);
        }, 1000);
      });
      
      // Remove error styling when input is edited
      input.addEventListener('input', function() {
        input.classList.remove('error');
      });
    }
  }
  
  // Email sending functions (these would be implemented on the server side)
  /*
  // Send email notification to admin
  function sendEmailNotification(type, data) {
    // This would be implemented on your server
    // Example using a service like SendGrid, Mailgun, or AWS SES
    
    let subject, template;
    
    switch (type) {
      case 'contact':
        subject = 'New Contact Form Submission';
        template = 'contact_notification';
        break;
      case 'trial':
        subject = 'New Trial Signup';
        template = 'trial_notification';
        break;
      default:
        subject = 'New Form Submission';
        template = 'generic_notification';
    }
    
    const emailData = {
      to: 'admin@chatterly.com',
      from: 'noreply@chatterly.com',
      subject: subject,
      template: template,
      data: data
    };
    
    // Send email using your preferred email service
    // sendEmail(emailData);
  }
  
  // Send welcome email to new trial user
  function sendWelcomeEmail(data) {
    const emailData = {
      to: data.email,
      from: 'welcome@chatterly.com',
      subject: 'Welcome to Chatterly!',
      template: 'trial_welcome',
      data: {
        name: data.name,
        company: data.company
      }
    };
    
    // Send email using your preferred email service
    // sendEmail(emailData);
  }
  
  // Send subscription confirmation
  function sendSubscriptionConfirmation(email) {
    const emailData = {
      to: email,
      from: 'newsletter@chatterly.com',
      subject: 'Subscription Confirmed',
      template: 'newsletter_confirmation',
      data: {}
    };
    
    // Send email using your preferred email service
    // sendEmail(emailData);
  }
  */
  
  // Initialize form handlers when DOM is ready
  document.addEventListener('DOMContentLoaded', initFormHandlers);
})();

// Email integration documentation
/*
Email Integration Guide for Chatterly

This guide explains how to set up email functionality for your Chatterly website.

1. HubSpot Email Integration (Recommended)
   - Log in to your HubSpot account
   - Go to Marketing > Email
   - Create email templates for:
     - Welcome emails for new trial users
     - Contact form notifications
     - Newsletter confirmations
   - Set up automated workflows for each email type
   - Connect your forms to these workflows

2. Alternative Email Services
   If you prefer not to use HubSpot for email, you can integrate with:
   
   a) SendGrid:
      - Create a SendGrid account
      - Set up API keys
      - Replace the commented code in this file with SendGrid API calls
      - Example: 
        ```
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: data.email,
          from: 'welcome@chatterly.com',
          subject: 'Welcome to Chatterly!',
          template_id: 'your-template-id',
          dynamic_template_data: {
            name: data.name,
            company: data.company
          }
        };
        sgMail.send(msg);
        ```
   
   b) Mailgun:
      - Create a Mailgun account
      - Set up your domain and API keys
      - Replace the commented code with Mailgun API calls
      - Example:
        ```
        const mailgun = require('mailgun-js')({
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN
        });
        const data = {
          from: 'welcome@chatterly.com',
          to: data.email,
          subject: 'Welcome to Chatterly!',
          template: 'welcome_template',
          'h:X-Mailgun-Variables': JSON.stringify({
            name: data.name,
            company: data.company
          })
        };
        mailgun.messages().send(data);
        ```

3. Email Templates
   Regardless of which service you use, you'll need these email templates:
   
   a) Welcome Email:
      - Sent to new trial users
      - Should include:
        - Personalized greeting
        - Getting started instructions
        - Login information
        - Support contact details
   
   b) Contact Form Notification:
      - Sent to your team when someone submits the contact form
      - Should include:
        - All form fields (name, email, company, message)
        - Timestamp
        - Source page
   
   c) Newsletter Confirmation:
      - Sent to new newsletter subscribers
      - Should include:
        - Confirmation of subscription
        - What to expect (frequency, content)
        - Unsubscribe option (required by law)

4. Email Deliverability
   To ensure your emails reach recipients:
   - Set up SPF and DKIM records for your domain
   - Use a consistent sender address
   - Include unsubscribe links in all marketing emails
   - Follow CAN-SPAM and GDPR requirements
*/
