import { useEffect, useState, useContext } from "react";
import { 
  View, Text, TouchableOpacity, Image, ActivityIndicator, Alert 
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import * as ImagePicker from "expo-image-picker";

import { AuthContext } from "@/context/AuthContext";
import { PhotosAPI } from "@/service/photos";

export default function PerfilFotos() {
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      setLoading(true);
      const res = await PhotosAPI.list(user!.id);
      setPhotos(res.data);
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível carregar as fotos.");
    } finally {
      setLoading(false);
    }
  }

  async function addPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    try {
      const file = {
        uri: asset.uri,
        name: `photo_${Date.now()}.jpg`,
        type: "image/jpeg",
      };

      const res = await PhotosAPI.addOne(user!.id, file);
      setPhotos(prev => [...prev, res.data]);

    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível enviar a foto.");
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await PhotosAPI.remove(photoId);
      setPhotos(prev => prev.filter(p => p.id !== photoId));
    } catch (err: any) {
      console.log("Erro delete:", err.response?.data || err);
      Alert.alert("Erro", "Falha ao excluir a foto.");
    }
  }

  async function saveOrder() {
    try {
      setSaving(true);

      const data = photos.map((p, index) => ({
        id: p.id ?? null,
        position: index + 1,
      }));

      await PhotosAPI.bulk(user!.id, data);
      Alert.alert("OK", "Fotos atualizadas com sucesso!");

    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao salvar ordem das fotos.");
    } finally {
      setSaving(false);
    }
  }

  function renderItem({ item, drag }: any) {
    return (
      <TouchableOpacity 
        onLongPress={drag}
        style={{
          marginBottom: 15,
          padding: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          elevation: 2,
        }}
      >
        <Image
          source={{ uri: `https://botgrupo.lummen-app.com${item.url}` }}
          style={{ width: "100%", height: 180, borderRadius: 10 }}
        />

        <TouchableOpacity
          onPress={() => deletePhoto(item.id)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: 5,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff" }}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Minhas fotos
      </Text>

      <TouchableOpacity 
        onPress={addPhoto}
        style={{
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 6,
          marginBottom: 20,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          Adicionar foto
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <DraggableFlatList
          data={photos}
          onDragEnd={({ data }) => setPhotos(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity 
        onPress={saveOrder}
        disabled={saving}
        style={{
          backgroundColor: saving ? "#888" : "#000",
          padding: 14,
          borderRadius: 8,
          marginTop: 25,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          {saving ? "Salvando..." : "Salvar Ordem"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
