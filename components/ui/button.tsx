import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none   aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 cursor-pointer focus-visible:ring-[2px]",
  // shadow-xs hover:bg-primary/85 focus-visible:border-ring aria-invalid:border-destructive focus-visible:ring-ring/50 focus-visible:ring-[3px]
  {
    variants: {
      variant: {
        default: "bg-primary text-dark-100 gap-2 shadow-xs hover:bg-primary/85 focus-visible:border-ring aria-invalid:border-destructive focus-visible:ring-ring/50 focus-visible:ring-[2px]",
        destructive:
          "bg-red-400 text-light-300 shadow-xs hover:bg-red-400/90 w-full",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // cusstom variant
        book: "bg-gradient-400 mt-3 min-h-14 w-full !font-bebas-neue text-base text-primary hover:bg-gradient-400/80",
        upload:
          "bg-dark-300 text-light-100 flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md hover:bg-dark-300/90",
        icon:
        "bg-none !px-0 [&_img]:transition-transform [&_img]:duration-200 hover:[&_img]:scale-110 !text-light-100",
        action:
        "text-light-300 w-full bg-green-400 shadow-xs hover:bg-green-400/90",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
