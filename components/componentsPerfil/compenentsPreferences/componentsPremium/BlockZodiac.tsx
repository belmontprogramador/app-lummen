// src/components/premiumPreferences/BlockZodiac.tsx
import PreferenceBlock from "./PreferenceBlock";
import PreferenceChip from "./PreferenceChip";
import { View } from "react-native";

export default function BlockZodiac({ options, prefs, onToggle }: any) {

  const list = Array.isArray(options)
    ? options
    : Object.entries(options || {}).map(([value, label]) => ({ value, label }));

  return (
    <PreferenceBlock title="Zodiac Signs">
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {list.map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={prefs?.includes(o.value)}
            onPress={() => onToggle(o.value)}
          />
        ))}
      </View>
    </PreferenceBlock>
  );
}
