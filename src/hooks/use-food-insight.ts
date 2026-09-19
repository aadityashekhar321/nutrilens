'use client';

import { useState, useCallback, useRef } from 'react';
import { FoodInsightResponse, FoodInsightError, FoodInsightAPIResponse } from '@/types';
import { validateFoodInsightInput } from '@/lib/validators';

export function useFoodInsight() {
  const [input, setInput] = useState('');
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FoodInsightResponse | null>(null);
  const [error, setError] = useState<FoodInsightError | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
    setInput('');
    setBrand('');
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const submitInsight = useCallback(async (customInput?: string, customBrand?: string) => {
    const searchInput = customInput !== undefined ? customInput : input;
    const searchBrand = customBrand !== undefined ? customBrand : brand;

    const validation = validateFoodInsightInput(searchInput);
    if (!validation.isValid) {
      setError({ code: 'EMPTY_INPUT', message: validation.error || 'Invalid input' });
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/food-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName: searchInput, brand: searchBrand }),
        signal: abortControllerRef.current.signal,
      });

      const data: FoodInsightAPIResponse = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred' });
      } else if (data.data) {
        setResult(data.data);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        setError({ code: 'NETWORK_ERROR', message: 'Failed to connect to the server' });
      }
    } finally {
      setLoading(false);
    }
  }, [input, brand]);

  return {
    input,
    setInput,
    brand,
    setBrand,
    loading,
    result,
    error,
    submitInsight,
    clearResult,
  };
}
