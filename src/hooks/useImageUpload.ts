"use client";

import { useState, useCallback } from "react";

export function useImageUpload() {
  const [referenceFile, setReferenceFileState] = useState<File | null>(null);
  const [sourceFile, setSourceFileState] = useState<File | null>(null);

  const setReferenceFile = useCallback((file: File | null) => {
    setReferenceFileState(file);
  }, []);

  const setSourceFile = useCallback((file: File | null) => {
    setSourceFileState(file);
  }, []);

  const clearReference = useCallback(() => {
    setReferenceFileState(null);
  }, []);

  const clearSource = useCallback(() => {
    setSourceFileState(null);
  }, []);

  const clearAll = useCallback(() => {
    setReferenceFileState(null);
    setSourceFileState(null);
  }, []);

  const readyToSubmit = Boolean(referenceFile && sourceFile);

  return {
    referenceFile,
    sourceFile,
    setReferenceFile,
    setSourceFile,
    clearReference,
    clearSource,
    clearAll,
    readyToSubmit,
  };
}
