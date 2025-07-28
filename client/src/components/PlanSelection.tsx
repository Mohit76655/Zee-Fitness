import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PlanCard } from '../types';

interface PlanSelectionProps {
  type: 'diet' | 'workout';
  onPlanSelect: (planId: string) => void;
  onBack: () => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ type, onPlanSelect, onBack }) => {
  const dietPlans: PlanCard[] = [
    {
      id: 'veg',
      name: 'Veg Diet Plan',
      price: 1999,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Plant-based nutrition for optimal health'
    },
    {
      id: 'non-veg',
      name: 'Non-Veg Diet Plan',
      price: 1999,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Protein-rich meals with lean meats'
    },
    {
      id: 'vegan',
      name: 'Vegan Plan',
      price: 1999,
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Complete plant-based nutrition'
    },
    {
      id: 'custom',
      name: 'Custom Plan',
      price: 3999,
      image: 'https://images.pexels.com/photos/1332313/pexels-photo-1332313.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Fully personalized meal planning'
    }
  ];

  const workoutPlans: PlanCard[] = [
    {
      id: 'push-pull-legs',
      name: 'Push Pull Legs',
      price: 1999,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Efficient 6-day split routine'
    },
    {
      id: 'bro-split',
      name: 'Bro Split',
      price: 1999,
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Traditional bodybuilding approach'
    },
    {
      id: 'full-body',
      name: 'Full Body',
      price: 1999,
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Complete workout in every session'
    },
    {
      id: 'custom',
      name: 'Custom Plan',
      price: 3999,
      image: 'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Tailored specifically for you'
    }
  ];

  const plans = type === 'diet' ? dietPlans : workoutPlans;
  const gradientClass = type === 'diet' 
    ? 'from-green-600 to-emerald-700' 
    : 'from-blue-600 to-indigo-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your {type === 'diet' ? 'Diet' : 'Workout'} Plan
          </h1>
          <p className="text-xl text-gray-300">
            Select the plan that best fits your lifestyle and goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
              onClick={() => onPlanSelect(plan.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-20`} />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-400">
                    ₹{plan.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 bg-gradient-to-r ${gradientClass} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200`}
                  >
                    Select
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
