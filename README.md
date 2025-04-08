# Room.me Login Page

This project implements a login page for Room.me, an innovative video conference product. It features email/password login, a Google Sign-In option (currently not linked to actual Google credentials), and a rotating image slider showcasing testimonials.

## Features

* **Email and Password Login:** Allows users to log in using their email address and password.
* **Google Sign-In:** Provides a button for Google Sign-In (note: this is a UI element and is **not** currently integrated with actual Google authentication).
* **Rotating Image Slider:** Displays testimonials and information about Room.me with an automatic and manual navigation.
* **Basic Input Validation:** Includes client-side validation for empty fields and email format.
* **Placeholder Authentication:** Uses hardcoded credentials (`test@visionexdigital.com.au` / `password123`) for demonstration purposes.
* **Navigation:** Redirects to a `/dashboard` route upon successful (placeholder) login.
* **Responsive Design:** The layout adapts to different screen sizes.

## Technologies Used

* **Next.js:** A React framework for building server-rendered and statically generated web applications.
* **React:** A JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **`useAuthStore` (Conceptual):** This project assumes the existence of a custom React Hook or state management solution (`authStore`) for handling authentication state.

## Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/IsuriGunaratne/Room-me-login.git
    cd Room-me-login
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the Development Server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will start the Next.js development server, and you can view the application in your browser at `http://localhost:3000`.

## Important Note Regarding Google Sign-In

The **"Sign in with Google" button** present on this login page is currently a **UI element only**. It is not configured to interact with Google's OAuth 2.0 authentication services. Clicking this button will trigger the `handleGoogleSignIn` function, which currently only sets `window.location.href` to a placeholder URL (`'YOUR_GOOGLE_SIGN_IN_URL'`).

**To implement actual Google Sign-In functionality, you would need to:**

* Set up a Google Cloud Project and configure OAuth 2.0 client IDs.
* Integrate a Google Sign-In library or implement the OAuth 2.0 flow manually.
* Handle the Google Sign-In response, verify the user's ID token on your backend, and establish a session.

This implementation focuses on the visual representation of the login page.

## Placeholder Authentication

For demonstration purposes, the email and password login currently uses hardcoded credentials:

* **Email:** `test@visionexdigital.com.au`
* **Password:** `password123`

Any other email and password combination will result in an "Invalid credentials." error. In a real application, this would be replaced with secure authentication against a database or authentication provider.

