# Loan Application Frontend

This is the frontend for the Loan Application system built with Vue.js. It allows users to apply for loans, view their loan history, and manage authentication using Firebase.

## 🚀 Project Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Vue CLI](https://cli.vuejs.org/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/loan-app-frontend.git
   cd loan-app-test
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project
To start the development server, run:
```sh
npm run serve
```
The application will be available at `http://localhost:8080/`.

## 🔧 Environment Variables
Create a `.env` file in the root directory and add the following variables:
```ini
VITE_APP_API_BASE_URL=https://your-api-url.com
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```
Make sure to replace the values with your Firebase project credentials.

## ✅ Features
- 🔐 User authentication with Firebase
- 📝 Loan application form
- 📊 Loan history displayed as a table
- ⚡ Dynamic navbar with page-specific links
- ⏳ Loading spinner for API requests

## 📌 Additional Notes
- The project uses **Tailwind CSS** for styling.
- Firebase Authentication is required for user login.
- Make sure to configure **CORS** on the backend if accessing from a different origin.
