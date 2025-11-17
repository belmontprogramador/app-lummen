// src/components/profileEdit/SectionRelationship.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  enums: any;
};

export default function SectionRelationship({ form, setForm, enums }: Props) {
  const types = enums?.RelationshipType || [];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Relationship style
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {types.map((opt: any) => {
          const selected = form.relationshipType === opt.value;
          return (
            <View
              key={opt.value}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#000" : "#fff",
              }}
            >
              <Text
                style={{ color: selected ? "#fff" : "#000" }}
                onPress={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    relationshipType: opt.value,
                  }))
                }
              >
                {opt.label}
              </Text>
            </View>
          );
        })}
      </View>

      {form.relationshipType === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other relationship type</Text>
          <TextInput
            value={form.relationshipOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, relationshipOther: v }))
            }
            style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 4 }}
          />
        </>
      )}
    </View>
  );
}
