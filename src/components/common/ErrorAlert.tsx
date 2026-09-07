"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./Button";

export interface ErrorAlertProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorAlert({
  message,
  details,
  onRetry,
  className = "",
}: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 sm:p-5 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 flex-shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-rose-200">{message}</h4>
          {details && (
            <p className="mt-1 text-xs text-rose-300/80 font-mono break-words">
              {details}
            </p>
          )}
          {onRetry && (
            <div className="mt-3">
              <Button
                variant="danger"
                size="sm"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={onRetry}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
