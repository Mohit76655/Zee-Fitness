import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Apple } from 'lucide-react';

interface HomePageProps {
  onSelection: (type: 'diet' | 'workout') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelection }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transform Your
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {" "}Body
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Get personalized plans designed by professional trainers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
            What do you want?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.button
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelection('diet')}
            className="group bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-white/20 p-6 rounded-full group-hover:bg-white/30 transition-all duration-300">
                <Apple size={64} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Diet Plan</h3>
              <p className="text-green-100 text-lg">
                Personalized nutrition plans tailored to your goals
              </p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelection('workout')}
            className="group bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-white/20 p-6 rounded-full group-hover:bg-white/30 transition-all duration-300">
                <Dumbbell size={64} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Workout Plan</h3>
              <p className="text-blue-100 text-lg">
                Expert training programs designed for maximum results
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;