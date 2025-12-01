
import { View } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { checkAccess } from "@/utils/checkAccess";

import LikesRecebidos from "./LikesRecebidos";
import LikesEnviados from "./LikesEnviados";
import { useTranslation } from "react-i18next";

export default function LikesSection() {
  const { t } = useTranslation(); // ✅ i18n
  const { user } = useContext(AuthContext);

  // 🔥 1. Bloqueio base: o usuário precisa ter a rota "like_received"
  const blocked = checkAccess(user, "like_received");

  useEffect(() => {
    console.log(t("likesSection.logs.userPlan"), user?.plan);
  }, [user]);

  // ✅ Caso plano não permita visualizar curtidas → retorna o bloqueio
  if (blocked) {
    console.log(t("likesSection.logs.blocked"));
    return blocked;
  }

  // 🔥 2. Verifica se pode ver likes enviados
  const canSeeSent =
    user?.isPaid === true ||
    user?.plan?.allowedRoutes?.includes("like_sent");

  useEffect(() => {
    console.log(t("likesSection.logs.canSeeSent"), canSeeSent);
  }, [canSeeSent]);

  return (
    <View
      style={{ flex: 1 }}
      accessibilityLabel={t("likesSection.container")}
    >
      {/* ✅ Sempre pode ver quem curtiu ele SE o plano permitir essa rota */}
      <LikesRecebidos />

      {/* ✅ Pode ver curtidas enviadas apenas premium */}
      {canSeeSent && <LikesEnviados />}
    </View>
  );
}
