import { useState, useCallback, useEffect } from "react";

export interface AddressSuggestion {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
}

/**
 * Simple debounce implementation
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function with cancel method
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

/**
 * Custom hook for address autocomplete with debouncing
 * @param onSelect - Callback when an address is selected
 * @returns Hook state and handlers
 */
export function useAddressAutocomplete(
  onSelect?: (address: AddressSuggestion) => void
) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery || searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Call our API route (which can be replaced with real API integration)
        const response = await fetch(
          `/api/address-lookup?query=${encodeURIComponent(searchQuery)}`
        );

        if (!response.ok) {
          throw new Error("Address lookup failed");
        }

        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Address autocomplete error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch addresses");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Effect to trigger search on query change
  useEffect(() => {
    debouncedSearch(query);
    
    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  // Handle address selection
  const handleSelect = useCallback(
    (address: AddressSuggestion) => {
      setQuery(address.streetAddress);
      setSuggestions([]);
      onSelect?.(address);
    },
    [onSelect]
  );

  // Clear suggestions
  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
    handleSelect,
    clearSuggestions,
  };
}

