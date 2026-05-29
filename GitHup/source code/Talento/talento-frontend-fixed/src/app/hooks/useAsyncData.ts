import { useState, useEffect } from "react";

/**
 * Simulates async data loading with a configurable delay.
 * Replace the timeout with a real fetch call when connecting to a backend.
 *
 * @example
 * const { loading, error } = useAsyncData();
 * if (loading) return <Skeleton />;
 */
export function useAsyncData(delay = 800) {
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      // Swap this timeout for: fetch(url).then(...).catch(setError).finally(() => setLoading(false))
      setLoading(false);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return { loading, error };
}
