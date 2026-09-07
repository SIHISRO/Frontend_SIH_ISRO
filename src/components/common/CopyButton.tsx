"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./Button";

export interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = "Copy JSON",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      icon={
        copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4 text-[#FF9B51]" />
        )
      }
      aria-label={copied ? "Copied to clipboard!" : label}
      className={className}
    >
      {copied ? "Copied!" : label}
    </Button>
  );
}
