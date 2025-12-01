import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function UserPreferencesView({ preference }: any) {
  const { t } = useTranslation();
  const pref = preference || {};

  // ❌ Campos técnicos que NUNCA devem aparecer
  const hiddenPrefKeys = ["userId", "createdAt", "updatedAt"];

  const preferenceKeys = Object.keys(pref).filter(
    (key) => !hiddenPrefKeys.includes(key)
  );

  // ✅ Labels via i18n
  const labels: any = {
    preferredGenders: t("userPreferences.fields.preferredGenders"),
    preferredOrientations: t("userPreferences.fields.preferredOrientations"),
    preferredPronouns: t("userPreferences.fields.preferredPronouns"),
    heightCm: t("userPreferences.fields.heightCm"),
    preferredIntentions: t("userPreferences.fields.preferredIntentions"),
    preferredRelationshipTypes: t("userPreferences.fields.preferredRelationshipTypes"),
    preferredZodiacs: t("userPreferences.fields.preferredZodiacs"),
    preferredPets: t("userPreferences.fields.preferredPets"),
    preferredSmoking: t("userPreferences.fields.preferredSmoking"),
    preferredDrinking: t("userPreferences.fields.preferredDrinking"),
    preferredActivityLevel: t("userPreferences.fields.preferredActivityLevel"),
    preferredCommunication: t("userPreferences.fields.preferredCommunication"),
    jobTitle: t("userPreferences.fields.jobTitle"),
    company: t("userPreferences.fields.company"),
    preferredEducationLevels: t("userPreferences.fields.preferredEducationLevels"),
    preferredLanguages: t("userPreferences.fields.preferredLanguages"),
    preferredInterestsActivities: t("userPreferences.fields.preferredInterestsActivities"),
    preferredInterestsLifestyle: t("userPreferences.fields.preferredInterestsLifestyle"),
    preferredInterestsCreativity: t("userPreferences.fields.preferredInterestsCreativity"),
    preferredInterestsSportsFitness: t("userPreferences.fields.preferredInterestsSportsFitness"),
    preferredInterestsMusic: t("userPreferences.fields.preferredInterestsMusic"),
    preferredInterestsNightlife: t("userPreferences.fields.preferredInterestsNightlife"),
    preferredInterestsTvCinema: t("userPreferences.fields.preferredInterestsTvCinema"),
    maxDistanceKm: t("userPreferences.fields.maxDistanceKm"),
    ageMin: t("userPreferences.fields.ageMin"),
    ageMax: t("userPreferences.fields.ageMax"),
  };

  const normalizeValue = (value: any) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return "—";
    }

    if (Array.isArray(value)) return value.join(", ");

    return value.toString();
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {t("userPreferences.title")}
      </Text>

      {preferenceKeys.map((key) => (
        <Text key={key} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold" }}>
            {labels[key] || key}:{" "}
          </Text>
          {normalizeValue(pref[key])}
        </Text>
      ))}
    </View>
  );
}
