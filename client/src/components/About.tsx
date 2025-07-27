import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Health First',
      description: 'We prioritize your health and well-being above everything else.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Customized plans designed to help you achieve your specific fitness goals.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a supportive community of fitness enthusiasts on their journey.',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Professional trainers and nutritionists guide you every step of the way.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          About Zee Fitness
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your life with personalized fitness and nutrition plans designed to help you achieve your goals and maintain a healthy lifestyle.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
          At Zee Fitness, we believe that everyone deserves access to professional-grade fitness and nutrition guidance. 
          Our mission is to make healthy living accessible, enjoyable, and sustainable for people of all fitness levels. 
          We combine cutting-edge technology with proven methodologies to create personalized experiences that deliver real results.
        </p>
      </motion.div>
    </div>
  );
};

export default About;