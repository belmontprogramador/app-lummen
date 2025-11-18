// src/components/ComponentsInicio/ProfileDetails.tsx

import { View, Text } from "react-native";

export default function ProfileDetails({ profile }: any) {
  if (!profile) return null;

  const labels: any = {
    bio: "Bio",
    birthday: "Aniversário",
    gender: "Gênero",
    orientation: "Orientação",
    orientationOther: "Outra orientação",
    city: "Cidade",
    state: "Estado",
    country: "País",
    pronoun: "Pronome",
    pronounOther: "Outro pronome",
    heightCm: "Altura (cm)",
    intention: "Intenção",
    intentionOther: "Outra intenção",
    relationshipType: "Tipo de relacionamento",
    relationshipOther: "Outro tipo",
    languages: "Idiomas",
    zodiac: "Signo",
    zodiacOther: "Outro signo",
    educationLevel: "Escolaridade",
    educationOther: "Outra escolaridade",
    communication: "Comunicação",
    communicationOther: "Outra comunicação",
    pets: "Pets",
    petsOther: "Outro pet",
    drinking: "Bebida",
    smoking: "Fuma?",
    activityLevel: "Nível de atividade",
    jobTitle: "Profissão",
    company: "Empresa",
    education: "Educação",
    livingIn: "Mora em",
    interestsActivities: "Atividades",
    interestsLifestyle: "Estilo de vida",
    interestsCreativity: "Criatividade",
    interestsSportsFitness: "Esportes / Fitness",
    interestsMusic: "Música",
    interestsNightlife: "Vida noturna",
    interestsTvCinema: "TV / Cinema",
  };

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Sobre
      </Text>

      {Object.keys(labels).map((key) => {
        const value = profile[key];
        if (value === null || value === undefined) return null;

        let displayValue = "—";

        if (Array.isArray(value)) {
          // Array com enums traduzidos
          displayValue = value
            .map((v) => (typeof v === "object" && v.label ? v.label : v))
            .join(", ");
        } else if (typeof value === "object" && value.label) {
          // Objeto { value, label }
          displayValue = value.label;
        } else if (value) {
          // string normal
          displayValue = value;
        }

        return (
          <Text key={key} style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: "bold" }}>{labels[key]}: </Text>
            {displayValue}
          </Text>
        );
      })}
    </View>
  );
}
