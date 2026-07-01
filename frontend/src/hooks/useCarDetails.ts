import { useEffect, useState } from "react";
import { fetchCarDetails } from "../api/cars";
import { ApiError } from "../api/client";
import type { CarDetails } from "../types/car";

interface UseCarDetailsResult {
  car: CarDetails | null;
  isLoading: boolean;
  error: string | null;
}

export function useCarDetails(id: string | undefined): UseCarDetailsResult {
  const [car, setCar] = useState<CarDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchCarDetails(id)
      .then((data) => {
        if (!cancelled) setCar(data);
      })
      .catch((err) => {
        if (cancelled) return;
        const message =
          err instanceof ApiError ? err.message : "Couldn't load this car's details.";
        setError(message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { car, isLoading, error };
}
