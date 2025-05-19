// Form Validation and Submission Handler for Chatterly

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation and submission
    const initForms = function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add validation
            addFormValidation(form);
            
            // Handle submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                if (validateForm(form)) {
                    // Get form data
                    const formData = new FormData(form);
                    const data = {};
                    for (let [key, value] of formData.entries()) {
                        data[key] = value;
                    }
                    
                    // Determine form type and handle accordingly
                    if (form.classList.contains('trial-form')) {
                        handleTrialSignup(data, form);
                    } else if (form.classList.contains('contact-form')) {
                        handleContactForm(data, form);
                    } else if (form.classList.contains('newsletter-form')) {
                        handleNewsletterSignup(data, form);
                    } else {
                        // Generic form handling
                        handleGenericForm(data, form);
                    }
                }
            });
        });
    };
    
    // Add validation to form fields
    const addFormValidation = function(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add blur event for real-time validation
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            // Add input event for real-time validation of certain fields
            if (input.type === 'email' || input.type === 'tel' || input.classList.contains('validate-as-typing')) {
                input.addEventListener('input', function() {
                    validateField(input);
                });
            }
        });
    };
    
    // Validate individual field
    const validateField = function(field) {
        // Remove existing error messages
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Check if field is required and empty
        if (field.required && !field.value.trim()) {
            showError(field, 'This field is required');
            return false;
        }
        
        // Validate email fields
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Validate phone fields
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
            if (!phoneRegex.test(field.value.trim())) {
                showError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        // Validate password fields
        if (field.type === 'password' && field.value.trim()) {
            if (field.value.length < 8) {
                showError(field, 'Password must be at least 8 characters');
                return false;
            }
        }
        
        // Validate URL fields
        if (field.type === 'url' && field.value.trim()) {
            try {
                new URL(field.value);
            } catch (_) {
                showError(field, 'Please enter a valid URL');
                return false;
            }
        }
        
        // Field is valid
        return true;
    };
    
    // Validate entire form
    const validateForm = function(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    };
    
    // Show error message for a field
    const showError = function(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    };
    
    // Handle trial signup form submission
    const handleTrialSignup = function(data, form) {
        // Track conversion in analytics
        if (window.gtag) {
            gtag('event', 'trial_signup', {
                'event_category': 'conversion',
                'event_label': 'Trial Signup'
            });
        }
        
        // Send to HubSpot
        if (window._hsq) {
            window._hsq.push(['identify', {
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                company: data.company,
                phone: data.phone
            }]);
            
            window._hsq.push(['trackEvent', {
                id: 'trial_signup_complete',
                value: 1
            }]);
        }
        
        // Show success message
        showFormSuccess(form, 'trial-success');
        
        // In a real implementation, this would also:
        // 1. Create user account
        // 2. Send welcome email
        // 3. Redirect to onboarding
        console.log('Trial signup processed:', data);
        
        // Simulate redirect to onboarding after delay
        setTimeout(function() {
            // window.location.href = 'onboarding.html';
            console.log('Would redirect to onboarding');
        }, 2000);
    };
    
    // Handle contact form submission
    const handleContactForm = function(data, form) {
        // Track conversion in analytics
        if (window.gtag) {
            gtag('event', 'contact_form_submission', {
                'event_category': 'conversion',
                'event_label': 'Contact Form'
            });
        }
        
        // Send to HubSpot
        if (window._hsq) {
            window._hsq.push(['identify', {
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                company: data.company,
                phone: data.phone,
                message: data.message
            }]);
            
            window._hsq.push(['trackEvent', {
                id: 'contact_form_submission',
                value: 1
            }]);
        }
        
        // Show success message
        showFormSuccess(form, 'contact-success');
        
        console.log('Contact form processed:', data);
    };
    
    // Handle newsletter signup
    const handleNewsletterSignup = function(data, form) {
        // Track conversion in analytics
        if (window.gtag) {
            gtag('event', 'newsletter_signup', {
                'event_category': 'conversion',
                'event_label': 'Newsletter Signup'
            });
        }
        
        // Send to HubSpot
        if (window._hsq) {
            window._hsq.push(['identify', {
                email: data.email
            }]);
            
            window._hsq.push(['trackEvent', {
                id: 'newsletter_signup',
                value: 1
            }]);
        }
        
        // Show success message
        showFormSuccess(form, 'newsletter-success');
        
        console.log('Newsletter signup processed:', data);
    };
    
    // Handle generic form submission
    const handleGenericForm = function(data, form) {
        // Track conversion in analytics
        if (window.gtag) {
            gtag('event', 'form_submission', {
                'event_category': 'conversion',
                'event_label': form.getAttribute('id') || 'Generic Form'
            });
        }
        
        // Show success message
        showFormSuccess(form, 'form-success');
        
        console.log('Form processed:', data);
    };
    
    // Show form success message
    const showFormSuccess = function(form, successClass) {
        // Hide the form
        form.style.display = 'none';
        
        // Show success message
        const successElement = form.nextElementSibling;
        if (successElement && successElement.classList.contains(successClass)) {
            successElement.style.display = 'block';
        } else {
            // Create success message if it doesn't exist
            const newSuccessElement = document.createElement('div');
            newSuccessElement.className = successClass + ' form-success';
            newSuccessElement.innerHTML = '<h3>Thank you!</h3><p>Your submission has been received. We\'ll be in touch shortly.</p>';
            
            form.parentNode.insertBefore(newSuccessElement, form.nextSibling);
        }
    };
    
    // Initialize
    initForms();
});
