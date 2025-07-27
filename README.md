# Nutrition & Fitness Plan Application

A comprehensive nutrition and fitness application that allows users to create personalized diet and workout plans with seamless payment integration.

## Features

- **Multi-step Form Interface**: Guided user experience for plan selection and customization
- **Personalized Plans**: Diet and workout plans tailored to user preferences and goals
- **Payment Integration**: UPI and QR code payment options
- **Firebase Integration**: Real-time data storage with localStorage fallback
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion animations

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations
- React Hook Form with Zod validation

### Backend
- Express.js with TypeScript
- Drizzle ORM with PostgreSQL
- Firebase Firestore for data storage

### Deployment
- Vercel for hosting
- Environment-based configuration

## Setup Instructions

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd <project-name>
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your config from Project Settings > General > Your apps
5. Update the `.env` file with your credentials

### 4. Development
```bash
npm run dev
```

### 5. Build and Deploy
```bash
npm run build
```

## Firebase Setup Guide

### Step 1: Create Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "nutrition-app")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Firestore
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select a location close to your users
5. Click "Done"

### Step 3: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>)
4. Register your app with a name
5. Copy the firebaseConfig object values

### Step 4: Update Environment Variables
Replace the values in your `.env` file with the ones from Firebase.

## Deployment to Vercel

### Step 1: Prepare for GitHub
1. Initialize git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Create GitHub repository
5. Push: `git remote add origin <your-repo-url> && git push -u origin main`

### Step 2: Deploy to Vercel
1. Visit [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

## Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── firebase/       # Firebase configuration
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
├── server/                 # Backend Express app
├── shared/                 # Shared types and schemas
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies and scripts
```

## License

MIT License