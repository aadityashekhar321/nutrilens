import { AthleteMyth } from '@/types';

export const athleteMyths: AthleteMyth[] = [
  {
    id: 'myth-protein-max',
    category: 'protein',
    myth: 'More protein automatically equals more muscle growth.',
    truth: 'Your body can only utilize a certain amount of protein for muscle synthesis at one time (roughly 20-40g per meal).',
    explanation: 'Excess protein beyond what your body can use for muscle repair is either burned for energy or stored as fat. Furthermore, muscle growth requires an overall caloric surplus and a progressive strength training stimulus, not just high protein intake.',
    practicalGuidance: 'Distribute your protein intake evenly across 3-5 meals throughout the day rather than consuming one massive protein shake.'
  },
  {
    id: 'myth-carbs-bad',
    category: 'carbohydrates',
    myth: 'Carbs make you fat and should be avoided by athletes.',
    truth: 'Carbohydrates are the body\'s primary and most efficient energy source for high-intensity exercise.',
    explanation: 'Glycogen (stored carbohydrates in the muscle and liver) is critical for athletic performance. Severe carbohydrate restriction can impair high-intensity output, slow recovery, and increase the risk of overtraining.',
    practicalGuidance: 'Match carbohydrate intake to your training volume. High training days require more carbs; rest days require fewer.'
  },
  {
    id: 'myth-hydration-thirst',
    category: 'hydration',
    myth: 'You only need to drink water when you feel thirsty.',
    truth: 'Thirst is often a delayed indicator of dehydration, especially during intense exercise or in hot environments.',
    explanation: 'By the time you feel thirsty, you may already be 1-2% dehydrated, which is enough to negatively impact cognitive and physical performance. However, over-drinking (hyponatremia) is also dangerous.',
    practicalGuidance: 'Drink consistently throughout the day. Monitor your urine color (aim for pale yellow) to gauge general hydration status.'
  },
  {
    id: 'myth-sports-drinks',
    category: 'energy',
    myth: 'You need a sports drink for every workout.',
    truth: 'Most workouts under 60-90 minutes do not require the calories or rapid carbohydrates provided by sports drinks.',
    explanation: 'For short or low-intensity workouts, your body has sufficient stored glycogen. Consuming a sports drink adds unnecessary sugars and calories. They are designed for endurance athletes engaged in prolonged, intense activity.',
    practicalGuidance: 'Stick to plain water for workouts under an hour. Save sports drinks for long runs, heavy sweat sessions, or tournament days.'
  },
  {
    id: 'myth-anabolic-window',
    category: 'meal-timing',
    myth: 'You must consume protein within 30 minutes post-workout, or you lose your gains.',
    truth: 'The "anabolic window" for protein consumption is much wider than 30 minutes, likely lasting several hours.',
    explanation: 'While post-workout nutrition is important, total daily protein intake and protein distribution matter far more than the exact timing immediately post-exercise. If you ate a pre-workout meal containing protein, those amino acids are still in your bloodstream post-workout.',
    practicalGuidance: 'Aim to eat a balanced meal containing protein and carbohydrates within a few hours of finishing your training.'
  },
  {
    id: 'myth-fasted-cardio',
    category: 'energy',
    myth: 'Fasted cardio burns significantly more body fat.',
    truth: 'Over a 24-hour period, there is no significant difference in total fat loss between fasted and fed cardio when calories are equated.',
    explanation: 'While exercising fasted may increase the percentage of energy coming from fat *during* the session, the body compensates by burning more carbohydrates later in the day. Fasted high-intensity training can actually impair performance.',
    practicalGuidance: 'Do cardio when you feel best. If you prefer it fasted, that is fine. If you feel weak or dizzy, eat a small carbohydrate-rich snack beforehand.'
  },
  {
    id: 'myth-supplements-necessary',
    category: 'supplements',
    myth: 'You need supplements (BCAAs, Pre-workout) to reach your peak potential.',
    truth: 'Supplements offer marginal benefits (1-5%) and cannot replace a poor diet or inadequate sleep.',
    explanation: 'BCAAs are unnecessary if you consume adequate complete protein. Many pre-workouts rely simply on heavy doses of caffeine. While creatine and protein powder are well-researched and convenient, whole foods should be the foundation.',
    practicalGuidance: 'Focus on mastering sleep, hydration, and a balanced diet first. Only consider supplements to fill specific dietary gaps.'
  },
  {
    id: 'myth-cramps-potassium',
    category: 'recovery',
    myth: 'Muscle cramps are strictly caused by a lack of potassium (eat a banana).',
    truth: 'Exercise-associated muscle cramps are complex and more often related to muscle fatigue and sodium depletion than potassium.',
    explanation: 'While electrolytes play a role, fatigue in the nervous system from unaccustomed intensity or duration is the primary driver of cramps in athletes.',
    practicalGuidance: 'To prevent cramps, ensure adequate training preparation (fitness level), pace yourself, and replace sodium lost in sweat during long events.'
  }
];
