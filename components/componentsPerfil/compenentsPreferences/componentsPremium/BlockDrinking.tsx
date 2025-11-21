import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";

export default function BlockDrinking({ options, prefs, onToggle }: any) {
  return (
    <PreferenceBlock title="Drinking">
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
