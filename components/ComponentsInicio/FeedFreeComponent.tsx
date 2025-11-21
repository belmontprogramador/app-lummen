// src/components/ComponentsInicio/FeedFreeComponent.tsx

import { View, Text } from "react-native";

export default function FeedFreeComponent({ user }: any) {
  const profile = user.profile || {};

  const freeKeys = [
    "bio",
    "birthday",
    "gender",
    "orientation",
    "orientationOther",
    "city",
    "state",
    "country",
    "pronoun",
    "intention",
    "relationshipType",
    "languages",
  ];

  const labels: any = {
    bio: "Bio",
    birthday: "Idade",
    gender: "Gênero",
    orientation: "Orientação",
    orientationOther: "Outra orientação",
    city: "Cidade",
    state: "Estado",
    country: "País",
    pronoun: "Pronome",
    intention: "Intenção",
    relationshipType: "Relacionamento",
    languages: "Idiomas",
  };

  const getAge = (date: string) => {
    if (!date) return null;
    const d = new Date(date);
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    if (
      now.getMonth() < d.getMonth() ||
      (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Sobre
      </Text>

      {freeKeys.map((key) => {
        const value = profile[key];
        let display = "—"; // 🔥 exibir o título mesmo vazio

        if (key === "birthday" && value) {
          display = `${getAge(value)} anos`;
        } else if (Array.isArray(value)) {
          display = value
            .map((v) => (typeof v === "object" ? v.label : v))
            .join(", ");
        } else if (value) {
          display = value;
        }

        return (
          <Text key={key} style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: "bold" }}>{labels[key]}: </Text>
            {display}
          </Text>
        );
      })}
    </View>
  );
}
