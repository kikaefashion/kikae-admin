// components/TooltipText.tsx
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export default function TooltipText({
  children,
  fullText,
}: {
  children: ReactNode;
  fullText: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help underline decoration-dotted">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm bg-black text-white p-2 text-sm">
          {fullText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
