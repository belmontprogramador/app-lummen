import { View, TextInput } from "react-native";
import { useTranslation } from "react-i18next"; // ✅ ADICIONADO
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockWorkEducation({
  enums = {},
  form = {},
  onChange = () => {},
  onToggle = () => {},
}: any) {
  const { t } = useTranslation(); // ✅ ADICIONADO

  return (
    <View>
      <PreferenceBlock title={t("profile.work.jobTitle")}>
        <TextInput
          value={form.jobTitle || ""}
          placeholder={t("profile.work.jobTitlePlaceholder")}
          onChangeText={(v) => onChange("jobTitle", v)}
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.work.company")}>
        <TextInput
          value={form.company || ""}
          placeholder={t("profile.work.companyPlaceholder")}
          onChangeText={(v) => onChange("company", v)}
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />
      </PreferenceBlock>

      {/* ✅ EDUCATION LEVEL — CAMPO CORRETO */}
      <PreferenceBlock title={t("profile.work.educationLevel")}>
        {(enums.EducationLevel || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label} // label já vem traduzido do backend
            active={(form.educationLevel || []).includes(o.value)}
            onPress={() => onToggle("educationLevel", o.value)}
          />
        ))}
      </PreferenceBlock>
    </View>
  );
}
