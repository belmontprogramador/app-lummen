import { useState, useEffect } from "react";
import { View, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { useTranslation } from "react-i18next";

const GEOAPIFY_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_KEY;

export default function RegisterLocationPicker({ form, onChange }: any) {
  const { t } = useTranslation();

  const [query, setQuery] = useState(form.city || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 3) fetchSuggestions(query);
      else setSuggestions([]);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  async function fetchSuggestions(text: string) {
    try {
      setLoading(true);

      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&limit=5&apiKey=${GEOAPIFY_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.features) return setSuggestions([]);

      const results = data.features.map((f: any) => ({
        city: f.properties.city || f.properties.name,
        state: f.properties.state,
        country: f.properties.country,
      }));

      setSuggestions(results);
    } catch (e) {
      console.log("Geoapify erro:", e);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(item: any) {
    setQuery(item.city);
    setSuggestions([]);

    onChange("city", item.city);
    onChange("state", item.state);
    onChange("country", item.country);

    // ❌ REMOVIDO: latitude e longitude (backend calcula agora)
    // onChange("latitude", item.latitude);
    // onChange("longitude", item.longitude);
  }

  return (
    <View style={{ marginBottom: 15 }}>
      <TextInput
        placeholder={t("profile.location.placeholder")}
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 10,
        }}
      />

      {loading && (
        <ActivityIndicator size="small" color="#000" style={{ marginBottom: 10 }} />
      )}

      {!!suggestions.length && (
        <FlatList
          data={suggestions}
          keyExtractor={(_, i) => i.toString()}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            maxHeight: 170,
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" }}
            >
              <Text>
                {item.city} — {item.state ? item.state + ", " : ""}
                {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
