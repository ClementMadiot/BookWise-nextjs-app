"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group "
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      // Default style for toast titles
      toastOptions={{
        classNames: {
          success: "!bg-green-500", // Background for success toasts
          error: "!bg-red-400", // Background for error toasts
          title: "text-base font-semibold !text-dark-100", // Default title style
          description: "!text-dark-100", // Default description style
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
