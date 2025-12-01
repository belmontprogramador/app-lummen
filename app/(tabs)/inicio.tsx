// src/app/(tabs)/inicio.tsx

import { useEffect, useState, useCallback, useContext, useRef } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { FeedAPI } from "@/service/feed";
import { AuthContext } from "@/context/AuthContext";

import BottomSheetPlans from "@/components/modals/BottomSheetPlans";
import FullUserView from "@/components/ComponentsInicio/FullUserView";

import { checkAccess } from "@/utils/checkAccess";
import { useTranslation } from "react-i18next";

export default function Inicio() {
  useAuthGuard();

  const { t } = useTranslation();
  const { user, refreshUser } = useContext(AuthContext);

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const screenWidth = Dimensions.get("window").width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );

  useEffect(() => {
    if (!user) return;

    const blockScreen = checkAccess(user, "feed_list_free");

    if (blockScreen) {
      setLoading(false);
      return;
    }

    loadUsers();
  }, [user]);

  async function loadUsers() {
    try {
      setLoading(true);
      setErrorKey(null);

      const isPremiumRoute =
        user?.plan?.allowedRoutes?.includes("feed_list_premium");

      const res = await FeedAPI.list(1, 20, isPremiumRoute);

      setUsers(res?.data?.items || []);
    } catch (e) {
      setErrorKey("inicio.errors.loadFeed");
    } finally {
      setLoading(false);
    }
  }

  // ✅ AGORA O SWIPE VAI PARA A ESQUERDA
  const skipUser = () => {
    Animated.timing(scrollX, {
      toValue: -screenWidth, // ⬅️ AQUI FOI CORRIGIDO
      duration: 220,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setUsers((prev) => prev.slice(1));
      scrollX.setValue(0);
      scrollRef.current?.scrollTo({ x: 0, animated: false });
    });
  };

  if (loading) {
    return (
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>{t("inicio.loading")}</Text>
      </View>
    );
  }

  if (errorKey) {
    return (
      <View style={{ marginTop: 40, padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {t(errorKey)}
        </Text>
      </View>
    );
  }

  const blockScreen = checkAccess(user, "feed_list_free");
  if (blockScreen) {
    return (
      <>
        {blockScreen}
        <BottomSheetPlans
          visible={showPlansModal}
          onClose={() => setShowPlansModal(false)}
        />
      </>
    );
  }

  if (!users.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{t("inicio.emptyFeed")}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {users.map((u) => (
        <Animated.View
          key={u.id}
          style={{
            width: screenWidth,
            transform: [{ translateX: scrollX }],
          }}
        >
          <FullUserView
            user={u}
            onLike={skipUser}
            onDislike={skipUser}
            onSkip={skipUser}
            onSuperLike={() => {
              console.log(t("inicio.superLikeLog"));
              skipUser();
            }}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
}
