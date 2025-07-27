import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(15).max(80),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().min(120).max(250),
  weight: z.number().min(30).max(200),
});

export const goalSchema = z.object({
  fatLoss: z.boolean(),
  muscleGain: z.boolean(),
  maintenance: z.boolean(),
  improveEnergy: z.boolean(),
  getToned: z.boolean(),
}).refine(data => Object.values(data).some(Boolean), {
  message: 'Please select at least one goal',
});

export const dietFormSchema = userSchema.extend({
  planType: z.enum(['veg', 'non-veg', 'vegan', 'custom']),
  wheyPreference: z.enum(['with', 'without']),
  goals: goalSchema,
  dietPreferences: z.string().min(10, 'Please provide more details about your diet preferences'),
  mealsPerDay: z.number().refine((val) => [3, 4, 5, 6].includes(val), {
    message: "Meals per day must be 3, 4, 5, or 6",
  }),
  preworkoutMeals: z.boolean(),
  postworkoutMeals: z.boolean(),
  supplements: z.object({
    used: z.boolean(),
    types: z.array(z.string()),
  }),
  wakeupTime: z.string().min(1, 'Wake-up time is required'),
  sleepTime: z.string().min(1, 'Sleep time is required'),
  budget: z.number().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export const workoutFormSchema = userSchema.extend({
  planType: z.enum(['push-pull-legs', 'bro-split', 'full-body', 'custom']),
  goals: goalSchema,
  activityLevel: z.enum(['sedentary', 'lightly-active', 'moderately-active', 'very-active', 'athlete']),
});