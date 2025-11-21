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
  const relationshipTypes = enums?.RelationshipType || [];

  return (
    <View style={{ marginBottom: 24 }}>

      {/* INTENTION */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        What are you looking for?
      </Text>

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
                  intentionOther: "",
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

      {form.intention === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other intention</Text>
          <TextInput
            value={form.intentionOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({
                ...prev,
                intentionOther: v,
              }))
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

      {/* RELATIONSHIP TYPE */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
        Relationship type
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {relationshipTypes.map((opt: any) => {
          const selected = form.relationshipType === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() =>
                setForm((prev: any) => ({
                  ...prev,
                  relationshipType: opt.value,
                  relationshipOther: "",
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

      {form.relationshipType === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other relationship type</Text>
          <TextInput
            value={form.relationshipOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({
                ...prev,
                relationshipOther: v,
              }))
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
