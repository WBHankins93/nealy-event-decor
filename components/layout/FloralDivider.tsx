import { cn } from "@/lib/utils";

interface FloralDividerProps {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "gold" | "green" | "burgundy";
}

export default function FloralDivider({
  className,
  size = "medium",
  color = "gold",
}: FloralDividerProps) {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-16 h-16",
  };

  const colors = {
    gold: "text-signature-gold",
    green: "text-forest-green",
    burgundy: "text-wine-burgundy",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        className={cn(sizes[size], colors[color])}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C12 2 10 6 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 6 12 2 12 2Z" />
        <path d="M12 22C12 22 10 18 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 18 12 22 12 22Z" />
        <path d="M2 12C2 12 6 10 10 10C11.1046 10 12 10.8954 12 12C12 13.1046 11.1046 14 10 14C6 14 2 12 2 12Z" />
        <path d="M22 12C22 12 18 10 14 10C12.8954 10 12 10.8954 12 12C12 13.1046 12.8954 14 14 14C18 14 22 12 22 12Z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    </div>
  );
}