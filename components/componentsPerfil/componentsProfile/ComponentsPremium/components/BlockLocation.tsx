import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";

const GEOAPIFY_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_KEY;

export default function BlockLocation({ form = {}, onChange = () => {} }: any) {
  const [query, setQuery] = useState(form.city || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Busca automática ao digitar (debounce básico)
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
      setError(null);
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          text
        )}&limit=5&apiKey=${GEOAPIFY_KEY}`
      );

      const data = await res.json();

      if (!data.features) {
        setSuggestions([]);
        setError("No results found.");
        return;
      }

      const results = data.features.map((f: any) => ({
        city: f.properties.city || f.properties.name,
        state: f.properties.state,
        country: f.properties.country,
        latitude: Number(f.properties.lat),
        longitude: Number(f.properties.lon),
      }));

      setSuggestions(results);
    } catch (err) {
      console.error("❌ Geoapify error:", err);
      setError("Error fetching location suggestions.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(item: any) {
    setQuery(item.city || "");
    setSuggestions([]);
    onChange("city", item.city || "");
    onChange("state", item.state || "");
    onChange("country", item.country || "");
    onChange("latitude", item.latitude);
    onChange("longitude", item.longitude);
  }

  return (
    <View>
      <PreferenceBlock title="Location">
        <Text style={{ marginBottom: 6, fontWeight: "500" }}>Search your location</Text>

        <TextInput
          placeholder="Type your city..."
          value={query}
          onChangeText={setQuery}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {loading && <ActivityIndicator size="small" color="#7b2cff" style={{ marginVertical: 8 }} />}

        {error && !loading && (
          <Text style={{ color: "red", marginBottom: 10, fontSize: 13 }}>{error}</Text>
        )}

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text>
                  {item.city}, {item.state ? item.state + ", " : ""}
                  {item.country}
                </Text>
              </TouchableOpacity>
            )}
            style={{
              maxHeight: 200,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "#fff",
              marginBottom: 10,
            }}
          />
        )}

        {/* Coordenadas (somente leitura) */}
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#777" }}>Latitude: {form.latitude ?? "Not set"}</Text>
          <Text style={{ color: "#777" }}>Longitude: {form.longitude ?? "Not set"}</Text>
        </View>
      </PreferenceBlock>
    </View>
  );
}
