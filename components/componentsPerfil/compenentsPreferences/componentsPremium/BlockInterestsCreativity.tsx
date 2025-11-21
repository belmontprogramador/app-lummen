import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";

interface Props {
  options: any[];
  prefs: string[];
  onToggle: (value: string) => void;
}

export default function BlockInterestsCreativity({ options, prefs, onToggle }: Props) {
  return (
    <PreferenceBlock title="Interests — Creativity">
      {options?.map((o) => (
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
