// src/components/profileEdit/SectionLifestyle.tsx
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

export default function SectionLifestyle({ form, setForm, enums }: Props) {
  const zodiac = enums?.ZodiacSign || [];
  const pets = enums?.PetsPreference || [];
  const drinking = enums?.DrinkingStatus || [];
  const smoking = enums?.SmokingStatus || [];
  const activity = enums?.ActivityFrequency || [];
  const communication = enums?.CommunicationStyle || [];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Lifestyle
      </Text>

      {/* Zodiac */}
      <Text>Zodiac</Text>
      <OptionChips
        options={zodiac}
        value={form.zodiac}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            zodiac: val,
          }))
        }
      />
      {form.zodiac === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other zodiac</Text>
          <TextInput
            value={form.zodiacOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, zodiacOther: v }))
            }
            style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 4 }}
          />
        </>
      )}

      {/* Pets */}
      <Text style={{ marginTop: 12 }}>Pets</Text>
      <OptionChips
        options={pets}
        value={form.pets}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            pets: val,
          }))
        }
      />
      {form.pets === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other pets</Text>
          <TextInput
            value={form.petsOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, petsOther: v }))
            }
            style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 4 }}
          />
        </>
      )}

      {/* Drinking */}
      <Text style={{ marginTop: 12 }}>Drinking</Text>
      <OptionChips
        options={drinking}
        value={form.drinking}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            drinking: val,
          }))
        }
      />

      {/* Smoking */}
      <Text style={{ marginTop: 12 }}>Smoking</Text>
      <OptionChips
        options={smoking}
        value={form.smoking}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            smoking: val,
          }))
        }
      />

      {/* Activity */}
      <Text style={{ marginTop: 12 }}>Activity level</Text>
      <OptionChips
        options={activity}
        value={form.activityLevel}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            activityLevel: val,
          }))
        }
      />

      {/* Communication */}
      <Text style={{ marginTop: 12 }}>Communication style</Text>
      <OptionChips
        options={communication}
        value={form.communication}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            communication: val,
          }))
        }
      />
      {form.communication === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other communication style</Text>
          <TextInput
            value={form.communicationOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({ ...prev, communicationOther: v }))
            }
            style={{ borderWidth: 1, padding: 10, borderRadius: 6, marginTop: 4 }}
          />
        </>
      )}
    </View>
  );
}
