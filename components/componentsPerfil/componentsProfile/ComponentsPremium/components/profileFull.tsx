import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { userProfilesService } from "@/service/userProfilesService";
import { checkAccess } from "@/utils/checkAccess";
import { useTranslation } from "react-i18next"; // ✅ TRADUÇÃO

// ✅ MODAL DE STATUS
import StatusModal from "@/components/modals/StatusModal";

// 🔹 Subcomponentes
import ProfileBasic from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profileBasic";
import ProfilePremium from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profilePremium";

export default function PerfilCompleto() {
  useAuthGuard();

  const { t } = useTranslation(); // ✅ TRADUÇÃO
  const { user: authUser, refreshUser } = useContext(AuthContext);

  const [form, setForm] = useState<any>({});
  const [enums, setEnums] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ ESTADOS DO MODAL
  const [statusVisible, setStatusVisible] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Rotas liberadas no plano
  const allowed = authUser?.plan?.allowedRoutes || [];
  const canEditFree = allowed.includes("profile_update_free");
  const canEditPremium = allowed.includes("profile_update_premium");

  // 🔹 Carrega enums + perfil apenas uma vez
  useEffect(() => {
    (async () => {
      try {
        await refreshUser();
        const [{ data: enumsRes }, { data: profileRes }] = await Promise.all([
          userProfilesService.getProfileEnums(),
          userProfilesService.getMyProfile(),
        ]);

        setEnums(enumsRes || {});
        setForm(profileRes || {});
      } catch (e) {
        console.log("❌ Erro ao carregar dados:", e);
        setStatusTitle(t("common.error"));
        setStatusMessage(t("profile.loadError"));
        setStatusVisible(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Atualiza valor simples
  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  // Alterna múltiplos valores
  const handleToggle = (field: string, value: string) => {
    setForm((prev: any) => {
      const current: string[] = prev[field] || [];
      const exists = current.includes(value);
      const updated = exists
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [field]: updated };
    });
  };

  // ✅ SALVAR PERFIL
  const handleSave = async () => {
    try {
      setSaving(true);

      console.log("📦 Payload enviado para o backend:", form);

      if (canEditPremium) {
        await userProfilesService.updateProfilePremium(form);
      } else if (canEditFree) {
        await userProfilesService.updateProfileFree(form);
      } else {
        setStatusTitle(t("common.accessDenied"));
        setStatusMessage(t("profile.accessDenied"));
        setStatusVisible(true);
        return;
      }

      setStatusTitle(t("common.success"));
      setStatusMessage(t("profile.savedSuccess"));
      setStatusVisible(true);
    } catch (e) {
      console.log("❌ Erro ao salvar perfil:", e);

      setStatusTitle(t("common.error"));
      setStatusMessage(t("profile.saveError"));
      setStatusVisible(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>{t("common.loading")}</Text>
      </View>
    );
  }

  // ✅ Bloqueio de acesso
  const blocked =
    !canEditFree && !canEditPremium
      ? checkAccess(authUser, "profile_update_free")
      : null;

  if (blocked) return blocked;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: t("profile.fullTitle"),
          headerShown: true,
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* 🔹 Profile Basic */}
        {canEditFree && (
          <ProfileBasic
            enums={enums}
            form={form}
            onChange={handleChange}
            onToggle={handleToggle}
          />
        )}

        <View style={{ height: 24 }} />

        {/* 🔹 Profile Premium */}
        {canEditPremium && (
          <ProfilePremium
            enums={enums}
            form={form}
            onChange={handleChange}
            onToggle={handleToggle}
          />
        )}
      </ScrollView>

      {/* 🔹 Botão de salvar */}
      {(canEditFree || canEditPremium) && (
        <TouchableOpacity
          disabled={saving}
          onPress={handleSave}
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: saving ? "#999" : "#7b2cff",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {saving ? t("common.saving") : t("common.saveAll")}
          </Text>
        </TouchableOpacity>
      )}

      {/* ✅ MODAL DE STATUS */}
      <StatusModal
        visible={statusVisible}
        title={statusTitle}
        message={statusMessage}
        onClose={() => setStatusVisible(false)}
      />
    </View>
  );
}
