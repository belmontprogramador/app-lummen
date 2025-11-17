// src/components/profileEdit/SectionWorkEducation.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  enums: any;
};

function OptionChips({
  options,
  value,
  onChange,
}: {
  options: any[];
  value: string | null | undefined;
  onChange: (newValue: string) => void;
}) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
      {options.map((opt: any) => {
        const selected = value === opt.value;
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
              onPress={() => onChange(opt.value)}
            >
              {opt.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default function SectionWorkEducation({ form, setForm, enums }: Props) {
  const educationLevels = enums?.EducationLevel || [];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Work & education
      </Text>

      <Text>Job title</Text>
      <TextInput
        value={form.jobTitle || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            jobTitle: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>Company</Text>
      <TextInput
        value={form.company || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            company: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>Education level</Text>
      <OptionChips
        options={educationLevels}
        value={form.educationLevel}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            educationLevel: val,
          }))
        }
      />
      {form.educationLevel === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other education</Text>
          <TextInput
            value={form.educationOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, educationOther: v }))
            }
            style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 4 }}
          />
        </>
      )}

      <Text style={{ marginTop: 12 }}>School / University</Text>
      <TextInput
        value={form.education || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            education: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />

      <Text>Living in</Text>
      <TextInput
        value={form.livingIn || ""}
        onChangeText={(v) =>
          setForm((prev: any) => ({
            ...prev,
            livingIn: v,
          }))
        }
        style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}
      />
    </View>
  );
}
