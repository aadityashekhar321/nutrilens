import { SearchResult, SearchResultType } from '@/types';
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

  // Search foods
  foods.forEach(food => {
    if (food.name.toLowerCase().includes(normalizedQuery) || food.description.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: food.id,
        type: 'food',
        title: food.name,
        excerpt: food.description,
        link: `/foods/${food.id}`,
      });
    }
  });

  // Search comparisons
  comparisons.forEach(comp => {
    if (comp.title.toLowerCase().includes(normalizedQuery) || comp.description.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: comp.id,
        type: 'comparison',
        title: comp.title,
        excerpt: comp.description,
        link: `/compare/${comp.categoryId}`,
        icon: comp.icon
      });
    }
  });

  // Search label terms
  labelTerms.forEach(term => {
    if (term.term.toLowerCase().includes(normalizedQuery) || term.whatItUsuallyMeans.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: term.id,
        type: 'label-term',
        title: term.term,
        excerpt: term.whatItUsuallyMeans,
        link: `/education/labels#${term.id}`,
        icon: term.icon
      });
    }
  });

  // Search myths
  athleteMyths.forEach(myth => {
    if (myth.myth.toLowerCase().includes(normalizedQuery) || myth.truth.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: myth.id,
        type: 'myth',
        title: `Myth: ${myth.myth}`,
        excerpt: myth.truth,
        link: `/education/myths#${myth.id}`,
      });
    }
  });

  // Search alternatives
  foodAlternatives.forEach(alt => {
    if (alt.popularFood.toLowerCase().includes(normalizedQuery) || alt.alternativeFood.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: alt.id,
        type: 'alternative',
        title: `${alt.popularFood} vs ${alt.alternativeFood}`,
        excerpt: alt.reason,
        link: `/education/alternatives#${alt.id}`,
        icon: alt.popularFoodIcon
      });
    }
  });

  // Search culprits
  nutritionCulprits.forEach(culprit => {
    if (culprit.title.toLowerCase().includes(normalizedQuery) || culprit.tagline.toLowerCase().includes(normalizedQuery)) {
      results.push({
        id: culprit.id,
        type: 'culprit',
        title: culprit.title,
        excerpt: culprit.tagline,
        link: `/education/culprits#${culprit.id}`,
        icon: culprit.icon
      });
    }
  });

  return results.slice(0, limit);
}
