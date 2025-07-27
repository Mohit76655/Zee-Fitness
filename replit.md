# replit.md

## Overview

This is a full-stack React application with an Express.js backend that provides personalized diet and workout plans for users. The application features a multi-step form interface where users can select plan types, fill out detailed forms about their goals and preferences, and complete purchases. The system is designed to collect user data and store orders for processing by professional trainers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animation**: Framer Motion for smooth page transitions and interactions
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React useState hooks for local component state
- **Data Fetching**: TanStack React Query (installed but not actively used)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL sessions using connect-pg-simple
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Development**: Hot reloading with Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for production)
- **Development Storage**: In-memory storage class for development/testing
- **External Storage**: Firebase Firestore for order storage
- **Session Storage**: PostgreSQL-backed sessions

## Key Components

### Frontend Components
1. **HomePage**: Landing page with diet/workout selection
2. **PlanSelection**: Displays available plans with pricing
3. **DietForm**: Comprehensive form for diet plan customization
4. **WorkoutForm**: Form for workout plan preferences
5. **Purchase**: Order summary and payment interface
6. **QRDisplay**: QR code generation for payment processing

### Backend Components
1. **Storage Interface**: Abstracted CRUD operations for user management
2. **Route Registration**: Centralized API route management
3. **Vite Integration**: Development server with HMR support

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Extensible Design**: Schema prepared for additional tables as needed

## Data Flow

1. **User Journey**: Home → Plan Selection → Form Completion → Purchase
2. **Form Validation**: Client-side validation using Zod schemas
3. **Data Submission**: Form data collected and stored in Firebase Firestore
4. **State Management**: Component-level state passed down through props
5. **API Integration**: Express routes ready for CRUD operations

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Form Management**: React Hook Form with Zod resolvers
- **Animation**: Framer Motion for UI transitions
- **QR Codes**: qrcode library for payment QR generation
- **Date Handling**: date-fns for time formatting

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL driver
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, esbuild for production builds

### External Services
- **Firebase**: Firestore for order data storage
- **Neon Database**: PostgreSQL hosting service
- **Replit**: Development environment integration

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express API
- **Hot Reloading**: Integrated Vite middleware for frontend changes
- **Database**: In-memory storage for rapid development
- **Environment**: Replit-optimized with runtime error overlays

### Production
- **Build Process**: Vite build for frontend, esbuild for backend
- **Database**: PostgreSQL with Drizzle migrations
- **Static Assets**: Served from dist/public directory
- **Environment Variables**: DATABASE_URL required for production database connection

### Architecture Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared directories for easier development and deployment
2. **TypeScript Throughout**: End-to-end type safety from database to frontend
3. **Drizzle ORM**: Chosen for type-safe database operations and automatic migrations
4. **Dual Storage Strategy**: In-memory for development, PostgreSQL for production with interface abstraction
5. **Component-based UI**: Modular React components with consistent styling via Tailwind and shadcn/ui
6. **Form-centric Design**: Heavy emphasis on data collection through validated forms
7. **External Order Storage**: Firebase Firestore used for order persistence separate from main database