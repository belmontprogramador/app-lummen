// src/components/profileEdit/SectionLocation.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Localization from "expo-localization";
import axios from "axios";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export default function SectionLocation({ form, setForm }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const locale = Localization.getLocales()[0].languageTag.split("-")[0];

  // Debounce timer
  let timer: any;

  async function search(text: string) {
    if (!text || text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&limit=8&lang=${locale}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_KEY}`;

      const res = await axios.get(url);

      setResults(res.data.features || []);
    } catch (e) {
      console.log("❌ Erro autocomplete:", e);
    }

    setLoading(false);
  }

  // Quando o usuário digita
  function handleChange(text: string) {
    setQuery(text);

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      search(text);
    }, 300);
  }

  // Quando o usuário seleciona uma cidade da lista
  function selectPlace(item: any) {
    const p = item.properties;

    setForm((prev: any) => ({
      ...prev,
      city: p.city || "",
      state: p.state || "",
      country: p.country || "",
      latitude: p.lat,
      longitude: p.lon,
    }));

    // Limpa a lista
    setResults([]);
    setQuery(`${p.city || p.name}, ${p.country}`);
  }

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Location
      </Text>

      {/* INPUT */}
      <Text>Search city / country</Text>
      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder="Type a city..."
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* LISTA DE RESULTADOS */}
      {results.length > 0 && (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            backgroundColor: "#fff",
            marginBottom: 10,
            maxHeight: 200,
          }}
        >
          <FlatList
            data={results}
            keyExtractor={(item) => item.properties.place_id}
            renderItem={({ item }) => {
              const p = item.properties;

              return (
                <TouchableOpacity
                  onPress={() => selectPlace(item)}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <Text>
                    {p.city || p.name}, {p.state ? p.state + ", " : ""}
                    {p.country}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

    
    </View>
  );
}
