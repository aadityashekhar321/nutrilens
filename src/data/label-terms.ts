import { LabelTerm } from '@/types';

export const labelTerms: LabelTerm[] = [
  {
    id: 'term-natural',
    term: 'Natural',
    icon: 'FaLeaf',
    whatItUsuallyMeans: 'The product does not contain artificial flavors, added colors, or synthetic substances.',
    whatItDoesNotGuarantee: 'It does NOT mean the product is healthy, low in sugar, low in calories, or nutritious.',
    whatToCheckInstead: 'Check the ingredients list for added sugars and the nutrition panel for overall profile.',
    warningLevel: 'high'
  },
  {
    id: 'term-multigrain',
    term: 'Multigrain',
    icon: 'FaSeedling',
    whatItUsuallyMeans: 'The product contains more than one type of grain.',
    whatItDoesNotGuarantee: 'It does NOT mean the grains are whole grains. They are often refined grains stripped of nutrients and fiber.',
    whatToCheckInstead: 'Look for "100% Whole Wheat" or "100% Whole Grain", and verify whole grains are the first ingredient.',
    warningLevel: 'high'
  },
  {
    id: 'term-low-fat',
    term: 'Low-Fat',
    icon: 'FaCheckCircle',
    whatItUsuallyMeans: 'The food contains 3 grams of fat or less per serving.',
    whatItDoesNotGuarantee: 'It does NOT mean low calorie. Often, sugar is added to make up for the loss of flavor from removing fat.',
    whatToCheckInstead: 'Check the "Added Sugars" line on the label. Compare the sugar content to the full-fat version.',
    warningLevel: 'medium'
  },
  {
    id: 'term-organic',
    term: 'Organic',
    icon: 'FaAppleAlt',
    whatItUsuallyMeans: 'Ingredients were grown without synthetic pesticides or fertilizers, and no GMOs were used.',
    whatItDoesNotGuarantee: 'It does NOT mean the product is healthy. Organic sugar is still sugar. Organic cookies are still cookies.',
    whatToCheckInstead: 'Evaluate the nutrition facts just as you would a non-organic product.',
    warningLevel: 'medium'
  },
  {
    id: 'term-gluten-free',
    term: 'Gluten-Free',
    icon: 'FaBan',
    whatItUsuallyMeans: 'The product contains no wheat, rye, barley, or cross-breeds of these grains.',
    whatItDoesNotGuarantee: 'It does NOT mean low carb or healthy. Many gluten-free packaged foods use highly refined rice or potato starch and add extra fat or sugar for texture.',
    whatToCheckInstead: 'Check fiber content (often low in GF products) and added sugars.',
    warningLevel: 'medium'
  },
  {
    id: 'term-real-fruit',
    term: 'Made with Real Fruit',
    icon: 'FaLemon',
    whatItUsuallyMeans: 'Contains some derivative of actual fruit, often just fruit juice concentrate.',
    whatItDoesNotGuarantee: 'It does NOT mean a full serving of fruit, nor does it guarantee the presence of fiber from the fruit.',
    whatToCheckInstead: 'Look at the ingredients. If sugar or corn syrup appears before the fruit, it is mostly sugar.',
    warningLevel: 'high'
  }
];
