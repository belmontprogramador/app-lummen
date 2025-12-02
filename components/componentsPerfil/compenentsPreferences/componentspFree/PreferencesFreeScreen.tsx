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

// NOVOS BLOCOS ADICIONADOS
import BlockRelationshipTypes from "@/components/componentsPerfil/compenentsPreferences/componentsPremium/BlockRelationshipTypes";
import BlockIntentions from "@/components/componentsPerfil/compenentsPreferences/componentsPremium/BlockIntentions";

// Modal de confirmação
import ConfirmModal from "@/components/modals/ConfirmModal";

export default function PreferencesFreeScreen() {
  const { user, refreshUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any>(null);

  // Estado completo das preferências
  const [prefs, setPrefs] = useState<any>({
    maxDistanceKm: 50,
    ageMin: 18,
    ageMax: 99,
    preferredGenders: [],
    preferredOrientations: [],
    preferredRelationshipTypes: [], // ADICIONADO
    preferredIntentions: [],        // ADICIONADO
  });

  const [showConfirm, setShowConfirm] = useState(false);

  // Atualiza usuário ao entrar na tela
  useFocusEffect(
    useCallback(() => {
      refreshUser();
    }, [])
  );

  // Carregar opções e preferências atuais
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

  // 🔐 BLOQUEIO GLOBAL
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
          save();
        }}
      />

      <ScrollView
        style={{ flex: 1, padding: 20 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Basic Preferences
        </Text>

        {/* Distância */}
        <DistanceSlider
          value={prefs.maxDistanceKm}
          onChange={(v) => setPrefs({ ...prefs, maxDistanceKm: v })}
        />

        {/* Idade */}
        <AgeRange
          minAge={prefs.ageMin}
          maxAge={prefs.ageMax}
          onChange={(min, max) =>
            setPrefs({ ...prefs, ageMin: min, ageMax: max })
          }
        />

        {/* Gênero */}
        {options?.Gender && (
          <GenderSelector
            options={options.Gender}
            selected={prefs.preferredGenders}
            onChange={(values) =>
              setPrefs({ ...prefs, preferredGenders: values })
            }
          />
        )}

        {/* Orientação Sexual */}
        {options?.SexualOrientation && (
          <OrientationSelector
            options={options.SexualOrientation}
            selected={prefs.preferredOrientations}
            onChange={(values) =>
              setPrefs({ ...prefs, preferredOrientations: values })
            }
          />
        )}

        {/* INTENÇÕES */}
      {options?.Intention && (
  <BlockIntentions
    options={options.Intention}
    prefs={prefs.preferredIntentions}
    onToggle={(value: string) => {
      const current: string[] = prefs.preferredIntentions || [];

      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];

      setPrefs({
        ...prefs,
        preferredIntentions: updated,
      });
    }}
  />
)}


        {/* TIPO DE RELACIONAMENTO */}
     {options?.RelationshipType && (
  <BlockRelationshipTypes
    options={options.RelationshipType}
    prefs={prefs.preferredRelationshipTypes}
    onToggle={(value: string) => {
      const current: string[] = prefs.preferredRelationshipTypes || [];

      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];

      setPrefs({
        ...prefs,
        preferredRelationshipTypes: updated,
      });
    }}
  />
)}


        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          onPress={() => setShowConfirm(true)}
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
