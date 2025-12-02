import "../service/i18n/i18n";
import { Stack, usePathname } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import OneSignal from "react-native-onesignal";
import { useEffect } from "react";
import { View } from "react-native";
import { GlobalHeader } from "@/components/headers/GlobalHeader";
import { AereaShowHeader } from "@/components/headers/AereaShowHeader";
import "./global.css";


// IMPORTANTE 👇👇👇
import { I18nextProvider } from "react-i18next";
import i18n from "../service/i18n/i18n";

// 🔥 IMPORTANTE PARA O ERRO
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const pathname = usePathname();

  // useEffect(() => {
  //   OneSignal.setAppId("SEU-ONESIGNAL-APP-ID");
  //   OneSignal.promptForPushNotificationsWithUserResponse();
  // }, []);

  const isAereaShow = pathname === "/aereashow";

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>

        {/* 🔥 WRAPPER OBRIGATÓRIO PARA RESOLVER O ERRO DO DraggableFlatList */}
        <GestureHandlerRootView style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>
            {isAereaShow ? <AereaShowHeader /> : <GlobalHeader />}
            <Stack screenOptions={{ headerShown: false }} />
          </View>

        </GestureHandlerRootView>

      </I18nextProvider>
    </AuthProvider>
  );
}
