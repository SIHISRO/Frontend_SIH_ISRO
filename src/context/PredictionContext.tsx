"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PredictResponse } from "@/types/prediction";

interface PredictionMeta {
  referencePreview?: string | null;
  sourcePreview?: string | null;
  referenceName?: string | null;
  sourceName?: string | null;
}

interface PredictionContextValue {
  result: PredictResponse | null;
  meta: PredictionMeta;
  updateResult: (data: PredictResponse, meta?: PredictionMeta) => void;
  clearResult: () => void;
}

const PredictionContext = createContext<PredictionContextValue | undefined>(
  undefined
);

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [meta, setMeta] = useState<PredictionMeta>({
    referencePreview: null,
    sourcePreview: null,
    referenceName: null,
    sourceName: null,
  });

  const updateResult = (data: PredictResponse, inputMeta?: PredictionMeta) => {
    setResult(data);
    if (inputMeta) {
      setMeta(inputMeta);
    }
  };

  const clearResult = () => {
    setResult(null);
    setMeta({
      referencePreview: null,
      sourcePreview: null,
      referenceName: null,
      sourceName: null,
    });
  };

  return (
    <PredictionContext.Provider
      value={{
        result,
        meta,
        updateResult,
        clearResult,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictionContext(): PredictionContextValue {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error(
      "usePredictionContext must be used within a PredictionProvider"
    );
  }
  return context;
}
