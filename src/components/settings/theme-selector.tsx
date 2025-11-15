import ThemeSwitcher from "@/components/controls/theme-switcher";

export default function ThemeSelector() {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">Theme</p>
      <ThemeSwitcher />
    </div>
  );
}
