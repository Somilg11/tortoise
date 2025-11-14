import DifficultySelector from "@/components/controls/difficulty-selector";
import TestModeSelector from "@/components/controls/test-mode-selector";
import ThemeSwitcher from "@/components/controls/theme-switcher";
import TypingBox from "@/components/typing/typing-box";


export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pt-6">
      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <DifficultySelector />
        <TestModeSelector />
        <ThemeSwitcher />
      </div>
      {/* Typing UI Shell */}
      <TypingBox />
    </div>
  );
}