import { Sun, Moon } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light / dark theme"
      className={`
        relative h-9 w-9 rounded-full border transition-all duration-300
        flex items-center justify-center
        ${theme === "dark"
          ? "border-primary/30 bg-primary/10 text-gold hover:bg-primary/20"
          : "border-amber-300/60 bg-amber-50 text-amber-600 hover:bg-amber-100"
        }
      `}
    >
      <span
        className={`absolute transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      >
        <Moon size={16} />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      >
        <Sun size={16} />
      </span>
    </button>
  );
}
