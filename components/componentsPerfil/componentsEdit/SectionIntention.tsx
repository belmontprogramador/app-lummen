// src/components/profileEdit/SectionIntention.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  enums: any;
};

export default function SectionIntention({ form, setForm, enums }: Props) {
  const intentions = enums?.Intention || [];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        What are you looking for?
      </Text>

      {/* LISTA DE INTENÇÕES */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {intentions.map((opt: any) => {
          const selected = form.intention === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() =>
                setForm((prev: any) => ({
                  ...prev,
                  intention: opt.value,
                  intentionOther: "", // limpa campo caso não seja OTHER
                }))
              }
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#000" : "#fff",
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CAMPO "OTHER" */}
      {form.intention === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other intention</Text>
          <TextInput
            value={form.intentionOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, intentionOther: v }))
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              marginTop: 4,
            }}
          />
        </>
      )}
    </View>
  );
}
