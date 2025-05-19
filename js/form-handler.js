// Form handler for Chatterly trial signup
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(signupForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validate form data
            if (validateForm(formDataObj)) {
                // Show loading state
                const submitButton = signupForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission (in production, this would be an actual API call)
                setTimeout(function() {
                    // Send data to HubSpot (via the HubSpot integration script)
                    if (typeof window.sendToHubSpot === 'function') {
                        window.sendToHubSpot(formDataObj);
                    }
                    
                    // Track signup event in analytics
                    if (typeof window.trackEvent === 'function') {
                        window.trackEvent('trial_signup', {
                            plan: formDataObj.plan,
                            source: getUtmSource()
                        });
                    }
                    
                    // Show success message
                    signupForm.innerHTML = `
                        <div class="signup-success">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Thank You for Signing Up!</h3>
                            <p>Your 14-day free trial has been activated. Check your email for login instructions and next steps.</p>
                            <div class="next-steps">
                                <p><strong>Next Steps:</strong></p>
                                <ol>
                                    <li>Check your email for login details</li>
                                    <li>Set up your first chatbot using our templates</li>
                                    <li>Add the chatbot to your website</li>
                                </ol>
                            </div>
                            <a href="index.html" class="btn btn-secondary">Return to Homepage</a>
                        </div>
                    `;
                }, 2000);
            }
        });
    }
    
    // Form validation function
    function validateForm(data) {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        
        // Reset previous error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate email
        if (!emailRegex.test(data.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate website URL
        if (!urlRegex.test(data.website)) {
            showError('website', 'Please enter a valid website URL (including http:// or https://)');
            isValid = false;
        }
        
        // Validate password (at least 8 characters with a number and special character)
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(data.password)) {
            showError('password', 'Password must be at least 8 characters with a number and special character');
            isValid = false;
        }
        
        // Validate terms checkbox
        if (!data.terms) {
            showError('terms', 'You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        // Validate plan selection
        if (!data.plan) {
            showError('plan', 'Please select a plan');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper function to show error messages
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }
    
    // Helper function to get UTM source from URL
    function getUtmSource() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('utm_source') || 'direct';
    }
});
