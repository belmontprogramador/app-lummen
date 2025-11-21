// src/app/(tabs)/PreferencesPremiumScreen.tsx

import { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { PreferencesAPI } from "@/service/preferences";
import { AuthContext } from "@/context/AuthContext";
import { useFocusEffect, router } from "expo-router";

import BlocksAllPremium from "@/components/componentsPerfil/compenentsPreferences/componentsPremium/BlocksAllPremium";
import StatusModal from "@/components/modals/StatusModal";

// 👉 NEW IMPORT
import { checkAccess } from "@/utils/checkAccess";

export default function PreferencesPremiumScreen() {
  const { user, refreshUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any>(null);
  const [prefs, setPrefs] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

 useFocusEffect(
  useCallback(() => {
    refreshUser();  
  }, [])
);


  useEffect(() => {
    (async () => {
      try {
        const [optsRes, prefRes] = await Promise.all([
          PreferencesAPI.getOptions(),
          PreferencesAPI.get(),
        ]);

        setOptions(optsRes.data);
        setPrefs(prefRes.data);
      } catch {
        Alert.alert("Erro", "Falha ao carregar preferências premium.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------------------
  // 🔥 NOVO BLOQUEIO
  // ---------------------------
  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  const blockedScreen = checkAccess(user, "preferences_update_premium");
  if (blockedScreen) return blockedScreen;
  // ---------------------------

  const toggle = (field: string, value: string) => {
    setPrefs((prev: any) => {
      const list = prev[field] || [];
      return list.includes(value)
        ? { ...prev, [field]: list.filter((v: string) => v !== value) }
        : { ...prev, [field]: [...list, value] };
    });
  };

  const save = async () => {
    const result = await PreferencesAPI.update({
      mode: "premium",
      ...prefs,
    });

    if (!result.ok) {
      Alert.alert("Erro", "Não foi possível salvar.");
      return;
    }

    setModalVisible(true);
  };

  return (
    <>
      <StatusModal
        visible={modalVisible}
        title="Preferências salvas!"
        message="Suas preferências premium foram atualizadas com sucesso."
        buttonText="OK"
        onClose={() => setModalVisible(false)}
      />

      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Premium Preferences
        </Text>

        <BlocksAllPremium options={options} prefs={prefs} toggle={toggle} />

        <TouchableOpacity
          onPress={save}
          style={{
            backgroundColor: "#7b2cff",
            padding: 15,
            borderRadius: 12,
            marginTop: 35,
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            Save Premium Preferences
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
