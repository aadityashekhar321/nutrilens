import { NutritionCulprit } from '@/types';

export const nutritionCulprits: NutritionCulprit[] = [
  {
    id: 'c-added-sugar',
    title: 'Added Sugar',
    icon: 'FaCandyCane',
    tagline: 'The master of disguise',
    summary: 'Sugars added during processing contribute empty calories and are linked to various health issues.',
    details: 'Unlike naturally occurring sugars in fruit (which come with fiber) or milk (which come with protein), added sugars offer no nutritional value. They can spike blood sugar rapidly, leading to energy crashes and increased hunger.',
    whereItHides: ['Yogurt', 'Pasta Sauces', 'Salad Dressings', 'Granola Bars', 'Bread'],
    alternativeNames: ['High Fructose Corn Syrup', 'Cane Juice', 'Maltodextrin', 'Dextrose', 'Agave Nectar', 'Brown Rice Syrup'],
    whatToCheck: 'Look specifically at the "Includes Xg Added Sugars" line under Total Carbohydrates on the nutrition label.',
    dailyLimit: 'Under 25g (women) or 36g (men) per day.'
  },
  {
    id: 'c-unhealthy-fat',
    title: 'Unhealthy Fats',
    icon: 'FaOilCan',
    tagline: 'Not all fats are created equal',
    summary: 'Saturated and trans fats can negatively impact heart health and cholesterol levels.',
    details: 'While unsaturated fats (like those in olive oil and avocados) are beneficial, excess saturated fat can raise LDL (bad) cholesterol. Trans fats (partially hydrogenated oils) are even worse, as they raise LDL and lower HDL (good) cholesterol.',
    whereItHides: ['Baked Goods', 'Fried Foods', 'Non-dairy Creamers', 'Margarine', 'Packaged Snacks'],
    alternativeNames: ['Partially Hydrogenated Oil', 'Hydrogenated Oil', 'Shortening'],
    whatToCheck: 'Check the breakdown of fats. Aim for zero trans fats and limited saturated fats.',
    dailyLimit: 'Saturated fat should be less than 10% of total daily calories.'
  },
  {
    id: 'c-sodium',
    title: 'Excessive Sodium',
    icon: 'FaSaltBae', // using string placeholder, actual icon mapping in UI
    tagline: 'The silent blood pressure raiser',
    summary: 'Most Americans consume far more sodium than recommended, largely from packaged and restaurant foods.',
    details: 'High sodium intake is strongly associated with high blood pressure, a major risk factor for heart disease and stroke. It also causes fluid retention.',
    whereItHides: ['Canned Soups', 'Frozen Meals', 'Deli Meats', 'Condiments', 'Cottage Cheese'],
    alternativeNames: ['Monosodium Glutamate (MSG)', 'Sodium Bicarbonate', 'Sodium Nitrate'],
    whatToCheck: 'Look for foods with a Daily Value (DV) of sodium less than 5% per serving.',
    dailyLimit: 'Less than 2,300 mg per day.'
  }
];
