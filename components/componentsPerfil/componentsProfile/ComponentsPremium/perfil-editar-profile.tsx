import { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import * as Localization from "expo-localization";

import SectionBasicInfo from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/componentsEdit/SectionBasicInfo";
import SectionIntention from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/componentsEdit/SectionIntention";
import SectionLifestyle from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/componentsEdit/SectionLifestyle";
import SectionWorkEducation from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/componentsEdit/SectionWorkEducation";
import SectionInterests from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/componentsEdit/SectionInterests";
import SectionLocation from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/componentsEdit/SectionLocation"; // <-- IMPORTAÇÃO AQUI

import api from "@/service/api";

export default function Perfil() {
  useAuthGuard();

  const [form, setForm] = useState({});
  const [enums, setEnums] = useState({});
  const [loadingSave, setLoadingSave] = useState(false);

  const deviceLocale = Localization.getLocales()[0].languageTag.split("-")[0];

  useEffect(() => {
    loadEnums();
  }, []);

  async function loadEnums() {
    try {
      const res = await api.get("/user-profiles/enums", {
        params: { locale: deviceLocale },
      });

      console.log("ENUMS RECEBIDOS:", res.data);
      setEnums(res.data);
    } catch (err) {
      console.log("Erro ao carregar enums:", err);
    }
  }

  async function handleSave() {
    try {
      setLoadingSave(true);

      console.log("📤 ENVIANDO FORM:", form);

      await api.put("/user-profiles", form, {
        headers: { "x-locale": deviceLocale },
      });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (err) {
      console.log("❌ Erro ao salvar:", err);
      Alert.alert("Erro", "Não foi possível atualizar seu perfil.");
    } finally {
      setLoadingSave(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >

        {/* -------- BASIC INFO -------- */}
        <SectionBasicInfo form={form} setForm={setForm} enums={enums} />

        {/* -------- LOCATION -------- */}
        <SectionLocation form={form} setForm={setForm} />

        {/* -------- INTENTION -------- */}
        <SectionIntention form={form} setForm={setForm} enums={enums} />

        {/* -------- LIFESTYLE -------- */}
        <SectionLifestyle form={form} setForm={setForm} enums={enums} />

        {/* -------- WORK & EDUCATION -------- */}
        <SectionWorkEducation form={form} setForm={setForm} enums={enums} />

        {/* -------- INTERESTS -------- */}
        <SectionInterests form={form} setForm={setForm} enums={enums} />

        {/* -------- SAVE BUTTON -------- */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={loadingSave}
          style={{
            backgroundColor: "#000",
            padding: 14,
            borderRadius: 8,
            marginTop: 30,
            alignItems: "center",
            opacity: loadingSave ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            {loadingSave ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
