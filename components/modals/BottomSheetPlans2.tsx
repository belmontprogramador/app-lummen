import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { router } from "expo-router";

const screenHeight = Dimensions.get("window").height;

export default function BottomSheetPlans2({ visible, onClose }: any) {
  if (!visible) return null; // desmonta completamente

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const TARGET_HEIGHT = screenHeight * 0.5;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight - TARGET_HEIGHT,
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
      onClose(); // desmonta modal no final da animação
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      {/* OVERLAY */}
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

      {/* BOTTOM SHEET */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: TARGET_HEIGHT,
          bottom: 0,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          transform: [{ translateY: slideAnim }],
        }}
      >
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
          Upgrade to Premium
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginBottom: 25,
            color: "#555",
          }}
        >
          Unlock all premium preferences & boost your profile!
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
            See Plans
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
