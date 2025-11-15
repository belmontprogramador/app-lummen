import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UsersAPI } from "@/service/users";
import { AuthContext } from "@/context/AuthContext";

export default function PerfilEditar() {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState<any>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as any,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto({
        uri: asset.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      });
    }
  }

  async function handleSave() {
    if (!user) return;

    try {
      setSaving(true);

      const payload: any = {
        name,
      };

      if (photo) {
        payload.photo = photo;
      }

      const res = await UsersAPI.update(user.id, payload);

      await updateUser(res.data);

      alert("Perfil atualizado com sucesso!");

    } catch (e) {
      console.log(e);
      alert("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Editar Perfil
      </Text>

      {/* FOTO */}
      <TouchableOpacity
        onPress={pickImage}
        style={{ alignSelf: "center", marginBottom: 10 }}
      >
        <Image
  key={user.photo} // 🔥 força re-render quando a foto muda
  source={{
    uri: photo?.uri || `https://botgrupo.lummen-app.com${user.photo}`,
  }}
  style={{
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  }}
/>

        <Text
          style={{
            textAlign: "center",
            color: "#007BFF",
            marginTop: 8,
          }}
        >
          Trocar foto
        </Text>
      </TouchableOpacity>

      {/* NOME */}
      <Text style={{ marginTop: 20, fontWeight: "600" }}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 6,
          marginTop: 5,
        }}
      />

      {/* BOTÃO SALVAR */}
      <TouchableOpacity
        onPress={handleSave}
        disabled={saving}
        style={{
          backgroundColor: "#000",
          padding: 14,
          borderRadius: 6,
          marginTop: 30,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
