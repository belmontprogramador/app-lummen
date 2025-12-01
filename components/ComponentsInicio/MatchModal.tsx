// src/components/ComponentsInicio/MatchModal.tsx

import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MatchModal({ visible, user1, user2, onClose }: any) {
  const { t } = useTranslation(); // ✅ i18n

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.75)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
        accessibilityLabel={t("matchModal.container")}
      >
        {/* 🔥 CÍRCULOS NEON (VISUAL) */}
        <View
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: "rgba(255,0,255,0.25)",
            top: "12%",
            left: "10%",
            shadowColor: "#ff00ff",
            shadowOpacity: 0.9,
            shadowRadius: 60,
            elevation: 20,
          }}
        />

        <View
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: 175,
            backgroundColor: "rgba(0,255,255,0.25)",
            bottom: "10%",
            right: "10%",
            shadowColor: "#00eaff",
            shadowOpacity: 0.9,
            shadowRadius: 60,
            elevation: 20,
          }}
        />

        {/* CARD */}
        <View
          style={{
            width: "100%",
            maxWidth: 380,
            backgroundColor: "rgba(30,30,30,0.7)",
            padding: 25,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",
            shadowColor: "#00eaff",
            shadowOpacity: 0.4,
            shadowRadius: 25,
            elevation: 15,
            alignItems: "center",
          }}
        >
          {/* ✅ TÍTULO INTERNACIONALIZADO */}
          <Text
            style={{
              color: "#fff",
              fontSize: 34,
              fontWeight: "bold",
              marginBottom: 20,
              textShadowColor: "#00eaff",
              textShadowRadius: 10,
            }}
          >
            {t("matchModal.title")}
          </Text>

          {/* FOTOS */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginBottom: 25,
            }}
          >
            <Image
              source={{ uri: `https://botgrupo.lummen-app.com${user1?.photo}` }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: "#ff00ff",
              }}
              accessibilityLabel={t("matchModal.user1Photo")}
            />

            <Image
              source={{ uri: `https://botgrupo.lummen-app.com${user2?.photo}` }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: "#00eaff",
              }}
              accessibilityLabel={t("matchModal.user2Photo")}
            />
          </View>

          {/* ✅ TEXTO DO MATCH INTERNACIONALIZADO */}
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {t("matchModal.couple", {
              user1: user1?.name,
              user2: user2?.name,
            })}
          </Text>

          {/* ✅ BOTÃO IR PARA O CHAT */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              router.push("/(tabs)/chat");
            }}
            style={{
              backgroundColor: "#ff3c78",
              paddingVertical: 14,
              paddingHorizontal: 50,
              borderRadius: 30,
              shadowColor: "#ff3c78",
              shadowOpacity: 0.6,
              shadowRadius: 15,
              elevation: 10,
            }}
            accessibilityLabel={t("matchModal.goToChat")}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              {t("matchModal.goToChat")}
            </Text>
          </TouchableOpacity>

          {/* ✅ CONTINUAR NAVEGANDO */}
          <TouchableOpacity
            onPress={onClose}
            style={{ marginTop: 18 }}
            accessibilityLabel={t("matchModal.continue")}
          >
            <Text style={{ color: "#ddd", fontSize: 16 }}>
              {t("matchModal.continue")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
