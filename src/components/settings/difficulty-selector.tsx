import DifficultySelector from "@/components/controls/difficulty-selector";

export default function DifficultySelectorSetting() {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">Difficulty</p>
      <DifficultySelector />
    </div>
  );
}
