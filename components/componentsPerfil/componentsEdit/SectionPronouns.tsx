// src/components/profileEdit/SectionPronouns.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  enums: any;
};

export default function SectionPronouns({ form, setForm, enums }: Props) {
  const pronouns = enums?.Pronoun || [];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Pronouns
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {pronouns.map((opt: any) => {
          const selected = form.pronoun === opt.value;
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
                    pronoun: opt.value,
                  }))
                }
              >
                {opt.label}
              </Text>
            </View>
          );
        })}
      </View>

      {form.pronoun === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other pronoun</Text>
          <TextInput
            value={form.pronounOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, pronounOther: v }))
            }
            style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 4 }}
          />
        </>
      )}
    </View>
  );
}
