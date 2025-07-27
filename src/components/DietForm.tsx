import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { DietFormData } from '../types';
import { dietFormSchema } from '../utils/validation';

interface DietFormProps {
  planId: string;
  onBack: () => void;
  onSubmit: (data: DietFormData) => void;
}

const DietForm: React.FC<DietFormProps> = ({ planId, onBack, onSubmit }) => {
  const [wheyPreference, setWheyPreference] = useState<'with' | 'without'>('without');
  const [showWheyFilter, setShowWheyFilter] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm<DietFormData>({
    resolver: zodResolver(dietFormSchema),
    mode: 'onChange',
    defaultValues: {
      planType: planId as any,
      wheyPreference: 'without',
      goals: {
        fatLoss: false,
        muscleGain: false,
        maintenance: false,
        improveEnergy: false,
        getToned: false,
      },
      supplements: {
        used: false,
        types: [],
      },
      preworkoutMeals: false,
      postworkoutMeals: false,
    }
  });

  const supplementsUsed = watch('supplements.used');

  const handleWheySelection = (preference: 'with' | 'without') => {
    setWheyPreference(preference);
    setValue('wheyPreference', preference);
    setShowWheyFilter(false);
  };

  const onFormSubmit = (data: DietFormData) => {
    onSubmit(data);
  };

  if (showWheyFilter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Whey Preference
            </h2>
            <p className="text-xl text-gray-300">
              Would you like your diet plan to include whey protein?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWheySelection('with')}
              className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">With Whey</h3>
              <p className="text-green-100">Include whey protein supplements</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWheySelection('without')}
              className="bg-gradient-to-br from-orange-600 to-red-700 p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Without Whey</h3>
              <p className="text-orange-100">Natural protein sources only</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

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
            Diet Plan Details
          </h1>
          <p className="text-xl text-gray-300">
            Tell us about yourself to create your perfect diet plan
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
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Age *</label>
                <input
                  {...register('age', { valueAsNumber: true })}
                  type="number"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your age"
                />
                {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Gender *</label>
                <select
                  {...register('gender')}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
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
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Height in cm"
                />
                {errors.height && <p className="text-red-400 text-sm mt-1">{errors.height.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Weight (kg) *</label>
                <input
                  {...register('weight', { valueAsNumber: true })}
                  type="number"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
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
                    {...register(`goals.${key as keyof DietFormData['goals']}`)}
                    type="checkbox"
                    className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.goals && <p className="text-red-400 text-sm mt-1">{errors.goals.message}</p>}
          </div>

          {/* Diet Preferences */}
          <div className="mb-8">
            <label className="block text-white mb-2">Diet Preferences & Restrictions *</label>
            <textarea
              {...register('dietPreferences')}
              rows={4}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Tell us about your food preferences, allergies, dislikes, etc."
            />
            {errors.dietPreferences && <p className="text-red-400 text-sm mt-1">{errors.dietPreferences.message}</p>}
          </div>

          {/* Meals and Timing */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-white mb-2">Meals per Day *</label>
              <select
                {...register('mealsPerDay', { valueAsNumber: true })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Select meals per day</option>
                <option value={3}>3 meals</option>
                <option value={4}>4 meals</option>
                <option value={5}>5 meals</option>
                <option value={6}>6 meals</option>
              </select>
              {errors.mealsPerDay && <p className="text-red-400 text-sm mt-1">{errors.mealsPerDay.message}</p>}
            </div>

            <div>
              <label className="block text-white mb-2">Wake-up Time *</label>
              <input
                {...register('wakeupTime')}
                type="time"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.wakeupTime && <p className="text-red-400 text-sm mt-1">{errors.wakeupTime.message}</p>}
            </div>

            <div>
              <label className="block text-white mb-2">Sleep Time *</label>
              <input
                {...register('sleepTime')}
                type="time"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.sleepTime && <p className="text-red-400 text-sm mt-1">{errors.sleepTime.message}</p>}
            </div>

            <div>
              <label className="block text-white mb-2">Budget (Optional)</label>
              <input
                {...register('budget', { valueAsNumber: true })}
                type="number"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Monthly budget in ₹"
              />
            </div>
          </div>

          {/* Workout Meals */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Workout Meals</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Pre-workout meals?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      {...register('preworkoutMeals')}
                      type="radio"
                      value="true"
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 focus:ring-orange-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      {...register('preworkoutMeals')}
                      type="radio"
                      value="false"
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 focus:ring-orange-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Post-workout meals?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      {...register('postworkoutMeals')}
                      type="radio"
                      value="true"
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 focus:ring-orange-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      {...register('postworkoutMeals')}
                      type="radio"
                      value="false"
                      className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 focus:ring-orange-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Supplements */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Supplements</h3>
            <div className="mb-4">
              <label className="block text-white mb-2">Do you use supplements?</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    {...register('supplements.used')}
                    type="radio"
                    value="true"
                    className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 focus:ring-orange-500"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    {...register('supplements.used')}
                    type="radio"
                    value="false"
                    className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 focus:ring-orange-500"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {supplementsUsed && (
              <div className="grid md:grid-cols-3 gap-4">
                {['Whey Protein', 'Creatine', 'BCAA', 'Pre-workout', 'Mass Gainer', 'Other'].map((supplement) => (
                  <label key={supplement} className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      {...register('supplements.types')}
                      type="checkbox"
                      value={supplement}
                      className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    <span>{supplement}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={!isValid}
            whileHover={{ scale: isValid ? 1.02 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              isValid
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/25'
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

export default DietForm;