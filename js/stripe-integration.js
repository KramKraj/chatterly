// Stripe integration for Chatterly
// Version: 1.0.0
// Author: Chatterly Development Team

// Stripe payment processing integration
(function() {
  // Stripe public key - replace with your actual Stripe publishable key
  const stripePublicKey = 'pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY';
  
  // Load Stripe.js
  function loadStripeJs() {
    if (window.Stripe) {
      initializeStripe();
      return;
    }
    
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/';
    stripeScript.onload = initializeStripe;
    document.head.appendChild(stripeScript);
  }
  
  // Initialize Stripe
  function initializeStripe() {
    // Initialize Stripe with your public key
    const stripe = Stripe(stripePublicKey);
    
    // Set up payment forms
    setupPaymentForms(stripe);
    
    // Set up subscription toggle if it exists
    setupSubscriptionToggle(stripe);
  }
  
  // Set up payment forms
  function setupPaymentForms(stripe) {
    const paymentForms = document.querySelectorAll('.stripe-payment-form');
    
    paymentForms.forEach(form => {
      // Create Stripe Elements
      const elements = stripe.elements();
      
      // Create card element
      const cardElement = elements.create('card', {
        style: {
          base: {
            color: '#32325d',
            fontFamily: '"Inter", sans-serif',
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
      const cardContainer = form.querySelector('.stripe-card-element');
      if (cardContainer) {
        cardElement.mount(cardContainer);
      }
      
      // Handle form submission
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const errorElement = form.querySelector('.stripe-error-message');
        
        // Disable submit button to prevent multiple submissions
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Processing...';
        }
        
        // Clear any previous error messages
        if (errorElement) {
          errorElement.textContent = '';
        }
        
        // Get plan details from form
        const planId = form.getAttribute('data-plan-id');
        const planName = form.getAttribute('data-plan-name');
        const planPrice = form.getAttribute('data-plan-price');
        const isAnnual = form.getAttribute('data-annual') === 'true';
        
        try {
          // Create payment method
          const result = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
              name: form.querySelector('input[name="name"]')?.value,
              email: form.querySelector('input[name="email"]')?.value
            }
          });
          
          if (result.error) {
            // Show error message
            if (errorElement) {
              errorElement.textContent = result.error.message;
            }
            
            // Re-enable submit button
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = 'Subscribe';
            }
          } else {
            // Send payment method ID to your server
            // In a real implementation, you would send this to your server to create a subscription
            console.log('Payment method created:', result.paymentMethod.id);
            console.log('Plan details:', { planId, planName, planPrice, isAnnual });
            
            // For demo purposes, simulate a successful payment
            // In production, you would handle the server response here
            setTimeout(() => {
              // Show success message
              form.innerHTML = `
                <div class="payment-success">
                  <i class="fas fa-check-circle"></i>
                  <h3>Payment Successful!</h3>
                  <p>Thank you for subscribing to the ${planName} plan. You will receive a confirmation email shortly.</p>
                </div>
              `;
              
              // Track successful payment in Google Analytics
              if (window.gtag) {
                gtag('event', 'purchase', {
                  transaction_id: 'T_' + Date.now(),
                  value: parseFloat(planPrice),
                  currency: 'USD',
                  items: [{
                    id: planId,
                    name: planName,
                    quantity: 1,
                    price: parseFloat(planPrice)
                  }]
                });
              }
              
              // Track successful payment in HubSpot
              if (window._hsq) {
                window._hsq.push(['trackEvent', {
                  id: 'purchase',
                  value: {
                    plan_id: planId,
                    plan_name: planName,
                    plan_price: parseFloat(planPrice),
                    is_annual: isAnnual
                  }
                }]);
              }
            }, 2000);
          }
        } catch (error) {
          console.error('Error:', error);
          
          // Show error message
          if (errorElement) {
            errorElement.textContent = 'An unexpected error occurred. Please try again.';
          }
          
          // Re-enable submit button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe';
          }
        }
      });
    });
  }
  
  // Set up subscription toggle
  function setupSubscriptionToggle(stripe) {
    const toggle = document.querySelector('.pricing-toggle');
    if (!toggle) return;
    
    const monthlyButton = toggle.querySelector('[data-period="monthly"]');
    const annualButton = toggle.querySelector('[data-period="annual"]');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (monthlyButton && annualButton) {
      // Handle monthly button click
      monthlyButton.addEventListener('click', () => {
        monthlyButton.classList.add('active');
        annualButton.classList.remove('active');
        
        // Update pricing display
        pricingCards.forEach(card => {
          const monthlyPrice = card.getAttribute('data-monthly-price');
          const priceElement = card.querySelector('.pricing-amount');
          
          if (priceElement && monthlyPrice) {
            priceElement.innerHTML = `$${monthlyPrice} <span class="pricing-period">/month</span>`;
          }
          
          // Update form data attribute
          const form = card.querySelector('.stripe-payment-form');
          if (form) {
            form.setAttribute('data-annual', 'false');
            form.setAttribute('data-plan-price', monthlyPrice);
          }
        });
      });
      
      // Handle annual button click
      annualButton.addEventListener('click', () => {
        annualButton.classList.add('active');
        monthlyButton.classList.remove('active');
        
        // Update pricing display
        pricingCards.forEach(card => {
          const annualPrice = card.getAttribute('data-annual-price');
          const priceElement = card.querySelector('.pricing-amount');
          
          if (priceElement && annualPrice) {
            priceElement.innerHTML = `$${annualPrice} <span class="pricing-period">/month</span>`;
          }
          
          // Update form data attribute
          const form = card.querySelector('.stripe-payment-form');
          if (form) {
            form.setAttribute('data-annual', 'true');
            form.setAttribute('data-plan-price', annualPrice);
          }
        });
      });
    }
  }
  
  // Initialize Stripe integration when DOM is ready
  document.addEventListener('DOMContentLoaded', loadStripeJs);
})();

// Stripe Customer Portal integration
// This would typically be handled on your server, but here's a client-side example
function openCustomerPortal(customerId) {
  // In a real implementation, you would send a request to your server
  // Your server would then create a portal session and return the URL
  console.log('Opening customer portal for customer:', customerId);
  
  // For demo purposes, simulate a redirect to the customer portal
  alert('In a production environment, you would be redirected to the Stripe Customer Portal.');
}

// Stripe Checkout integration
// This would typically be handled on your server, but here's a client-side example
function createCheckoutSession(priceId) {
  // In a real implementation, you would send a request to your server
  // Your server would then create a checkout session and return the ID
  console.log('Creating checkout session for price:', priceId);
  
  // For demo purposes, simulate a redirect to the checkout page
  alert('In a production environment, you would be redirected to the Stripe Checkout page.');
}
