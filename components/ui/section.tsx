import * as React from "react";

import { cn } from "@/lib/utils";

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn(
        "bg-background text-foreground px-4 py-8 sm:py-16 md:py-20",
        className,
      )}
      {...props}
    />
  );
}

export { Section };
