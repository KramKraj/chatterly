# Chatterly Website Integration Documentation

## Overview
This document provides detailed information on how to interface with customers through the Chatterly platform and how to set up the necessary backend integrations.

## Customer Onboarding Process

### 1. Initial Customer Signup
When a customer signs up for a trial through the website:
- Their information is captured via the trial signup form
- The data is sent to HubSpot CRM for lead tracking
- An automated welcome email is sent with login credentials
- A Chatterly account is provisionally created

### 2. Bot Customization Process
To customize a chatbot for a new customer:

#### Option 1: Self-Service (Starter Plan)
- Customer logs into their Chatterly dashboard
- Uses the template library to select an industry-specific starting point
- Customizes bot responses through the visual conversation builder
- Uploads their company logo and brand colors
- Tests the bot in the sandbox environment
- Deploys to their website using the provided JavaScript snippet

#### Option 2: Assisted Setup (Pro & Enterprise Plans)
- Schedule an onboarding call with a Chatterly specialist
- The specialist conducts a needs assessment interview
- Customer provides brand assets and key information
- Chatterly team builds a custom bot based on requirements
- Customer reviews and approves the bot
- Chatterly team assists with deployment and integration

### 3. Ongoing Management
- Customers can make changes through their dashboard
- Pro & Enterprise customers receive regular optimization reports
- Support tickets can be submitted through the dashboard
- Training sessions are available for team members

## Backend Integration Setup

### HubSpot CRM Integration

1. **Setup Instructions**:
   - Log in to your HubSpot account
   - Navigate to Settings > Integrations > API Key
   - Generate a new API key
   - Replace `YOUR_HUBSPOT_ID` and `YOUR_HUBSPOT_API_KEY` in `hubspot-integration.js`
   - Create the following forms in HubSpot:
     - Contact form
     - Trial signup form
     - Newsletter subscription form
   - Replace the form IDs in the integration code

2. **Data Flow**:
   - Website forms → HubSpot CRM
   - Lead information is stored in HubSpot contacts
   - Trial signups create deals in the sales pipeline
   - Email marketing is managed through HubSpot campaigns

### Stripe Payment Processing

1. **Setup Instructions**:
   - Create a Stripe account at stripe.com
   - Navigate to Developers > API Keys
   - Copy your publishable key
   - Replace `REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY` in `stripe-integration.js`
   - Set up the following products and price points in Stripe:
     - Starter Plan (monthly & annual)
     - Pro Plan (monthly & annual)
     - Enterprise Plan (monthly & annual)

2. **Payment Flow**:
   - Customer selects a plan on the pricing page
   - Enters payment information
   - Card is validated and charged through Stripe
   - Subscription is created in Stripe
   - Customer receives confirmation email
   - Account is upgraded from trial to paid

### Email Platform Integration

1. **HubSpot Email (Recommended)**:
   - Already included with HubSpot CRM integration
   - Create email templates in HubSpot Marketing > Email
   - Set up workflows for automated emails
   - Connect forms to email workflows

2. **Alternative: Gmail Integration**:
   - Create a dedicated Gmail account for Chatterly communications
   - Set up Gmail API credentials
   - Implement the Gmail API in your backend
   - Create email templates for different notification types
   - Set up forwarding rules to route important emails to team members

3. **Email Types to Configure**:
   - Welcome emails for new trial users
   - Payment confirmations
   - Contact form notifications
   - Newsletter subscriptions
   - Support ticket notifications
   - Weekly usage reports

## Viewing Customer Data

All customer data can be accessed through:

1. **HubSpot CRM**:
   - Contact records contain all customer information
   - Deals show subscription status and value
   - Timeline shows all interactions with the customer
   - Reports provide overview of customer acquisition and retention

2. **Chatterly Admin Dashboard**:
   - Log in at admin.chatterly.com (to be implemented)
   - View all customer accounts
   - Monitor usage statistics
   - Access conversation logs
   - Generate performance reports

3. **Stripe Dashboard**:
   - View all transactions and subscriptions
   - Monitor recurring revenue
   - Handle refunds or subscription changes
   - Access financial reports

## Next Steps for Implementation

1. Replace all placeholder API keys and IDs with your actual credentials
2. Test the integrations in a staging environment
3. Set up the recommended email templates
4. Configure the customer onboarding workflow
5. Train your team on the admin interfaces
6. Launch your fully integrated Chatterly website

For additional assistance with implementation, please contact the Chatterly support team.
