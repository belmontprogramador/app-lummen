import { View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { checkAccess } from "@/utils/checkAccess";

import LikesRecebidos from "./LikesRecebidos";
import LikesEnviados from "./LikesEnviados";

export default function LikesSection() {
  const { user } = useContext(AuthContext);

  // 🔥 1. Bloqueio base: o usuário precisa ter a rota "like_received"
  const blocked = checkAccess(user, "like_received");

  // Se o plano não permite visualizar curtidas → mostra tela de bloqueio
  if (blocked) return blocked;

  // 🔥 2. Verifica se pode ver likes enviados
  const canSeeSent =
    user?.isPaid === true ||
    user?.plan?.allowedRoutes?.includes("like_sent");

  return (
    <View style={{ flex: 1 }}>
      {/* Sempre pode ver quem curtiu ele SE o plano permitir essa rota */}
      <LikesRecebidos />

      {/* Pode ver curtidas enviadas apenas premium */}
      {canSeeSent && <LikesEnviados />}
    </View>
  );
}
