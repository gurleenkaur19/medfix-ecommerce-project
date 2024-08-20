# MedFix

MedFix is a web application designed to provide an online platform for purchasing medical supplies. The application includes both client and admin views, offering a seamless experience for users to browse, purchase, and manage medical products.

## Project Overview

MedFix aims to provide a user-friendly platform for buying medical supplies. It includes functionalities for user authentication, product browsing, cart management, and order processing. The application has a dedicated admin section for managing products, orders, and users.

## Features

- **User Authentication**: Login and registration system for clients and admins.
- **Product Browsing**: Users can browse through a variety of medical supplies.
- **Shopping Cart**: Add and manage products in the shopping cart.
- **Order Management**: Place orders and track them.
- **Admin Panel**: Admins can manage products, orders, and user data.
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop.

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone <url>
   cd medfix
   ```

2. **Install dependencies:**

   ```bash
    npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
    TOKEN_SECRET=<your_token_secret>
    MONGODB_URI=<your_mongodb_uri>
    STRIPE_SECRET_KEY=<your_jwt_secret>
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
    REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
    REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
    REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
    REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
    REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>
    REACT_APP_FIREBASE_STORAGE_URL=<your_firebase_storage_url>
   ```

4. **Run the application:**

   ```
    npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Running the App

- **Development**: `npm run dev`
- **Production**: `npm run build` and then `npm start`

### Important Routes

- `/login`: User login page
- `/register`: User registration page
- `/admin`: Admin dashboard
- `/products`: Browse products
- `/cart`: Shopping cart

### Client Layout Structure

- The `NavBar` and `Footer` components are only displayed on non-authentication pages.
- Authentication pages (`/login`, `/register`, `/adminRegister`) have a simplified layout without the navigation and footer elements.
