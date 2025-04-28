
export interface UserData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightlyActive' | 'moderatelyActive' | 'veryActive' | 'extraActive';
  goal: 'loseWeight' | 'maintainWeight' | 'gainWeight';
  medicalConditions?: string[];
}

export interface MetricsData {
  bp: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  glucose: number;
  cholesterol: {
    total: number;
    hdl: number;
    ldl: number;
  };
}

export interface DietRecommendation {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: {
    name: string;
    foods: string[];
  }[];
  restrictions: string[];
  recommendations: string[];
}

export function calculateBMI(height: number, weight: number): number {
  // Height in meters (converted from cm)
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function getBMICategory(bmi: number): {
  category: string;
  description: string;
  color: string;
} {
  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      description: 'BMI less than 18.5',
      color: 'text-health-sky-blue',
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      category: 'Normal',
      description: 'BMI between 18.5 and 24.9',
      color: 'text-health-soft-green',
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      category: 'Overweight',
      description: 'BMI between 25 and 29.9',
      color: 'text-health-orange',
    };
  } else {
    return {
      category: 'Obese',
      description: 'BMI of 30 or greater',
      color: 'text-destructive',
    };
  }
}

export function calculateBMR(userData: UserData): number {
  const { gender, weight, height, age } = userData;
  
  // Using Mifflin-St Jeor Equation
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const activityFactors: Record<string, number> = {
    sedentary: 1.2, // Little or no exercise
    lightlyActive: 1.375, // Light exercise 1-3 days a week
    moderatelyActive: 1.55, // Moderate exercise 3-5 days a week
    veryActive: 1.725, // Hard exercise 6-7 days a week
    extraActive: 1.9, // Very hard exercise, physical job or training twice a day
  };
  
  return Math.round(bmr * activityFactors[activityLevel]);
}

export function calculateDailyCalories(userData: UserData): number {
  const bmr = calculateBMR(userData);
  const tdee = calculateTDEE(bmr, userData.activityLevel);
  
  switch (userData.goal) {
    case 'loseWeight':
      return Math.round(tdee - 500); // 500 calorie deficit for weight loss
    case 'gainWeight':
      return Math.round(tdee + 500); // 500 calorie surplus for weight gain
    case 'maintainWeight':
    default:
      return tdee;
  }
}

export function analyzeBP(systolic: number, diastolic: number): {
  category: string;
  description: string;
  color: string;
} {
  if (systolic < 120 && diastolic < 80) {
    return {
      category: 'Normal',
      description: 'Blood pressure in the normal range',
      color: 'text-health-soft-green',
    };
  } else if ((systolic >= 120 && systolic <= 129) && diastolic < 80) {
    return {
      category: 'Elevated',
      description: 'Blood pressure slightly above normal',
      color: 'text-health-sky-blue',
    };
  } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return {
      category: 'Hypertension Stage 1',
      description: 'Blood pressure higher than normal range',
      color: 'text-health-orange',
    };
  } else {
    return {
      category: 'Hypertension Stage 2+',
      description: 'Blood pressure well above normal range',
      color: 'text-destructive',
    };
  }
}

export function generateDietRecommendation(userData: UserData): DietRecommendation {
  const calories = calculateDailyCalories(userData);
  
  // Calculate macros based on goal
  let proteinRatio = 0.3; // 30% of calories from protein
  let fatRatio = 0.3;     // 30% of calories from fat
  let carbRatio = 0.4;    // 40% of calories from carbs
  
  if (userData.goal === 'loseWeight') {
    proteinRatio = 0.35;  // Higher protein for weight loss
    fatRatio = 0.3;
    carbRatio = 0.35;     // Lower carbs for weight loss
  } else if (userData.goal === 'gainWeight') {
    proteinRatio = 0.30;
    fatRatio = 0.25;
    carbRatio = 0.45;     // Higher carbs for weight gain
  }
  
  // Calories per gram: Protein = 4, Carbs = 4, Fat = 9
  const protein = Math.round((calories * proteinRatio) / 4);
  const carbs = Math.round((calories * carbRatio) / 4);
  const fat = Math.round((calories * fatRatio) / 9);
  
  // Generate meal recommendations
  let meals = [
    {
      name: 'Breakfast',
      foods: [
        'Oatmeal with fruits',
        'Whole grain toast with eggs',
        'Greek yogurt with honey and nuts'
      ]
    },
    {
      name: 'Lunch',
      foods: [
        'Brown rice with mixed vegetables and lean protein',
        'Whole grain chapati with dal and vegetables',
        'Quinoa salad with chickpeas'
      ]
    },
    {
      name: 'Dinner',
      foods: [
        'Grilled chicken with roasted vegetables',
        'Fish curry with brown rice',
        'Mixed dal with vegetables and roti'
      ]
    },
    {
      name: 'Snacks',
      foods: [
        'Handful of nuts and seeds',
        'Fresh fruit with yogurt',
        'Whole grain crackers with hummus'
      ]
    }
  ];

  // Adjust for medical conditions
  const restrictions = [];
  const recommendations = [
    'Drink at least 8 glasses of water daily',
    'Include a variety of colorful vegetables and fruits',
    'Limit processed foods and added sugars'
  ];

  if (userData.medicalConditions?.includes('diabetes')) {
    restrictions.push('Limit sugar and simple carbohydrates');
    restrictions.push('Monitor glucose levels regularly');
    recommendations.push('Focus on low glycemic index foods');
  }

  if (userData.medicalConditions?.includes('hypertension')) {
    restrictions.push('Limit sodium intake');
    recommendations.push('DASH diet approach recommended');
  }

  return {
    calories,
    protein,
    carbs,
    fat,
    meals,
    restrictions,
    recommendations
  };
}
