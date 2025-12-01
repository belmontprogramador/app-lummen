import { View } from "react-native";
import { useTranslation } from "react-i18next"; // ✅ ADICIONADO
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockLifestyle({ enums = {}, form = {}, onToggle = () => {} }: any) {
  const { t } = useTranslation(); // ✅ ADICIONADO

  return (
    <View>
      {/* ✅ PETS */}
      <PreferenceBlock title={t("profile.lifestyle.pets")}>
        {(enums.PetsPreference || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.pets || []).includes(o.value)}   // ✅ campo correto
            onPress={() => onToggle("pets", o.value)}     // ✅ campo correto
          />
        ))}
      </PreferenceBlock>

      {/* ✅ SMOKING */}
      <PreferenceBlock title={t("profile.lifestyle.smoking")}>
        {(enums.SmokingStatus || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.smoking || []).includes(o.value)}
            onPress={() => onToggle("smoking", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* ✅ DRINKING */}
      <PreferenceBlock title={t("profile.lifestyle.drinking")}>
        {(enums.DrinkingStatus || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.drinking || []).includes(o.value)}
            onPress={() => onToggle("drinking", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* ✅ ACTIVITY LEVEL */}
      <PreferenceBlock title={t("profile.lifestyle.activityLevel")}>
        {(enums.ActivityFrequency || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.activityLevel || []).includes(o.value)}
            onPress={() => onToggle("activityLevel", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* ✅ COMMUNICATION */}
      <PreferenceBlock title={t("profile.lifestyle.communication")}>
        {(enums.CommunicationStyle || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.communication || []).includes(o.value)}
            onPress={() => onToggle("communication", o.value)}
          />
        ))}
      </PreferenceBlock>
    </View>
  );
}
