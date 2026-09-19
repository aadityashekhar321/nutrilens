import { FoodComparison } from '@/types';

export const comparisons: FoodComparison[] = [
  {
    id: 'comp-yogurt',
    categoryId: 'yogurt',
    categoryLabel: 'Yogurt',
    title: 'Flavored vs. Plain Yogurt',
    description: 'See how fruit-flavored yogurt stacks up against plain Greek yogurt.',
    foodAId: 'f-yogurt-1',
    foodBId: 'f-yogurt-2',
    icon: 'FaMugHot'
  },
  {
    id: 'comp-granola',
    categoryId: 'granola',
    categoryLabel: 'Granola',
    title: 'Commercial vs. Low-Sugar Granola',
    description: 'The hidden sugars in standard granola versus nut-based alternatives.',
    foodAId: 'f-granola-1',
    foodBId: 'f-granola-2',
    icon: 'FaCookieBite'
  },
  {
    id: 'comp-juice',
    categoryId: 'beverages',
    categoryLabel: 'Beverages',
    title: 'Fruit Juice vs. Whole Fruit',
    description: 'Why drinking fruit isn\'t the same as eating it.',
    foodAId: 'f-bev-1',
    foodBId: 'f-bev-2',
    icon: 'FaAppleAlt'
  },
  {
    id: 'comp-bread',
    categoryId: 'bread',
    categoryLabel: 'Bread',
    title: 'Multigrain vs. Whole Wheat',
    description: 'Decoding bread labels: Multigrain vs 100% Whole Wheat.',
    foodAId: 'f-bread-1',
    foodBId: 'f-bread-2',
    icon: 'FaBreadSlice'
  },
  {
    id: 'comp-snacks',
    categoryId: 'snack-foods',
    categoryLabel: 'Snacks',
    title: 'Veggie Chips vs. Real Veggie Snacks',
    description: 'Are veggie chips actually healthy?',
    foodAId: 'f-snack-1',
    foodBId: 'f-snack-2',
    icon: 'FaCarrot'
  },
  {
    id: 'comp-protein',
    categoryId: 'protein-products',
    categoryLabel: 'Protein',
    title: 'Protein Bar vs. Whole Food Protein',
    description: 'Engineered protein snacks vs natural sources.',
    foodAId: 'f-protein-1',
    foodBId: 'f-protein-2',
    icon: 'FaDumbbell'
  },
  {
    id: 'comp-cereal',
    categoryId: 'breakfast-cereals',
    categoryLabel: 'Cereal',
    title: 'Oat Cluster Cereal vs. Plain Oatmeal',
    description: 'The sweet truth about "healthy" breakfast cereals.',
    foodAId: 'f-cereal-1',
    foodBId: 'f-cereal-2',
    icon: 'FaBowlRice'
  },
  {
    id: 'comp-energy',
    categoryId: 'energy-foods',
    categoryLabel: 'Energy',
    title: 'Sports Drink vs. Electrolyte Water',
    description: 'Do you really need the sugar in sports drinks?',
    foodAId: 'f-energy-1',
    foodBId: 'f-energy-2',
    icon: 'FaBolt'
  }
];
