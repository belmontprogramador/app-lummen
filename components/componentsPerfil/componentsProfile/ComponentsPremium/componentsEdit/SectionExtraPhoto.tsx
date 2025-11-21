// src/components/profileEdit/SectionExtraPhoto.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export default function SectionExtraPhoto({ form, setForm }: Props) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Extra photo
      </Text>

      <Text>Photo URL (optional)</Text>
      <TextInput
        value={form.photo || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            photo: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      {/* Aqui você pode integrar com o seu componente de upload
         e no final setar form.photo = URL retornada pelo backend */}
    </View>
  );
}
