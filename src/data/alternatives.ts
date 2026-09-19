import { FoodAlternative } from '@/types';

export const foodAlternatives: FoodAlternative[] = [
  {
    id: 'alt-cereal',
    popularFood: 'Sugary Breakfast Cereal',
    popularFoodIcon: 'FaBowlRice',
    concern: 'High in added sugars, low in fiber and protein. Causes mid-morning energy crash.',
    alternativeFood: 'Oatmeal with Fresh Berries',
    alternativeFoodIcon: 'FaSeedling',
    reason: 'Provides slow-digesting complex carbohydrates, high fiber, and natural sweetness without the sugar spike.',
    comparisonMetrics: [
      { metric: 'Added Sugar', popular: '15g', alternative: '0g', betterChoice: 'alternative' },
      { metric: 'Fiber', popular: '1g', alternative: '5g', betterChoice: 'alternative' }
    ]
  },
  {
    id: 'alt-snack',
    popularFood: 'Potato Chips',
    popularFoodIcon: 'FaCookie',
    concern: 'High in sodium and unhealthy fats, highly processed, low satiety.',
    alternativeFood: 'Air-Popped Popcorn',
    alternativeFoodIcon: 'FaCloud',
    reason: 'Popcorn is a whole grain. Air-popped it provides volume and crunch with minimal calories and fat.',
    comparisonMetrics: [
      { metric: 'Calories (per cup)', popular: '150 kcal', alternative: '31 kcal', betterChoice: 'alternative' },
      { metric: 'Volume for 150 kcal', popular: '1 handful', alternative: '5 cups', betterChoice: 'alternative' }
    ]
  },
  {
    id: 'alt-drink',
    popularFood: 'Soda',
    popularFoodIcon: 'FaGlassWhiskey',
    concern: 'Massive amounts of liquid sugar with zero nutritional value.',
    alternativeFood: 'Sparkling Water with Lemon',
    alternativeFoodIcon: 'FaTint',
    reason: 'Provides the carbonation and flavor you crave without any sugar or artificial sweeteners.',
    comparisonMetrics: [
      { metric: 'Added Sugar', popular: '39g', alternative: '0g', betterChoice: 'alternative' },
      { metric: 'Calories', popular: '140 kcal', alternative: '0 kcal', betterChoice: 'alternative' }
    ]
  },
  {
    id: 'alt-spread',
    popularFood: 'Hazelnut Cocoa Spread',
    popularFoodIcon: 'FaBreadSlice',
    concern: 'Marketed as a healthy breakfast spread but is primarily sugar and palm oil.',
    alternativeFood: '100% Peanut or Almond Butter',
    alternativeFoodIcon: 'FaSeedling',
    reason: 'Nut butters provide healthy fats, protein, and sustained energy without the sugar crash.',
    comparisonMetrics: [
      { metric: 'Sugar (2 tbsp)', popular: '21g', alternative: '1g', betterChoice: 'alternative' },
      { metric: 'Protein (2 tbsp)', popular: '2g', alternative: '7g', betterChoice: 'alternative' }
    ]
  },
  {
    id: 'alt-bar',
    popularFood: 'Chewy Granola Bar',
    popularFoodIcon: 'FaCookieBite',
    concern: 'Often held together with corn syrup and packed with chocolate chips.',
    alternativeFood: 'Handful of Mixed Nuts',
    alternativeFoodIcon: 'FaLeaf',
    reason: 'Nuts are a whole food offering healthy fats, protein, and fiber that truly keep you full.',
    comparisonMetrics: [
      { metric: 'Added Sugar', popular: '12g', alternative: '0g', betterChoice: 'alternative' },
      { metric: 'Healthy Fats', popular: 'Low', alternative: 'High', betterChoice: 'alternative' }
    ]
  },
  {
    id: 'alt-yogurt',
    popularFood: 'Fruit-on-the-Bottom Yogurt',
    popularFoodIcon: 'FaMugHot',
    concern: 'Contains as much added sugar as a dessert.',
    alternativeFood: 'Plain Greek Yogurt with Real Fruit',
    alternativeFoodIcon: 'FaAppleAlt',
    reason: 'Greek yogurt has twice the protein. Adding your own fruit gives natural sweetness and fiber.',
    comparisonMetrics: [
      { metric: 'Protein', popular: '5g', alternative: '15g', betterChoice: 'alternative' },
      { metric: 'Added Sugar', popular: '14g', alternative: '0g', betterChoice: 'alternative' }
    ]
  }
];
