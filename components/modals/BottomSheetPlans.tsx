// src/components/BottomSheetPlans.tsx

import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next"; // ✅ ADICIONADO

const screenHeight = Dimensions.get("window").height;

export default function BottomSheetPlans({ visible, onClose }: any) {
  const { t } = useTranslation(); // ✅ ADICIONADO

  if (!visible) return null;

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: screenHeight,
        justifyContent: "flex-end",
      }}
    >
      {/* 🔥 OVERLAY ESCURA */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: overlayOpacity,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={closeSheet}
        />
      </Animated.View>

      {/* 🔥 CONTEÚDO DO MODAL */}
      <Animated.View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          transform: [{ translateY: slideAnim }],
          maxHeight: screenHeight * 0.9,
        }}
      >
        {/* BOTÃO X (FECHA) */}
        <TouchableOpacity
          onPress={closeSheet}
          style={{ alignSelf: "flex-end", padding: 10 }}
        >
          <Text style={{ fontSize: 20 }}>✕</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {t("plans.upgradeTitle")}
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginBottom: 25,
            color: "#555",
          }}
        >
          {t("plans.upgradeSubtitle")}
        </Text>

        <TouchableOpacity
          onPress={() => {
            closeSheet();
            router.push("/plans");
          }}
          style={{
            backgroundColor: "#7b2cff",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("plans.seePlans")}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 25 }} />
      </Animated.View>
    </View>
  );
}
