// src/components/userProfile/BlockLanguages.tsx
import { View } from "react-native";
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockLanguages({ enums = {}, form = {}, onToggle = () => {} }: any) {
  return (
    <View>
      <PreferenceBlock title="Preferred Languages">
        {(enums.Language || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredLanguages || []).includes(o.value)}
            onPress={() => onToggle("preferredLanguages", o.value)} />
        ))}
      </PreferenceBlock>
    </View>
  );
}
