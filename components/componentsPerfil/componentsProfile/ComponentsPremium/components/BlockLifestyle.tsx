// src/components/userProfile/BlockLifestyle.tsx
import { View } from "react-native";
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockLifestyle({ enums = {}, form = {}, onToggle = () => {} }: any) {
  return (
    <View>
      <PreferenceBlock title="Preferred Pets">
        {(enums.PetsPreference || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredPets || []).includes(o.value)}
            onPress={() => onToggle("preferredPets", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Preferred Smoking">
        {(enums.SmokingStatus || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredSmoking || []).includes(o.value)}
            onPress={() => onToggle("preferredSmoking", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Preferred Drinking">
        {(enums.DrinkingStatus || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredDrinking || []).includes(o.value)}
            onPress={() => onToggle("preferredDrinking", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Preferred Activity Level">
        {(enums.ActivityFrequency || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredActivityLevel || []).includes(o.value)}
            onPress={() => onToggle("preferredActivityLevel", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Preferred Communication Style">
        {(enums.CommunicationStyle || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredCommunication || []).includes(o.value)}
            onPress={() => onToggle("preferredCommunication", o.value)} />
        ))}
      </PreferenceBlock>
    </View>
  );
}
