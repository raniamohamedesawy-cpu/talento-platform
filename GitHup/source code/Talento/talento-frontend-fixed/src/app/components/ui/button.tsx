import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1D2E] aria-invalid:ring-[color:rgba(239,68,68,0.2)] aria-invalid:border-[color:rgb(239,68,68)]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#D4A574,#C99659)] text-[var(--primary-foreground)] shadow-[0_12px_26px_rgba(212,165,116,0.28)] hover:brightness-105",
        outline:
          "border border-white/15 bg-white/10 text-white hover:bg-white/15 dark:bg-white/5",
        secondary:
          "bg-white/10 text-white hover:bg-white/15 border border-white/10",
        ghost:
          "hover:bg-white/10 text-white",
        link: "text-[#D4A574] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
