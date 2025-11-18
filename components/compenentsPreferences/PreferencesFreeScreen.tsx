import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { PreferencesAPI } from "@/service/preferences";
import Slider from "@react-native-community/slider";

export default function PreferencesFreeScreen() {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any>(null);
  const [prefs, setPrefs] = useState<any>({
    maxDistanceKm: 50,
    ageMin: 18,
    ageMax: 99,
    preferredGenders: [],
    preferredOrientations: [],
  });

  // Carregar opções + preferências
  useEffect(() => {
    (async () => {
      try {
        const [optRes, prefRes] = await Promise.all([
          PreferencesAPI.getOptions(),
          PreferencesAPI.get(),
        ]);

        setOptions(optRes.data);
        setPrefs(prefRes.data);
      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar as preferências.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleChip = (field: string, value: string) => {
    setPrefs((prev: any) => {
      const arr = prev[field] || [];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((v: string) => v !== value) };
      }
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const save = async () => {
    const result = await PreferencesAPI.update({
  mode: "free",   // 🔥 ESSENCIAL!
  ...prefs
});


    if (!result.ok) {
      if (result.error === "premium_required") {
        Alert.alert(
          "Premium necessário",
          "Você precisa ser assinante Premium para salvar estas preferências."
        );
        return;
      }

      Alert.alert("Erro", "Não foi possível salvar suas preferências.");
      return;
    }

    Alert.alert("Sucesso", "Preferências salvas!");
  };

  if (loading) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Basic Preferences
      </Text>

      {/* DISTÂNCIA */}
      <Text style={{ fontSize: 16, marginTop: 10 }}>Distance (km)</Text>
      <Slider
        minimumValue={1}
        maximumValue={200}
        value={prefs.maxDistanceKm}
        onValueChange={(val) =>
          setPrefs({ ...prefs, maxDistanceKm: Math.round(val) })
        }
      />
      <Text>{prefs.maxDistanceKm} km</Text>

      {/* IDADE */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>Age Range</Text>

      <Text>Min: {prefs.ageMin}</Text>
      <Slider
        minimumValue={18}
        maximumValue={99}
        value={prefs.ageMin}
        onValueChange={(v) =>
          setPrefs({ ...prefs, ageMin: Math.round(v) })
        }
      />

      <Text>Max: {prefs.ageMax}</Text>
      <Slider
        minimumValue={18}
        maximumValue={99}
        value={prefs.ageMax}
        onValueChange={(v) =>
          setPrefs({ ...prefs, ageMax: Math.round(v) })
        }
      />

      {/* GÊNERO */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>Preferred Genders</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.Gender?.map((g: any) => (
          <TouchableOpacity
            key={g.value}
            onPress={() => toggleChip("preferredGenders", g.value)}
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 20,
              backgroundColor: prefs.preferredGenders.includes(g.value)
                ? "#007bff"
                : "#ccc",
            }}
          >
            <Text style={{ color: "white" }}>{g.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ORIENTAÇÃO */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>Preferred Orientations</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.SexualOrientation?.map((o: any) => (
          <TouchableOpacity
            key={o.value}
            onPress={() => toggleChip("preferredOrientations", o.value)}
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 20,
              backgroundColor: prefs.preferredOrientations.includes(o.value)
                ? "#007bff"
                : "#ccc",
            }}
          >
            <Text style={{ color: "white" }}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÃO SALVAR */}
      <TouchableOpacity
        onPress={save}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 8,
          marginTop: 30,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontSize: 16 }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
