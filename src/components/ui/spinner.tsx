import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

export function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin shrink-0 text-current", className)}
      size={size}
      {...props}
    />
  );
}

export default Spinner;
