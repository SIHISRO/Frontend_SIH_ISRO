"use client";

import { useState, useCallback, useRef } from "react";
import { PredictResponse } from "@/types/prediction";
import { predictImageRegistration, ApiError } from "@/services/predictionService";

export function usePrediction() {
  const [data, setData] = useState<PredictResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const predict = useCallback(
    async (reference: File, source: File): Promise<PredictResponse | null> => {
      if (isLoading) return null;

      setIsLoading(true);
      setError(null);

      // Cancel any prior in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const result = await predictImageRegistration(
          reference,
          source,
          controller.signal
        );
        setData(result);
        return result;
      } catch (err: unknown) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred during image registration.");
        }
        return null;
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [isLoading]
  );

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    predict,
    data,
    isLoading,
    error,
    reset,
  };
}
