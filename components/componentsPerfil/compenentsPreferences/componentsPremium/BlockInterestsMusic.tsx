import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";

export default function BlockInterestsMusic({
  options,
  prefs,
  onToggle,
}: {
  options: any[];
  prefs: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <PreferenceBlock title="Interests — Music">
      {options?.map((o: any) => (
        <PreferenceChip
          key={o.value}
          label={o.label}
          active={prefs?.includes(o.value)}
          onPress={() => onToggle(o.value)}
        />
      ))}
    </PreferenceBlock>
  );
}
