// Stripe Integration for Chatterly

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe
    const initStripe = function() {
        // This would be replaced with actual Stripe publishable key in production
        const stripePublishableKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';
        
        // Check if Stripe is needed on this page
        if (document.querySelector('.stripe-payment-form') || 
            document.querySelector('.pricing-toggle') ||
            window.location.pathname.includes('trial-signup.html')) {
            
            // Load Stripe.js
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.async = true;
            document.head.appendChild(script);
            
            // Initialize Stripe after script loads
            script.onload = function() {
                window.stripe = Stripe(stripePublishableKey);
                
                // Initialize payment elements if present
                if (document.querySelector('.stripe-payment-form')) {
                    initPaymentElements();
                }
                
                // Initialize pricing toggle if present
                if (document.querySelector('.pricing-toggle')) {
                    initPricingToggle();
                }
            };
        }
    };
    
    // Initialize Stripe Elements for payment forms
    const initPaymentElements = function() {
        const elements = window.stripe.elements();
        
        // Create card element
        const cardElement = elements.create('card', {
            style: {
                base: {
                    color: '#32325d',
                    fontFamily: '"Inter", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            }
        });
        
        // Mount card element
        const cardElementMount = document.getElementById('card-element');
        if (cardElementMount) {
            cardElement.mount('#card-element');
            
            // Handle real-time validation errors
            cardElement.on('change', function(event) {
                const displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
            });
            
            // Handle form submission
            const form = document.querySelector('.stripe-payment-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Disable the submit button to prevent repeated clicks
                document.querySelector('#submit-payment').disabled = true;
                
                // Create payment method and confirm payment
                window.stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: document.getElementById('cardholder-name').value,
                        email: document.getElementById('cardholder-email').value
                    }
                }).then(function(result) {
                    if (result.error) {
                        // Show error to customer
                        const errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
                        document.querySelector('#submit-payment').disabled = false;
                    } else {
                        // Send payment method ID to server
                        stripePaymentMethodHandler(result.paymentMethod.id);
                    }
                });
            });
        }
    };
    
    // Handle the payment method ID
    const stripePaymentMethodHandler = function(paymentMethodId) {
        // This would send the payment method ID to your server
        console.log('Payment Method ID:', paymentMethodId);
        
        // In production, this would make an API call to your server
        // For demo purposes, we'll simulate a successful payment
        setTimeout(function() {
            // Show success message
            document.querySelector('.payment-form-container').style.display = 'none';
            document.querySelector('.payment-success').style.display = 'block';
            
            // Track conversion
            if (window.gtag) {
                gtag('event', 'payment_success', {
                    'event_category': 'conversion',
                    'event_label': 'Payment Success'
                });
            }
            
            // In a real implementation, this would also redirect to a success page
            // window.location.href = 'payment-success.html';
        }, 1000);
    };
    
    // Initialize pricing toggle functionality
    const initPricingToggle = function() {
        const pricingToggle = document.querySelector('.pricing-toggle');
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const annualPrices = document.querySelectorAll('.price-annual');
        const toggleCheckbox = document.querySelector('.pricing-toggle input[type="checkbox"]');
        
        if (pricingToggle && toggleCheckbox) {
            toggleCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Show annual prices
                    monthlyPrices.forEach(el => el.style.display = 'none');
                    annualPrices.forEach(el => el.style.display = 'block');
                    
                    // Track event
                    if (window.gtag) {
                        gtag('event', 'pricing_toggle', {
                            'event_category': 'engagement',
                            'event_label': 'Annual Pricing'
                        });
                    }
                } else {
                    // Show monthly prices
                    monthlyPrices.forEach(el => el.style.display = 'block');
                    annualPrices.forEach(el => el.style.display = 'none');
                    
                    // Track event
                    if (window.gtag) {
                        gtag('event', 'pricing_toggle', {
                            'event_category': 'engagement',
                            'event_label': 'Monthly Pricing'
                        });
                    }
                }
            });
        }
    };
    
    // Initialize
    initStripe();
});
