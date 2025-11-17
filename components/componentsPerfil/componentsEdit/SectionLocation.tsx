// src/components/profileEdit/SectionLocation.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export default function SectionLocation({ form, setForm }: Props) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Location
      </Text>

      <Text>City</Text>
      <TextInput
        value={form.city || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            city: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>State</Text>
      <TextInput
        value={form.state || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            state: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>Country</Text>
      <TextInput
        value={form.country || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            country: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>Latitude</Text>
      <TextInput
        value={
          form.latitude !== undefined && form.latitude !== null
            ? String(form.latitude)
            : ""
        }
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            latitude: v ? Number(v) : null,
          }))
        }
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>Longitude</Text>
      <TextInput
        value={
          form.longitude !== undefined && form.longitude !== null
            ? String(form.longitude)
            : ""
        }
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            longitude: v ? Number(v) : null,
          }))
        }
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      {/* Se quiser depois adicionar botão para pegar GPS via expo-location */}
    </View>
  );
}
