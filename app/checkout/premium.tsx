// src/app/(checkout)/premium.tsx

import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function PremiumCheckout() {
  const { t } = useTranslation(); // ✅ i18n

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{t("premiumCheckout.title")}</Text>
    </View>
  );
}
