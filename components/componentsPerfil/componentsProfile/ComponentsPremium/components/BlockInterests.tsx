import { View } from "react-native";
import { useTranslation } from "react-i18next"; // ✅ ADICIONADO
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockInterests({ enums = {}, form = {}, onToggle = () => {} }: any) {
  const { t } = useTranslation(); // ✅ ADICIONADO

  return (
    <View>
      <PreferenceBlock title={t("profile.interests.activities")}>
        {(enums.InterestActivity || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsActivities || []).includes(o.value)}
            onPress={() => onToggle("interestsActivities", o.value)}
          />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.interests.lifestyle")}>
        {(enums.InterestLifestyle || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsLifestyle || []).includes(o.value)}
            onPress={() => onToggle("interestsLifestyle", o.value)}
          />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.interests.creativity")}>
        {(enums.InterestCreativity || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsCreativity || []).includes(o.value)}
            onPress={() => onToggle("interestsCreativity", o.value)}
          />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.interests.sportsFitness")}>
        {(enums.InterestSports || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsSportsFitness || []).includes(o.value)}
            onPress={() => onToggle("interestsSportsFitness", o.value)}
          />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.interests.music")}>
        {(enums.InterestMusic || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsMusic || []).includes(o.value)}
            onPress={() => onToggle("interestsMusic", o.value)}
          />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.interests.nightlife")}>
        {(enums.InterestNightlife || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsNightlife || []).includes(o.value)}
            onPress={() => onToggle("interestsNightlife", o.value)}
          />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title={t("profile.interests.tvCinema")}>
        {(enums.InterestTvCinema || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.interestsTvCinema || []).includes(o.value)}
            onPress={() => onToggle("interestsTvCinema", o.value)}
          />
        ))}
      </PreferenceBlock>
    </View>
  );
}
