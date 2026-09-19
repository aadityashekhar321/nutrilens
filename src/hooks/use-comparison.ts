'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  ComparisonResult, 
  ComparisonChartData, 
  MetricComparison 
} from '@/types';
import { 
  getComparisonByCategory, 
  getFilteredComparison, 
  buildChartData 
} from '@/lib/comparison-engine';
import { generateExplanation } from '@/lib/explanation-engine';
import { nutritionMetrics } from '@/data/nutrition-metrics';
import { comparisons } from '@/data/comparisons';

export function useComparison() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [chartData, setChartData] = useState<ComparisonChartData[]>([]);
  const [explanation, setExplanation] = useState<string>('');

  // Initialize
  useEffect(() => {
    if (comparisons.length > 0) {
      const firstCategory = comparisons[0].categoryId;
      const keyMetrics = nutritionMetrics.filter(m => m.group === 'key').map(m => m.id);
      
      setSelectedCategory(firstCategory);
      setSelectedMetrics(keyMetrics);
    }
  }, []);

  // On category change
  useEffect(() => {
    if (selectedCategory) {
      const result = getComparisonByCategory(selectedCategory);
      setComparisonResult(result);
    }
  }, [selectedCategory]);

  // On metrics or category change (which updates comparisonResult)
  useEffect(() => {
    if (comparisonResult && selectedMetrics.length > 0) {
      const { foodA, foodB } = comparisonResult;
      
      const newChartData = buildChartData(foodA, foodB, selectedMetrics);
      setChartData(newChartData);

      const metricComparisons = getFilteredComparison(foodA, foodB, selectedMetrics);
      const newExplanation = generateExplanation(metricComparisons, foodA.name, foodB.name);
      setExplanation(newExplanation);
    } else {
      setChartData([]);
      setExplanation('');
    }
  }, [comparisonResult, selectedMetrics]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleMetricsChange = useCallback((metrics: string[]) => {
    setSelectedMetrics(metrics);
  }, []);

  return {
    selectedCategory,
    selectedMetrics,
    comparisonResult,
    chartData,
    explanation,
    handleCategoryChange,
    handleMetricsChange,
  };
}
