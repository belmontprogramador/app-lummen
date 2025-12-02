// src/components/ComponentsInicio/SwipeUserCard.tsx

import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { useTranslation } from "react-i18next";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export default function SwipeUserCard({ user, onSkip }: any) {
  const { t } = useTranslation();

  const allPhotos = useMemo(() => {
    const arr: string[] = [];
    if (user.photo) arr.push(user.photo);
    if (user.photos?.length > 0) {
      arr.push(...user.photos.map((p: any) => p.url));
    }
    return arr;
  }, [user]);

  const [photoIndex, setPhotoIndex] = useState(0);
  const translateX = new Animated.Value(0);

  function nextPhoto() {
    setPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  }

  function onGestureEvent(event: any) {
    translateX.setValue(event.nativeEvent.translationX);
  }

  function onHandlerStateChange(event: any) {
    if (event.nativeEvent.state === State.END) {
      const dx = event.nativeEvent.translationX;

      console.log("👉 Swipe detectado! dx =", dx);

      if (dx < -80) {
        console.log("⏭️ Swipe LEFT → SKIP acionado para", user.id);
        onSkip?.(user.id);
      }

      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }

  const age = useMemo(() => {
    if (!user.profile?.birthday) return "";
    const birth = new Date(user.profile.birthday);
    const now = new Date();
    let a = now.getFullYear() - birth.getFullYear();
    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
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
        <View style={{ width: 330, height: 330, marginBottom: 15 }}>
          <TouchableOpacity onPress={nextPhoto} style={{ flex: 1 }}>
            <Image
              source={{
                uri: `https://botgrupo.lummen-app.com${allPhotos[photoIndex]}`,
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                backgroundColor: "#ccc",
              }}
            />
          </TouchableOpacity>
        </View>

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
