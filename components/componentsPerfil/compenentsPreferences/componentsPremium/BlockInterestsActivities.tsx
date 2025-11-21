// src/components/.../BlockInterestsActivities.tsx
import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";
import { View } from "react-native";

interface Props {
  options: any[];
  prefs: string[];
  onToggle: (value: string) => void;
}

export default function BlockInterestsActivities({ options = [], prefs = [], onToggle }: Props) {
  return (
    <PreferenceBlock title="Interests — Activities">
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={prefs.includes(o.value)}
            onPress={() => onToggle(o.value)}
          />
        ))}
      </View>
    </PreferenceBlock>
  );
}
