export interface User {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
}

export interface Goal {
  fatLoss: boolean;
  muscleGain: boolean;
  maintenance: boolean;
  improveEnergy: boolean;
  getToned: boolean;
}

export interface DietFormData extends User {
  planType: 'veg' | 'non-veg' | 'vegan' | 'custom';
  wheyPreference: 'with' | 'without';
  goals: Goal;
  dietPreferences: string;
  mealsPerDay: 3 | 4 | 5 | 6;
  preworkoutMeals: boolean;
  postworkoutMeals: boolean;
  supplements: {
    used: boolean;
    types: string[];
  };
  wakeupTime: string;
  sleepTime: string;
  budget?: number;
}

export interface WorkoutFormData extends User {
  planType: 'push-pull-legs' | 'bro-split' | 'full-body' | 'custom';
  goals: Goal;
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'athlete';
}

export interface PlanCard {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}