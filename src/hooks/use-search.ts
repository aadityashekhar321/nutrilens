'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { SearchResult, SearchResultType } from '@/types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: abortControllerRef.current.signal
        });
        
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        } else {
          setResults([]);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Search error:', err);
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query]);

  const groupedResults = useMemo(() => {
    const groups: Partial<Record<SearchResultType, SearchResult[]>> = {};
    
    results.forEach(result => {
      if (!groups[result.type]) {
        groups[result.type] = [];
      }
      groups[result.type]!.push(result);
    });
    
    return groups;
  }, [results]);

  return {
    query,
    setQuery,
    results,
    groupedResults,
    loading
  };
}
