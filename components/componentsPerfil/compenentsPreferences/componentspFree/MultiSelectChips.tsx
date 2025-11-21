import { View, Text, TouchableOpacity } from "react-native";

type Option = { value: string; label: string };

type Props = {
  title: string;
  options: Option[];
  selected: string[];
  onChange: (newValues: string[]) => void;
};

export default function MultiSelectChips({
  title,
  options,
  selected,
  onChange,
}: Props) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {title}
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.map((o) => (
          <TouchableOpacity
            key={o.value}
            onPress={() => toggle(o.value)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              margin: 5,
              backgroundColor: selected.includes(o.value)
                ? "#7b2cff"
                : "#dadada",
            }}
          >
            <Text
              style={{ color: selected.includes(o.value) ? "white" : "black" }}
            >
              {o.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
