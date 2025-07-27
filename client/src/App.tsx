import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import PlanSelection from './components/PlanSelection';
import DietForm from './components/DietForm';
import WorkoutForm from './components/WorkoutForm';
import Purchase from './components/Purchase';
import { DietFormData, WorkoutFormData } from './types';

type Step = 'home' | 'plans' | 'form' | 'purchase' | 'about' | 'contact' | 'profile';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('home');
  const [selectedType, setSelectedType] = useState<'diet' | 'workout' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState<DietFormData | WorkoutFormData | null>(null);

  const handleTypeSelection = (type: 'diet' | 'workout') => {
    setSelectedType(type);
    setCurrentStep('plans');
  };

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: DietFormData | WorkoutFormData) => {
    setFormData(data);
    setCurrentStep('purchase');
  };

  const goBack = () => {
    switch (currentStep) {
      case 'plans':
        setCurrentStep('home');
        setSelectedType(null);
        break;
      case 'form':
        setCurrentStep('plans');
        setSelectedPlan(null);
        break;
      case 'purchase':
        setCurrentStep('form');
        setFormData(null);
        break;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const handleNavStepChange = (step: string) => {
    if (step === 'plans') {
      // Reset to home first, then user can select diet/workout
      setCurrentStep('home');
    } else if (['home', 'about', 'contact', 'profile'].includes(step)) {
      setCurrentStep(step as Step);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentStep={currentStep} onStepChange={handleNavStepChange} />
      <AnimatePresence mode="wait">
        {currentStep === 'home' && (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage onSelection={handleTypeSelection} />
          </motion.div>
        )}

        {currentStep === 'about' && (
          <motion.div
            key="about"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <About />
          </motion.div>
        )}

        {currentStep === 'contact' && (
          <motion.div
            key="contact"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Contact />
          </motion.div>
        )}

        {currentStep === 'profile' && (
          <motion.div
            key="profile"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Profile />
          </motion.div>
        )}

        {currentStep === 'plans' && selectedType && (
          <motion.div
            key="plans"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <PlanSelection
              type={selectedType}
              onPlanSelect={handlePlanSelection}
              onBack={goBack}
            />
          </motion.div>
        )}

        {currentStep === 'form' && selectedType && selectedPlan && (
          <motion.div
            key="form"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {selectedType === 'diet' ? (
              <DietForm
                planId={selectedPlan}
                onBack={goBack}
                onSubmit={handleFormSubmit}
              />
            ) : (
              <WorkoutForm
                planId={selectedPlan}
                onBack={goBack}
                onSubmit={handleFormSubmit}
              />
            )}
          </motion.div>
        )}

        {currentStep === 'purchase' && selectedType && formData && (
          <motion.div
            key="purchase"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Purchase
              type={selectedType}
              formData={formData}
              onBack={goBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;