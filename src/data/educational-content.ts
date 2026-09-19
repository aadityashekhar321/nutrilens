import { EducationalSection, HealthHaloStep } from '@/types';

export const educationalSections: EducationalSection[] = [
  {
    id: 'intro-halo',
    title: 'The Health Halo Effect',
    subtitle: 'Why we perceive certain foods as healthy when they aren\'t.',
    description: 'The "Health Halo" is a psychological effect where a single claim (like "organic" or "low-fat") causes us to assume the entire product is healthy, leading us to ignore the negative aspects like high sugar content.'
  },
  {
    id: 'intro-labels',
    title: 'Decoding the Nutrition Label',
    subtitle: 'Read past the marketing.',
    description: 'Food packaging is designed to sell, not to educate. The front of the package is marketing; the back of the package is science. Learn to read the FDA Nutrition Facts label to discover what you are truly eating.'
  },
  {
    id: 'intro-myths',
    title: 'Athlete Nutrition Myths',
    subtitle: 'Evidence-based truth for active individuals.',
    description: 'The fitness industry is filled with pseudo-science and marketing hype designed to sell supplements. We break down the most common sports nutrition myths so you can fuel your body effectively.'
  }
];

export const healthHaloSteps: HealthHaloStep[] = [
  {
    id: 'step-1',
    step: 1,
    title: 'The Marketing Claim',
    description: 'You see a package that says "Made with Real Grains" or "0g Trans Fat".',
    icon: 'FaBullhorn'
  },
  {
    id: 'step-2',
    step: 2,
    title: 'The Assumption',
    description: 'Your brain immediately categorizes this product as a "healthy choice".',
    icon: 'FaBrain'
  },
  {
    id: 'step-3',
    step: 3,
    title: 'The Blind Spot',
    description: 'You stop investigating and fail to notice the 20g of added sugar on the back label.',
    icon: 'FaEyeSlash'
  },
  {
    id: 'step-4',
    step: 4,
    title: 'The Result',
    description: 'You consume unhealthy ingredients while believing you are making a positive dietary choice.',
    icon: 'FaExclamationTriangle'
  }
];
