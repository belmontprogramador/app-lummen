import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import React from "react";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export default function DistanceSlider({ value, onChange }: Props) {
  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>
        Maximum Distance: {value} km
      </Text>

      <Slider
        minimumValue={1}
        maximumValue={300}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#7b2cff"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#7b2cff"
      />
    </View>
  );
}
