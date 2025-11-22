// src/app/(tabs)/profileFull.tsx
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import { Stack } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { userProfilesService } from "@/service/userProfilesService";
import { checkAccess } from "@/utils/checkAccess"; // ✅ Importa o bloqueio de rota

// 🔹 Subcomponentes
import ProfileBasic from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profileBasic";
import ProfilePremium from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profilePremium";

export default function PerfilCompleto() {
  useAuthGuard();

  const { user: authUser, refreshUser } = useContext(AuthContext);

  const [form, setForm] = useState<any>({});
  const [enums, setEnums] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Rotas liberadas no plano
  const allowed = authUser?.plan?.allowedRoutes || [];
  const canEditFree = allowed.includes("profile_update_free");
  const canEditPremium = allowed.includes("profile_update_premium");

  // 🔹 Carrega enums + perfil apenas uma vez (quando a tela é montada)
  useEffect(() => {
    (async () => {
      try {
        await refreshUser(); // 🔥 Atualiza dados do usuário e plano uma única vez
        const [{ data: enumsRes }, { data: profileRes }] = await Promise.all([
          userProfilesService.getProfileEnums(),
          userProfilesService.getMyProfile(),
        ]);
        setEnums(enumsRes || {});
        setForm(profileRes || {});
      } catch (e) {
        console.log("❌ Erro ao carregar dados:", e);
        Alert.alert("Erro", "Não foi possível carregar as informações do perfil.");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // ✅ Sem dependências → executa apenas na montagem

  // Atualiza valor simples
  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  // Alterna múltiplos valores (arrays)
  const handleToggle = (field: string, value: string) => {
    setForm((prev: any) => {
      const current: string[] = prev[field] || [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  // Salvar tudo (respeitando o nível)
 // Salvar tudo (respeitando o nível)
const handleSave = async () => {
  try {
    setSaving(true);

    console.log("📦 Payload enviado para o backend:", form); // <--- AQUI

    if (canEditPremium) {
      await userProfilesService.updateProfilePremium(form);
    } else if (canEditFree) {
      await userProfilesService.updateProfileFree(form);
    } else {
      Alert.alert("Acesso negado", "Seu plano não permite editar o perfil.");
      return;
    }

    Alert.alert("✅ Sucesso", "Perfil atualizado com sucesso!");
  } catch (e) {
    console.log("❌ Erro ao salvar perfil:", e);
    Alert.alert("Erro", "Não foi possível salvar o perfil.");
  } finally {
    setSaving(false);
  }
};


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ✅ Bloqueio movido para dentro da renderização (evita erro de hooks)
  const blocked =
    !canEditFree && !canEditPremium
      ? checkAccess(authUser, "profile_update_free")
      : null;

  if (blocked) return blocked;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Profile — Full",
          headerShown: true,
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* 🔹 Profile Basic (liberado se tiver profile_update_free) */}
        {canEditFree && (
          <ProfileBasic
            enums={enums}
            form={form}
            onChange={handleChange}
            onToggle={handleToggle}
          />
        )}

        <View style={{ height: 24 }} />

        {/* 🔹 Profile Premium (liberado se tiver profile_update_premium) */}
        {canEditPremium && (
          <ProfilePremium
            enums={enums}
            form={form}
            onChange={handleChange}
            onToggle={handleToggle}
          />
        )}
      </ScrollView>

      {/* 🔹 Botão de salvar fixo */}
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
            {saving ? "Salvando..." : "Salvar Tudo"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
