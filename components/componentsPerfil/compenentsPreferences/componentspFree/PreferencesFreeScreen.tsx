// src/app/(tabs)/preferences-free.tsx

import { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { PreferencesAPI } from "@/service/preferences";
import { AuthContext } from "@/context/AuthContext";

import { checkAccess } from "@/utils/checkAccess";

// Componentes de UI
import AgeRange from "@/components/componentsPerfil/compenentsPreferences/componentspFree/AgeRange";
import DistanceSlider from "@/components/componentsPerfil/compenentsPreferences/componentspFree/DistanceSlider";
import GenderSelector from "@/components/componentsPerfil/compenentsPreferences/componentspFree/GenderSelector";
import OrientationSelector from "@/components/componentsPerfil/compenentsPreferences/componentspFree/OrientationSelector";

// Modal de confirmação
import ConfirmModal from "@/components/modals/ConfirmModal";

export default function PreferencesFreeScreen() {
  const { user, refreshUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any>(null);

  const [prefs, setPrefs] = useState<any>({
    maxDistanceKm: 50,
    ageMin: 18,
    ageMax: 99,
    preferredGenders: [],
    preferredOrientations: [],
  });

  const [showConfirm, setShowConfirm] = useState(false); // 👈 modal

  useFocusEffect(
  useCallback(() => {
    refreshUser();  
  }, [])
);

  useEffect(() => {
    (async () => {
      try {
        const [optRes, prefRes] = await Promise.all([
          PreferencesAPI.getOptions(),
          PreferencesAPI.get(),
        ]);

        setOptions(optRes.data);
        setPrefs(prefRes.data);
      } catch (err) {
        Alert.alert("Erro", "Falha ao carregar preferências.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    const result = await PreferencesAPI.update({
      mode: "free",
      ...prefs,
    });

    if (!result.ok) {
      if (result.error === "premium_required") {
        Alert.alert(
          "Premium necessário",
          "Este recurso é exclusivo para assinantes Premium."
        );
        return;
      }

      Alert.alert("Erro", "Falha ao salvar preferências.");
      return;
    }

    Alert.alert("Sucesso", "Preferências salvas!");
  };

  // =================================
  // 🔐 BLOQUEIO GLOBAL
  // =================================
  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  const blockScreen = checkAccess(user, "preferences_update_free");
  if (blockScreen) return blockScreen;

  // ================================
  // 🟢 TELA NORMAL
  // ================================
  return (
    <View style={{ flex: 1 }}>
      
      {/* Modal de confirmação */}
      <ConfirmModal
        visible={showConfirm}
        title="Salvar Preferências?"
        message="Deseja realmente salvar suas configurações?"
        confirmText="Salvar"
        cancelText="Cancelar"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          save(); // chama função original
        }}
      />

      <ScrollView
        style={{ flex: 1, padding: 20 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Basic Preferences
        </Text>

        <DistanceSlider
          value={prefs.maxDistanceKm}
          onChange={(v) => setPrefs({ ...prefs, maxDistanceKm: v })}
        />

        <AgeRange
          minAge={prefs.ageMin}
          maxAge={prefs.ageMax}
          onChange={(min, max) =>
            setPrefs({ ...prefs, ageMin: min, ageMax: max })
          }
        />

        {options?.Gender && (
          <GenderSelector
            options={options.Gender}
            selected={prefs.preferredGenders}
            onChange={(values) =>
              setPrefs({ ...prefs, preferredGenders: values })
            }
          />
        )}

        {options?.SexualOrientation && (
          <OrientationSelector
            options={options.SexualOrientation}
            selected={prefs.preferredOrientations}
            onChange={(values) =>
              setPrefs({ ...prefs, preferredOrientations: values })
            }
          />
        )}

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          onPress={() => setShowConfirm(true)} // 👈 abre o modal
          style={{
            backgroundColor: "black",
            padding: 15,
            borderRadius: 8,
            marginTop: 30,
            marginBottom: 60,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
