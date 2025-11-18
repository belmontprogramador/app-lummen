// src/components/profileEdit/SectionLifestyle.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

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
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
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
  );
}

export default function SectionLifestyle({ form, setForm, enums }: Props) {
  const pets = enums?.PetsPreference || [];
  const drinking = enums?.DrinkingStatus || [];
  const smoking = enums?.SmokingStatus || [];
  const activity = enums?.ActivityFrequency || [];
  const communication = enums?.CommunicationStyle || [];

  const pf = form.profileLifestyle || {};

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Lifestyle
      </Text>

      {/* PETS */}
      <Text>Pets</Text>
      <OptionChips
        options={pets}
        value={pf.pets}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            profileLifestyle: {
              ...prev.profileLifestyle,
              pets: val,
              petsOther: val !== "OTHER" ? "" : prev.profileLifestyle?.petsOther,
            },
          }))
        }
      />

      {pf.pets === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other pets</Text>
          <TextInput
            value={pf.petsOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({
                ...prev,
                profileLifestyle: {
                  ...prev.profileLifestyle,
                  petsOther: v,
                },
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

      {/* DRINKING */}
      <Text style={{ marginTop: 12 }}>Drinking</Text>
      <OptionChips
        options={drinking}
        value={pf.drinking}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            profileLifestyle: {
              ...prev.profileLifestyle,
              drinking: val,
            },
          }))
        }
      />

      {/* SMOKING */}
      <Text style={{ marginTop: 12 }}>Smoking</Text>
      <OptionChips
        options={smoking}
        value={pf.smoking}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            profileLifestyle: {
              ...prev.profileLifestyle,
              smoking: val,
            },
          }))
        }
      />

      {/* ACTIVITY LEVEL */}
      <Text style={{ marginTop: 12 }}>Activity level</Text>
      <OptionChips
        options={activity}
        value={pf.activityLevel}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            profileLifestyle: {
              ...prev.profileLifestyle,
              activityLevel: val,
            },
          }))
        }
      />

      {/* COMMUNICATION */}
      <Text style={{ marginTop: 12 }}>Communication style</Text>
      <OptionChips
        options={communication}
        value={pf.communication}
        onChange={(val) =>
          setForm((prev: any) => ({
            ...prev,
            profileLifestyle: {
              ...prev.profileLifestyle,
              communication: val,
              communicationOther:
                val !== "OTHER"
                  ? ""
                  : prev.profileLifestyle?.communicationOther,
            },
          }))
        }
      />

      {pf.communication === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other communication style</Text>
          <TextInput
            value={pf.communicationOther || ""}
            onChangeText={(v) =>
              setForm((prev: any) => ({
                ...prev,
                profileLifestyle: {
                  ...prev.profileLifestyle,
                  communicationOther: v,
                },
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
