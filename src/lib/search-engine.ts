import { SearchResult } from '@/types';
import { foods } from '@/data/foods';
import { comparisons } from '@/data/comparisons';
import { labelTerms } from '@/data/label-terms';
import { athleteMyths } from '@/data/athlete-myths';
import { foodAlternatives } from '@/data/alternatives';
import { nutritionCulprits } from '@/data/culprits';

export interface SearchOptions {
  limit?: number;
}

export function search(query: string, options: SearchOptions = {}): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  const limit = options.limit || 20;

  // Search foods → route to /food-insight?q=<food name>
  foods.forEach(food => {
    if (
      food.name.toLowerCase().includes(normalizedQuery) ||
      food.description.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: food.id,
        type: 'food',
        title: food.name,
        excerpt: food.description,
        link: `/food-insight?q=${encodeURIComponent(food.name)}`,
      });
    }
  });

  // Search comparisons → route to /compare
  comparisons.forEach(comp => {
    if (
      comp.title.toLowerCase().includes(normalizedQuery) ||
      comp.description.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: comp.id,
        type: 'comparison',
        title: comp.title,
        excerpt: comp.description,
        link: `/compare`,
        icon: comp.icon
      });
    }
  });

  // Search label terms → route to /label-detective
  labelTerms.forEach(term => {
    if (
      term.term.toLowerCase().includes(normalizedQuery) ||
      term.whatItUsuallyMeans.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: term.id,
        type: 'label-term',
        title: term.term,
        excerpt: term.whatItUsuallyMeans,
        link: `/label-detective`,
        icon: term.icon
      });
    }
  });

  // Search myths → route to /athletes
  athleteMyths.forEach(myth => {
    if (
      myth.myth.toLowerCase().includes(normalizedQuery) ||
      myth.truth.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: myth.id,
        type: 'myth',
        title: `Myth: ${myth.myth}`,
        excerpt: myth.truth,
        link: `/athletes`,
      });
    }
  });

  // Search alternatives → route to /alternatives
  foodAlternatives.forEach(alt => {
    if (
      alt.popularFood.toLowerCase().includes(normalizedQuery) ||
      alt.alternativeFood.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: alt.id,
        type: 'alternative',
        title: `${alt.popularFood} vs ${alt.alternativeFood}`,
        excerpt: alt.reason,
        link: `/alternatives`,
        icon: alt.popularFoodIcon
      });
    }
  });

  // Search culprits → route to /explore
  nutritionCulprits.forEach(culprit => {
    if (
      culprit.title.toLowerCase().includes(normalizedQuery) ||
      culprit.tagline.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: culprit.id,
        type: 'culprit',
        title: culprit.title,
        excerpt: culprit.tagline,
        link: `/explore`,
        icon: culprit.icon
      });
    }
  });

  return results.slice(0, limit);
}
