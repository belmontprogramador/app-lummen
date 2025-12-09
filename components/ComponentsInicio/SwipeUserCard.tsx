// src/components/ComponentsInicio/SwipeUserCard.tsx

import { useState, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { useTranslation } from "react-i18next";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const BASE_URL = "https://botgrupo.lummen-app.com";

export default function SwipeUserCard({ user, onSkip }: any) {
  const { t } = useTranslation();

  /** ------------------------------------------
   * Prepara fotos com URL absoluta
   * -----------------------------------------*/
  const allPhotos = useMemo(() => {
    const arr: string[] = [];
    if (user.photo) arr.push(`${BASE_URL}${user.photo}`);
    if (user.photos?.length > 0) {
      arr.push(...user.photos.map((p: any) => `${BASE_URL}${p.url}`));
    }
    return arr.length > 0
      ? arr
      : ["https://via.placeholder.com/400x400.png?text=No+Photo"];
  }, [user]);

  const [photoIndex, setPhotoIndex] = useState(0);

  function nextPhoto() {
    setPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  }

  /** ------------------------------------------
   * Swipe
   * -----------------------------------------*/
  const translateX = useRef(new Animated.Value(0)).current;

  function onGestureEvent(event: any) {
    translateX.setValue(event.nativeEvent.translationX);
  }

  function onHandlerStateChange(event: any) {
    if (event.nativeEvent.state === State.END) {
      const dx = event.nativeEvent.translationX;

      // Swipe LEFT → skip
      if (dx < -90) {
        console.log("⏭ SKIP pelo swipe →", user.id);
        onSkip?.(user.id);
      }

      // Reseta posição
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }

  /** ------------------------------------------
   * Idade + cidade
   * -----------------------------------------*/
  const age = useMemo(() => {
    if (!user.profile?.birthday) return "";
    const birth = new Date(user.profile.birthday);
    const now = new Date();
    let a = now.getFullYear() - birth.getFullYear();
    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() &&
        now.getDate() < birth.getDate())
    ) {
      a--;
    }
    return a;
  }, [user]);

  const city = user.profile?.city || "";

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          alignItems: "center",
        }}
      >
        {/* FOTO */}
        <View style={{ width: 330, height: 330, marginBottom: 15 }}>
          <TouchableOpacity onPress={nextPhoto} style={{ flex: 1 }}>
            <Image
              source={{ uri: allPhotos[photoIndex] }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                backgroundColor: "#ccc",
              }}
            />
          </TouchableOpacity>
        </View>

        {/* NOME + IDADE */}
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
          {user.name} {age ? `, ${age} ${t("swipeUserCard.years")}` : ""}
        </Text>

        {city !== "" && (
          <Text style={{ fontSize: 18, color: "#444", marginTop: 4 }}>
            {city}
          </Text>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
}
