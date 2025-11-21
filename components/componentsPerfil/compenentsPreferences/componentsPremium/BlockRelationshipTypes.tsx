import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";

export default function BlockRelationshipTypes({
  options,
  prefs,
  onToggle,
}: any) {
  return (
    <PreferenceBlock title="Relationship Types">
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
