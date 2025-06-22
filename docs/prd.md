# Product Requirements Document (PRD)

## Product Name: Learaid

**Version:** 1.0

**Owner:** Monti

---

## Overview

Learaid is a diagram-generation GPT application designed to convert user prompts into flowcharts and visual diagrams. 
The app provides a seamless, intuitive experience for users who need quick and visually appealing diagrams based on their textual input. 
Learaid leverages modern web technologies and AI tools to deliver its core functionality.

---

## Goals and Objectives

1. **Core Objective:** Simplify the creation of diagrams by allowing users to generate them from textual prompts.
2. **User-Friendly Experience:** Maintain a minimalistic and clean interface similar to ChatGPT.
3. **Monetization:** Enable users to purchase token-based credits to use the app.
4. **Scalability:** Use cutting-edge technologies to ensure high availability and responsiveness.

---

## Features

### Core Features

1. **Homepage**

   * Input box for writing prompts.
   * Sample prompt suggestions displayed below the input box to guide new users.
   * Clear and minimalist design to encourage focus on the input action.

2. **Diagram Page**

   * Each prompt routes to a new diagram window.
   * Diagram window consists of:

     * **Chat Box:** Users can input, edit, and refine their prompts.
     * **Excalidraw Window:** Displays the generated diagram in an interactive format.
   * The flow:
     1. User inputs a prompt.
     2. AI processes the prompt and generates a **MermaidJS** output.
     3. **MermaidJS** output is converted to an **Excalidraw** diagram for display.

3. **Token System**
   * Users purchase tokens to use the service.
   * Pricing: $10 = 500,000 tokens.
   * Payment integration via Stripe.
   * Once the token are exhausted user cannot use the ai features.

### Additional Features

* **User Authentication:**

  * Implemented using Better Auth SDK and Supabase provider for secure and reliable user management.
  * Includes registration, login, and account management.

* **Excali draw MermaidJS Adapter:**
  * Converts MermaidJS output into a format usable by Excalidraw.

* **Sample Diagrams:**
  * Offer pre-generated diagrams for users to explore the app’s capabilities.

---

## User Flow

1. **Homepage**:

   * User lands on the homepage.
   * Enters a prompt into the input box.
   * Clicks “Generate” to proceed.

2. **Diagram Page**:

   * A new page opens with the Excalidraw interface.
   * The user’s prompt is processed, and the diagram is displayed.
   * User can refine the prompt and regenerate the diagram if needed.

3. **Token Purchase**:

   * Users can access a “Buy Tokens” page.
   * Use Stripe integration to purchase tokens.

---

## Technology Stack

1. **Frontend**: Next.js
2. **Authentication**: Better Auth With Supabase Provider
3. **UI Library**: ShadCN
4. **AI Integration**: Vercel AI SDK
5. **Payment Gateway**: Stripe

---

## Non-Functional Requirements

1. **Performance**:

   * Response time for generating diagrams should be under 2 seconds.
   * Handle concurrent requests effectively.

2. **Security**:

   * Secure user data through Supabase.
   * Protect payment transactions using Stripe’s secure API.

3. **Scalability**:

   * Hosted on Vercel for high availability.

4. **Compliance**:

   * Ensure compliance with GDPR and other relevant data protection regulations.

---

## Success Metrics

1. Number of active users.
2. Conversion rate for token purchases.
3. Average diagram generation time.
4. User retention rate.

---

## Future Enhancements

1. **Template Library:** Provide pre-designed templates for common use cases.
2. **Collaboration Tools:** Enable multiple users to collaborate on diagrams in real-time.