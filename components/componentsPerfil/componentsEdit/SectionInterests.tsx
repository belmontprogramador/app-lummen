// src/components/profileEdit/SectionInterests.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  enums: any;
};

// Toggle helper
function toggle(arr: string[], value: string) {
  if (arr.includes(value)) {
    return arr.filter((v) => v !== value);
  }
  return [...arr, value];
}

export default function SectionInterests({ form, setForm, enums }: Props) {
  // Pegando todos os enums do backend:
  const languages = enums?.Language || [];
  const activities = enums?.InterestActivity || [];
  const lifestyle = enums?.InterestLifestyle || [];
  const creativity = enums?.InterestCreativity || [];
  const sports = enums?.InterestSports || [];
  const music = enums?.InterestMusic || [];
  const nightlife = enums?.InterestNightlife || [];
  const tvcinema = enums?.InterestTvCinema || [];

  // Renderizador de grupo de chips
  const renderGroup = (
    title: string,
    items: any[],
    field: keyof typeof form
  ) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
        {title}
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((opt: any) => {
          const selected = form[field]?.includes(opt.value);

          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() =>
                setForm((prev: any) => ({
                  ...prev,
                  [field]: toggle(prev[field] || [], opt.value),
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
                borderColor: selected ? "#000" : "#777",
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 16,
          marginTop: 5,
        }}
      >
        Interests & Activities
      </Text>

      {renderGroup("Languages", languages, "languages")}
      {renderGroup("Activities", activities, "interestsActivities")}
      {renderGroup("Lifestyle", lifestyle, "interestsLifestyle")}
      {renderGroup("Creativity & Hobbies", creativity, "interestsCreativity")}
      {renderGroup("Sports & Fitness", sports, "interestsSportsFitness")}
      {renderGroup("Music", music, "interestsMusic")}
      {renderGroup("Nightlife", nightlife, "interestsNightlife")}
      {renderGroup("TV & Cinema", tvcinema, "interestsTvCinema")}
    </View>
  );
}
