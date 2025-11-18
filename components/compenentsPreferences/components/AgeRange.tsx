import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import React from "react";

type Props = {
  minAge: number;
  maxAge: number;
  onChange: (min: number, max: number) => void;
};

export default function AgeRange({ minAge, maxAge, onChange }: Props) {
  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>
        Age Range: {minAge} - {maxAge}
      </Text>

      <Text style={{ marginBottom: 3 }}>Minimum Age</Text>
      <Slider
        minimumValue={18}
        maximumValue={99}
        step={1}
        value={minAge}
        onValueChange={(v) => onChange(v, maxAge)}
        minimumTrackTintColor="#7b2cff"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#7b2cff"
      />

      <Text style={{ marginTop: 15, marginBottom: 3 }}>Maximum Age</Text>
      <Slider
        minimumValue={18}
        maximumValue={99}
        step={1}
        value={maxAge}
        onValueChange={(v) => onChange(minAge, v)}
        minimumTrackTintColor="#7b2cff"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#7b2cff"
      />
    </View>
  );
}
