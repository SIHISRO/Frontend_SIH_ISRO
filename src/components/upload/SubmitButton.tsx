"use client";

import React from "react";
import { Button } from "../common/Button";
import { Crosshair, Lock } from "lucide-react";

export interface SubmitButtonProps {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
  className?: string;
}

export function SubmitButton({
  disabled,
  isLoading,
  onClick,
  className = "",
}: SubmitButtonProps) {
  return (
    <div className={`flex flex-col items-center sm:items-end ${className}`}>
      <Button
        type="button"
        variant="primary"
        size="lg"
        disabled={disabled}
        loading={isLoading}
        onClick={onClick}
        icon={
          disabled ? (
            <Lock className="w-5 h-5 text-[#BFC9D1]/50" />
          ) : (
            <Crosshair className="w-5 h-5 stroke-[2.5]" />
          )
        }
        className="w-full sm:w-auto px-8 py-4 text-base tracking-wide"
      >
        {isLoading
          ? "Aligning Lunar Images..."
          : disabled
          ? "Select Both Images to Register"
          : "Execute Image Registration"}
      </Button>
      {disabled && !isLoading && (
        <span className="text-[11px] text-[#BFC9D1]/60 font-mono mt-2">
          Both Reference (image1) and Source (image2) are required
        </span>
      )}
    </div>
  );
}
