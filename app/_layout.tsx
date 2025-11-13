import { Stack, usePathname } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import OneSignal from "react-native-onesignal";
import { useEffect } from "react";
import { View } from "react-native";
import { GlobalHeader } from "@/components/GlobalHeader";
import { AereaShowHeader } from "@/components/AereaShowHeader";

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    OneSignal.setAppId("SEU-ONESIGNAL-APP-ID");
    OneSignal.promptForPushNotificationsWithUserResponse();

    OneSignal.setNotificationOpenedHandler((result) => {
      console.log("NOTIFICAÇÃO ABERTA:", result);
    });

    OneSignal.getDeviceState().then((state) => {
      console.log("Player ID:", state?.userId);
      console.log("Push Token:", state?.pushToken);
    });
  }, []);

  // 🎯 Se for a página /aereashow → usar header exclusivo
  const isAereaShow = pathname === "/aereashow";

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>

        {/* HEADER DINÂMICO */}
        {isAereaShow ? (
          <AereaShowHeader />
        ) : (
          <GlobalHeader />
        )}

        {/* Conteúdo das rotas */}
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </AuthProvider>
  );
}
