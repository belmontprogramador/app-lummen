import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";

export default function BlockIntentions({ options, prefs, onToggle }: any) {
  return (
    <PreferenceBlock title="Relationship Intentions">
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
