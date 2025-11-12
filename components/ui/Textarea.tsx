import { cn } from "@/lib/utils"

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }
export function Textarea({ label, className, ...props }: Props) {
  return (
    <label className="grid gap-1">
      {label && <span className="text-sm text-steel">{label}</span>}
      <textarea
        className={cn("rounded-xl bg-white/5 border border-white/10 px-3 py-2 focus-ring", className)}
        {...props}
      />
    </label>
  )
}
