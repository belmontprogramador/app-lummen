// src/components/profileEdit/SectionInterests.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

function arrayToString(arr?: string[]) {
  if (!arr || !Array.isArray(arr)) return "";
  return arr.join(", ");
}

function stringToArray(text: string): string[] {
  return text
    .split(",")
    .map((t) => t.trim())
    .filter((t) => !!t);
}

export default function SectionInterests({ form, setForm }: Props) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Interests & Activities
      </Text>

      {/* LANGUAGES */}
      <Text>Languages (comma separated)</Text>
      <TextInput
        value={arrayToString(form.languages)}
        onChangeText={(v) =>
          setForm((p: any) => ({ ...p, languages: stringToArray(v) }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* ACTIVITIES */}
      <Text>Activities</Text>
      <TextInput
        value={arrayToString(form.interestsActivities)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsActivities: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* LIFESTYLE */}
      <Text>Lifestyle</Text>
      <TextInput
        value={arrayToString(form.interestsLifestyle)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsLifestyle: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* CREATIVITY */}
      <Text>Creativity & hobbies</Text>
      <TextInput
        value={arrayToString(form.interestsCreativity)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsCreativity: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* SPORTS */}
      <Text>Sports & fitness</Text>
      <TextInput
        value={arrayToString(form.interestsSportsFitness)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsSportsFitness: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* MUSIC */}
      <Text>Music</Text>
      <TextInput
        value={arrayToString(form.interestsMusic)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsMusic: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* NIGHTLIFE */}
      <Text>Nightlife</Text>
      <TextInput
        value={arrayToString(form.interestsNightlife)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsNightlife: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* TV & CINEMA */}
      <Text>TV & cinema</Text>
      <TextInput
        value={arrayToString(form.interestsTvCinema)}
        onChangeText={(v) =>
          setForm((p: any) => ({
            ...p,
            interestsTvCinema: stringToArray(v),
          }))
        }
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />
    </View>
  );
}
