// src/components/compenentsPreferences/componentsPremium/BlockPronouns.tsx

import { View } from "react-native";
import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";

type Props = {
  options: any[] | undefined;
  prefs: string[] | undefined;
  onToggle: (value: string) => void;
};

export default function BlockPronouns({ options, prefs, onToggle }: Props) {
  // garante que sempre trabalhamos com arrays
  const list = Array.isArray(options) ? options : [];
  const selected = Array.isArray(prefs) ? prefs : [];

  return (
    <PreferenceBlock title="Preferred Pronouns">
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {list.map((o) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={selected.includes(o.value)}
            onPress={() => onToggle(o.value)}
          />
        ))}
      </View>
    </PreferenceBlock>
  );
}
