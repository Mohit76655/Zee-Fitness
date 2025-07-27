import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { db } from '../firebase/config';
import { DietFormData, WorkoutFormData } from '../types';
import QRDisplay from './QRDisplay';

interface PurchaseProps {
  type: 'diet' | 'workout';
  formData: DietFormData | WorkoutFormData;
  onBack: () => void;
}

const Purchase: React.FC<PurchaseProps> = ({ type, formData, onBack }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const planPrices = {
    diet: {
      veg: 999,
      'non-veg': 1299,
      vegan: 1199,
      custom: 1999,
    },
    workout: {
      'push-pull-legs': 1499,
      'bro-split': 1299,
      'full-body': 999,
      custom: 2499,
    }
  };

  const price = planPrices[type][formData.planType as keyof typeof planPrices[typeof type]];

  const handlePurchase = async () => {
    if (!acceptedTerms) return;

    setIsSubmitting(true);
    try {
      const order = {
        type,
        planType: formData.planType,
        price,
        userData: formData,
        timestamp: new Date(),
        status: 'pending'
      };

      // Try Firebase first, fallback to localStorage
      try {
        await addDoc(collection(db, 'orders'), order);
        console.log('Order saved to Firebase:', order);
      } catch (firebaseError) {
        console.warn('Firebase unavailable, saving to localStorage:', firebaseError);
        const localOrder = { ...order, orderId: Date.now().toString(), timestamp: order.timestamp.toISOString() };
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(localOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
      }
      
      setShowPayment(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const upiId = 'trainer@upi'; // Replace with actual UPI ID
  const phoneNumber = '+919876543210'; // Replace with actual phone number
  const upiLink = `upi://pay?pa=${upiId}&pn=Gym Trainer&am=${price}&cu=INR`;
  const telegramLink = `https://t.me/+${phoneNumber.replace('+', '')}`;

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-300">
              Complete your payment to receive your personalized plan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <QRDisplay
                value={upiLink}
                title="Payment QR"
                subtitle={`Pay ₹${price} via UPI`}
                className="h-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <QRDisplay
                value={telegramLink}
                title="Telegram Contact"
                subtitle="Send payment screenshot here"
                className="h-full"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Follow These Steps
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: 'Make Payment',
                  description: 'Scan the UPI QR code and complete payment',
                  icon: '💳'
                },
                {
                  step: 2,
                  title: 'Take Screenshot',
                  description: 'Screenshot your payment confirmation',
                  icon: '📸'
                },
                {
                  step: 3,
                  title: 'Send to Telegram',
                  description: 'Send screenshot via Telegram QR link',
                  icon: '📱'
                },
                {
                  step: 4,
                  title: 'Receive Plan',
                  description: 'Get your PDF plan within 24 hours',
                  icon: '📋'
                }
              ].map(({ step, title, description, icon }) => (
                <div key={step} className="text-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {step}
                  </div>
                  <div className="text-4xl mb-2">{icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
                  <p className="text-gray-400 text-sm">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
              <p className="text-yellow-400 text-center">
                <strong>Important:</strong> Your personalized {type} plan will be delivered within 24 hours after payment verification.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-2xl mx-auto">
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
            Complete Purchase
          </h1>
          <p className="text-xl text-gray-300">
            Review your order and complete the purchase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800 rounded-2xl p-8 shadow-2xl"
        >
          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Order Summary</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Plan Type:</span>
                <span className="text-white font-semibold capitalize">
                  {formData.planType.replace('-', ' ')} {type} Plan
                </span>
              </div>
              {type === 'diet' && 'wheyPreference' in formData && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Whey Preference:</span>
                  <span className="text-white font-semibold capitalize">
                    {formData.wheyPreference} Whey
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Total:</span>
                <span className="text-orange-400">₹{price}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <div className="bg-gray-700 rounded-lg p-6 mb-4">
              <h4 className="text-lg font-semibold text-white mb-4">Terms & Conditions</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>• Payment is required to receive your personalized plan</p>
                <p>• Plans will be delivered within 24-48 hours after payment verification</p>
                <p>• All plans are customized based on the information you provided</p>
                <p>• Plans are for personal use only and cannot be shared or resold</p>
                <p>• Refunds are available within 7 days if you're not satisfied</p>
                <p>• By purchasing, you agree to follow the plan as recommended</p>
              </div>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 mt-1"
              />
              <span className="text-white">
                I have read and agree to the Terms & Conditions *
              </span>
            </label>
          </div>

          <motion.button
            onClick={handlePurchase}
            disabled={!acceptedTerms || isSubmitting}
            whileHover={{ scale: acceptedTerms && !isSubmitting ? 1.02 : 1 }}
            whileTap={{ scale: acceptedTerms && !isSubmitting ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              acceptedTerms && !isSubmitting
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/25'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Processing...' : `Purchase Plan - ₹${price}`}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Purchase;