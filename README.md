# FitPro Trainer - E-commerce Website

A comprehensive e-commerce website for a gym trainer offering personalized diet and workout plans with seamless payment integration.

## Features

- **Multi-step Purchase Flow**: Smooth transitions between homepage filter, plan selection, form filling, and purchase
- **Diet Plan Flow**: 4 plan options with whey preference filter and comprehensive form
- **Workout Plan Flow**: 4 plan options with activity level assessment
- **Payment System**: QR code integration for UPI payments and Telegram contact
- **Firebase Integration**: Firestore database for order storage
- **Responsive Design**: Mobile-first approach with modern animations
- **Form Validation**: Comprehensive validation using React Hook Form and Zod

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Database**: Firebase Firestore
- **QR Codes**: qrcode library
- **Build Tool**: Vite

## Setup Instructions

### 1. Environment Setup

First, you'll need to set up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Get your Firebase configuration from Project Settings

### 2. Firebase Configuration

Update `src/firebase/config.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Payment Configuration

Update the payment details in `src/components/Purchase.tsx`:

```typescript
const upiId = 'your-upi-id@paytm'; // Replace with your UPI ID
const phoneNumber = '+919876543210'; // Replace with your WhatsApp/Telegram number
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── HomePage.tsx          # Landing page with type selection
│   ├── PlanSelection.tsx     # Plan cards with pricing
│   ├── DietForm.tsx          # Diet plan form with whey filter
│   ├── WorkoutForm.tsx       # Workout plan form
│   ├── Purchase.tsx          # Purchase flow with T&C and QR codes
│   └── QRDisplay.tsx         # QR code generation component
├── firebase/
│   └── config.ts             # Firebase configuration
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── validation.ts         # Form validation schemas
├── App.tsx                   # Main app with routing logic
└── main.tsx                  # App entry point
```

## Features in Detail

### Multi-step Flow
1. **Homepage**: Diet vs Workout selection with animated cards
2. **Plan Selection**: 4 plans each with images, prices, and hover effects
3. **Form**: Comprehensive data collection with validation
4. **Purchase**: Terms & Conditions, dual QR codes, step-by-step instructions

### Diet Plan Features
- Veg/Non-veg/Vegan/Custom options
- With/Without whey secondary filter
- Detailed form: goals, preferences, meal timing, supplements
- Price range: ₹999 - ₹1999

### Workout Plan Features
- Push-Pull-Legs/Bro Split/Full Body/Custom options
- Activity level assessment
- Goals selection and basic information
- Price range: ₹999 - ₹2499

### Payment Integration
- UPI QR code for payments
- Telegram QR code for communication
- Clear step-by-step instructions
- Order tracking in Firebase

## Customization

### Adding New Plans
Update the `dietPlans` or `workoutPlans` arrays in `PlanSelection.tsx`:

```typescript
const newPlan: PlanCard = {
  id: 'new-plan',
  name: 'New Plan Name',
  price: 1599,
  image: 'https://your-image-url.jpg',
  description: 'Plan description'
};
```

### Modifying Forms
Forms use React Hook Form with Zod validation. Update schemas in `utils/validation.ts` and form components accordingly.

### Styling Customization
The app uses Tailwind CSS with a dark theme and orange/blue accent colors. Modify the color scheme in component files or extend the Tailwind config.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables if needed

## Security Considerations

- Firebase security rules should be configured properly
- UPI ID and contact information should be verified
- Consider implementing rate limiting for form submissions
- Add CAPTCHA for production use

## Support

For any issues or customization requests, please refer to the documentation or contact support.