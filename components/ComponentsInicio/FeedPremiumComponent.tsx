import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function FeedPremiumComponent({ user }: any) {
  const { t } = useTranslation();
  const profile = user.profile || {};

  const premiumKeys = [
  "bio",
  "birthday",
  "gender",
  "orientation",
  "city",
  "state",
  "country",
  "pronoun",
  "intention",
  "relationshipType",

  "jobTitle",
  "company",
  "heightCm",
  "educationLevel",
  "languages",
  "pets",
  "smoking",
  "drinking",
  "activityLevel",
  "communication",
  "zodiac",
];


  // ✅ AGORA 100% VIA i18n
  const labels: any = {
  bio: t("feedPremium.bio"),
  birthday: t("feedPremium.birthday"),
  gender: t("feedPremium.gender"),
  orientation: t("feedPremium.orientation"),
  city: t("feedPremium.city"),
  state: t("feedPremium.state"),
  country: t("feedPremium.country"),
  pronoun: t("feedPremium.pronoun"),
  intention: t("feedPremium.intention"),
  relationshipType: t("feedPremium.relationshipType"),

  jobTitle: t("feedPremium.jobTitle"),
  company: t("feedPremium.company"),
  heightCm: t("feedPremium.heightCm"),

  educationLevel: t("feedPremium.educationLevel"),
  languages: t("feedPremium.languages"),
  pets: t("feedPremium.pets"),
  smoking: t("feedPremium.smoking"),
  drinking: t("feedPremium.drinking"),
  activityLevel: t("feedPremium.activityLevel"),
  communication: t("feedPremium.communication"),
  zodiac: t("feedPremium.zodiac"),
};


  const getAge = (date: string) => {
    if (!date) return null;
    const d = new Date(date);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();

    if (
      now.getMonth() < d.getMonth() ||
      (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())
    ) {
      age--;
    }

    return age;
  };

  const normalizeValue = (key: string, value: any) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return "—";
    }

    if (key === "birthday") {
      return `${getAge(value)} ${t("feedPremium.years")}`;
    }

    if (Array.isArray(value)) return value.join(", ");

    return value.toString();
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {t("feedPremium.about")}
      </Text>

      {premiumKeys.map((key) => (
        <Text key={key} style={{ marginBottom: 6 }}>
          <Text style={{ fontWeight: "bold" }}>
            {labels[key] || key}:{" "}
          </Text>
          {normalizeValue(key, profile[key])}
        </Text>
      ))}
    </View>
  );
}
