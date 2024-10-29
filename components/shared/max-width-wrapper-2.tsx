import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper2({
  className,
  children,
  large = false,
}: {
  className?: string;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
