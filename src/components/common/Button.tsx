"use client";

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LoadingSpinner } from "./LoadingSpinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#18232c] cursor-pointer disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-[#FF9B51] text-[#18232c] font-semibold hover:bg-[#ffaa69] active:bg-[#e6853a] focus:ring-[#FF9B51] shadow-md shadow-[#FF9B51]/20 disabled:opacity-50 disabled:shadow-none",
      secondary:
        "bg-[#25343F] text-[#EAEFEF] border border-[#BFC9D1]/30 hover:bg-[#2f414f] hover:border-[#BFC9D1]/60 focus:ring-[#BFC9D1] disabled:opacity-50",
      outline:
        "bg-transparent text-[#EAEFEF] border border-[#BFC9D1]/40 hover:bg-[#BFC9D1]/10 hover:border-[#BFC9D1] focus:ring-[#BFC9D1] disabled:opacity-50",
      ghost:
        "bg-transparent text-[#BFC9D1] hover:text-[#EAEFEF] hover:bg-[#25343F]/60 focus:ring-[#BFC9D1] disabled:opacity-50",
      danger:
        "bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 focus:ring-red-500 disabled:opacity-50",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        className={twMerge(
          clsx(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            (disabled || loading) && "opacity-50 pointer-events-none",
            className
          )
        )}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size="sm" className="text-current" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
