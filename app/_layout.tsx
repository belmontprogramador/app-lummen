import "../service/i18n/i18n";
import { Stack, usePathname } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import OneSignal from "react-native-onesignal";
import { useEffect } from "react";
import { View } from "react-native";
import { GlobalHeader } from "@/components/headers/GlobalHeader";
import { AereaShowHeader } from "@/components/headers/AereaShowHeader";

// IMPORTANTE 👇👇👇
import { I18nextProvider } from "react-i18next";
import i18n from "../service/i18n/i18n";

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    OneSignal.setAppId("SEU-ONESIGNAL-APP-ID");
    OneSignal.promptForPushNotificationsWithUserResponse();
  }, []);

  const isAereaShow = pathname === "/aereashow";

  return (
    <AuthProvider>
      {/* PROVIDER DO I18N 👇 */}
      <I18nextProvider i18n={i18n}>
        <View style={{ flex: 1 }}>

          {isAereaShow ? (
            <AereaShowHeader />
          ) : (
            <GlobalHeader />
          )}

          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </I18nextProvider>
    </AuthProvider>
  );
}
