import { cn } from "@/lib/utils"
import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "accent"
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium focus-ring"
    const variants = {
      default: "bg-orange-brand text-white hover:opacity-90",
      secondary: "bg-purple-brand text-white hover:opacity-90",
      accent: "bg-crimson text-white hover:opacity-90"
    }
    return <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
  }
)
Button.displayName = "Button"
