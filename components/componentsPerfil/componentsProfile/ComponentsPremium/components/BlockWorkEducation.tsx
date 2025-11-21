// src/components/userProfile/BlockWorkEducation.tsx
import { View, TextInput } from "react-native";
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockWorkEducation({ enums = {}, form = {}, onChange = () => {}, onToggle = () => {} }: any) {
  return (
    <View>
      <PreferenceBlock title="Job Title">
        <TextInput
          value={form.jobTitle || ""}
          onChangeText={(v) => onChange("jobTitle", v)}
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />
      </PreferenceBlock>

      <PreferenceBlock title="Company">
        <TextInput
          value={form.company || ""}
          onChangeText={(v) => onChange("company", v)}
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />
      </PreferenceBlock>

      <PreferenceBlock title="Preferred Education Levels">
        {(enums.EducationLevel || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredEducationLevels || []).includes(o.value)}
            onPress={() => onToggle("preferredEducationLevels", o.value)} />
        ))}
      </PreferenceBlock>
    </View>
  );
}
