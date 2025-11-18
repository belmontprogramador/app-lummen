import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { PreferencesAPI } from "@/service/preferences";

export default function PreferencesPremiumScreen() {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any>(null);
  const [prefs, setPrefs] = useState<any>({});

  // Carregar enums + preferências
  useEffect(() => {
    (async () => {
      try {
        const [optsRes, prefRes] = await Promise.all([
          PreferencesAPI.getOptions(),
          PreferencesAPI.get(),
        ]);

        setOptions(optsRes.data);
        setPrefs(prefRes.data);
      } catch (e) {
        Alert.alert("Erro", "Não foi possível carregar preferências premium.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = (field: string, value: string) => {
    setPrefs((prev: any) => {
      const current = prev[field] || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v: string) => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const save = async () => {
  const result = await PreferencesAPI.update({
    mode: "premium",   // 🔥 ESSENCIAL
    ...prefs
  });

  if (!result.ok) {
    if (result.error === "premium_required") {
      Alert.alert(
        "Recurso Premium",
        "Você precisa ser assinante Premium para salvar essas preferências."
      );
      return;
    }

    Alert.alert("Erro", "Não foi possível salvar suas preferências premium.");
    return;
  }

  Alert.alert("Sucesso", "Preferências premium salvas!");
};


  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  // CHIP COMPONENT
  const Chip = ({ active, label, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        margin: 5,
        backgroundColor: active ? "#7b2cff" : "#dadada",
      }}
    >
      <Text style={{ color: active ? "white" : "black" }}>{label}</Text>
    </TouchableOpacity>
  );

  // BLOCK COMPONENT
  const Block = ({ title, children }: any) => (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Premium Preferences
      </Text>

      {/* ========================= */}
      {/* PRONOUNS */}
      {/* ========================= */}
      <Block title="Preferred Pronouns">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.Pronoun?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredPronouns?.includes(o.value)}
              onPress={() => toggle("preferredPronouns", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* ZODIAC SIGNS */}
      {/* ========================= */}
      <Block title="Zodiac Signs">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.ZodiacSign?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredZodiacs?.includes(o.value)}
              onPress={() => toggle("preferredZodiacs", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* RELATIONSHIP INTENTIONS */}
      {/* ========================= */}
      <Block title="Relationship Intentions">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.Intention?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredIntentions?.includes(o.value)}
              onPress={() => toggle("preferredIntentions", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* RELATIONSHIP TYPES */}
      {/* ========================= */}
      <Block title="Relationship Types">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.RelationshipType?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredRelationshipTypes?.includes(o.value)}
              onPress={() => toggle("preferredRelationshipTypes", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* LIFESTYLE */}
      {/* ========================= */}
      <Block title="Pets">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.PetsPreference?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredPets?.includes(o.value)}
              onPress={() => toggle("preferredPets", o.value)}
            />
          ))}
        </View>
      </Block>

      <Block title="Smoking">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.SmokingStatus?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredSmoking?.includes(o.value)}
              onPress={() => toggle("preferredSmoking", o.value)}
            />
          ))}
        </View>
      </Block>

      <Block title="Drinking">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.DrinkingStatus?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredDrinking?.includes(o.value)}
              onPress={() => toggle("preferredDrinking", o.value)}
            />
          ))}
        </View>
      </Block>

      <Block title="Activity Level">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.ActivityFrequency?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredActivityLevel?.includes(o.value)}
              onPress={() => toggle("preferredActivityLevel", o.value)}
            />
          ))}
        </View>
      </Block>

      <Block title="Communication Style">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.CommunicationStyle?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredCommunication?.includes(o.value)}
              onPress={() => toggle("preferredCommunication", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* EDUCATION */}
      {/* ========================= */}
      <Block title="Education Level">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.EducationLevel?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredEducationLevels?.includes(o.value)}
              onPress={() => toggle("preferredEducationLevels", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* LANGUAGES */}
      {/* ========================= */}
      <Block title="Languages">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.Language?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredLanguages?.includes(o.value)}
              onPress={() => toggle("preferredLanguages", o.value)}
            />
          ))}
        </View>
      </Block>

      {/* ========================= */}
      {/* INTERESTS */}
      {/* ========================= */}
      <Block title="Interests — Activities">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestActivity?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsActivities?.includes(o.value)}
              onPress={() => toggle("preferredInterestsActivities", o.value)}
            />
          ))}
        </View>
      </Block>

      <Block title="Interests — Lifestyle">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestLifestyle?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsLifestyle?.includes(o.value)}
              onPress={() =>
                toggle("preferredInterestsLifestyle", o.value)
              }
            />
          ))}
        </View>
      </Block>

      <Block title="Interests — Creativity">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestCreativity?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsCreativity?.includes(o.value)}
              onPress={() =>
                toggle("preferredInterestsCreativity", o.value)
              }
            />
          ))}
        </View>
      </Block>

      <Block title="Interests — Sports & Fitness">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestSports?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsSportsFitness?.includes(
                o.value
              )}
              onPress={() =>
                toggle("preferredInterestsSportsFitness", o.value)
              }
            />
          ))}
        </View>
      </Block>

      <Block title="Interests — Music">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestMusic?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsMusic?.includes(o.value)}
              onPress={() =>
                toggle("preferredInterestsMusic", o.value)
              }
            />
          ))}
        </View>
      </Block>

      <Block title="Interests — Nightlife">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestNightlife?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsNightlife?.includes(o.value)}
              onPress={() =>
                toggle("preferredInterestsNightlife", o.value)
              }
            />
          ))}
        </View>
      </Block>

      <Block title="Interests — TV & Cinema">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {options.InterestTvCinema?.map((o: any) => (
            <Chip
              key={o.value}
              label={o.label}
              active={prefs.preferredInterestsTvCinema?.includes(o.value)}
              onPress={() =>
                toggle("preferredInterestsTvCinema", o.value)
              }
            />
          ))}
        </View>
      </Block>

      {/* BOTÃO SALVAR */}
      <TouchableOpacity
        onPress={save}
        style={{
          backgroundColor: "#7b2cff",
          padding: 15,
          borderRadius: 12,
          marginTop: 35,
        }}
      >
        <Text
          style={{ color: "white", fontSize: 17, textAlign: "center" }}
        >
          Save Premium Preferences
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
