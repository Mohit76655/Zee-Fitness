import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { WorkoutFormData } from '../types';
import { workoutFormSchema } from '../utils/validation';

interface WorkoutFormProps {
  planId: string;
  onBack: () => void;
  onSubmit: (data: WorkoutFormData) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ planId, onBack, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutFormSchema),
    mode: 'onChange',
    defaultValues: {
      planType: planId as any,
      goals: {
        fatLoss: false,
        muscleGain: false,
        maintenance: false,
        improveEnergy: false,
        getToned: false,
      },
    }
  });

  const onFormSubmit = (data: WorkoutFormData) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-4xl mx-auto">
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Workout Plan Details
          </h1>
          <p className="text-xl text-gray-300">
            Tell us about yourself to create your perfect workout plan
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onFormSubmit)}
          className="bg-gray-800 rounded-2xl p-8 shadow-2xl"
        >
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Name *</label>
                <input
                  {...register('name')}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Age *</label>
                <input
                  {...register('age', { valueAsNumber: true })}
                  type="number"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your age"
                />
                {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Gender *</label>
                <select
                  {...register('gender')}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Height (cm) *</label>
                <input
                  {...register('height', { valueAsNumber: true })}
                  type="number"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Height in cm"
                />
                {errors.height && <p className="text-red-400 text-sm mt-1">{errors.height.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Weight (kg) *</label>
                <input
                  {...register('weight', { valueAsNumber: true })}
                  type="number"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Weight in kg"
                />
                {errors.weight && <p className="text-red-400 text-sm mt-1">{errors.weight.message}</p>}
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Goals (Select all that apply) *</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { key: 'fatLoss', label: 'Fat Loss' },
                { key: 'muscleGain', label: 'Muscle Gain' },
                { key: 'maintenance', label: 'Maintenance' },
                { key: 'improveEnergy', label: 'Improve Energy' },
                { key: 'getToned', label: 'Get Toned' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    {...register(`goals.${key as keyof WorkoutFormData['goals']}`)}
                    type="checkbox"
                    className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.goals && <p className="text-red-400 text-sm mt-1">{errors.goals.message}</p>}
          </div>

          {/* Activity Level */}
          <div className="mb-8">
            <label className="block text-white mb-2">Activity Level *</label>
            <select
              {...register('activityLevel')}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary (Little to no exercise)</option>
              <option value="lightly-active">Lightly Active (Light exercise 1-3 days/week)</option>
              <option value="moderately-active">Moderately Active (Moderate exercise 3-5 days/week)</option>
              <option value="very-active">Very Active (Hard exercise 6-7 days/week)</option>
              <option value="athlete">Athlete (Very hard exercise, physical job)</option>
            </select>
            {errors.activityLevel && <p className="text-red-400 text-sm mt-1">{errors.activityLevel.message}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={!isValid}
            whileHover={{ scale: isValid ? 1.02 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              isValid
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Purchase
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default WorkoutForm;