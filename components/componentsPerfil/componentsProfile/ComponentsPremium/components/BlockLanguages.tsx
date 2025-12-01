import { View } from "react-native";
import { useTranslation } from "react-i18next"; // ✅ ADICIONADO
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockLanguages({ enums = {}, form = {}, onToggle = () => {} }: any) {
  const { t } = useTranslation(); // ✅ ADICIONADO

  return (
    <View>
      <PreferenceBlock title={t("profile.languages.title")}>
        {(enums.Language || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.languages || []).includes(o.value)}  // ✅ Mantém persistência correta
            onPress={() => onToggle("languages", o.value)}    // ✅ Envia campo correto pro backend
          />
        ))}
      </PreferenceBlock>
    </View>
  );
}
