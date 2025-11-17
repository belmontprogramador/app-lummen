import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  enums: any;
};

export default function SectionBasicInfo({ form, setForm, enums }: Props) {
  const genders = enums?.Gender || [];
  const orientations = enums?.SexualOrientation || [];
  const pronouns = enums?.Pronoun || [];
  const zodiacs = enums?.ZodiacSign || [];

  const [showDatePicker, setShowDatePicker] = useState(false);

  function formatDate(date: Date) {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setForm((p: any) => ({
        ...p,
        birthday: formatDate(selectedDate),
      }));
    }
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Basic Info
      </Text>

      {/* BIO */}
      <Text>Bio</Text>
      <TextInput
        value={form.bio || ""}
        onChangeText={(v) => setForm((p: any) => ({ ...p, bio: v }))}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
          minHeight: 80,
        }}
        multiline
      />

      {/* BIRTHDAY */}
      <Text>Birthday</Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 6,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: form.birthday ? "#000" : "#777" }}>
          {form.birthday || "Select your birthday"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={
            form.birthday ? new Date(form.birthday) : new Date("1990-01-01")
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      {/* GENDER */}
      <Text>Gender</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {genders.map((opt: any) => {
          const selected = form.gender === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => setForm((p: any) => ({ ...p, gender: opt.value }))}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#000" : "#fff",
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* PRONOUN */}
      <Text style={{ marginTop: 10 }}>Pronoun</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {pronouns.map((opt: any) => {
          const selected = form.pronoun === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() =>
                setForm((p: any) => ({
                  ...p,
                  pronoun: opt.value,
                  pronounOther: "",
                }))
              }
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#000" : "#fff",
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {form.pronoun === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other pronoun</Text>
          <TextInput
            value={form.pronounOther || ""}
            onChangeText={(v) =>
              setForm((p: any) => ({ ...p, pronounOther: v }))
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              marginTop: 4,
            }}
          />
        </>
      )}

      {/* ORIENTATION */}
      <Text style={{ marginTop: 10 }}>Sexual Orientation</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {orientations.map((opt: any) => {
          const selected = form.orientation === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() =>
                setForm((p: any) => ({
                  ...p,
                  orientation: opt.value,
                  orientationOther: "",
                }))
              }
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#000" : "#fff",
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {form.orientation === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other orientation</Text>
          <TextInput
            value={form.orientationOther || ""}
            onChangeText={(v) =>
              setForm((p: any) => ({ ...p, orientationOther: v }))
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              marginTop: 4,
            }}
          />
        </>
      )}

      {/* HEIGHT SELECT */}
<Text style={{ marginTop: 12 }}>Height (cm)</Text>

<View
  style={{
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  }}
>
  <TouchableOpacity
    onPress={() =>
      setForm((p: any) => ({
        ...p,
        showHeightSelect: !p.showHeightSelect,
      }))
    }
  >
    <Text style={{ fontSize: 16 }}>
      {form.heightCm ? `${form.heightCm} cm` : "Select your height"}
    </Text>
  </TouchableOpacity>
</View>

{/* Lista DROPDOWN */}
{form.showHeightSelect && (
  <View
    style={{
      borderWidth: 1,
      borderRadius: 6,
      marginBottom: 20,
      maxHeight: 200,
      overflow: "scroll",
      backgroundColor: "#fff",
    }}
  >
    {Array.from({ length: 121 }, (_, i) => i + 100).map((height) => (
      <TouchableOpacity
        key={height}
        onPress={() =>
          setForm((p: any) => ({
            ...p,
            heightCm: height,
            showHeightSelect: false,
          }))
        }
        style={{
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        }}
      >
        <Text>{height} cm</Text>
      </TouchableOpacity>
    ))}
  </View>
)}


      {/* ZODIAC SIGN */}
      <Text>Zodiac Sign</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
        {zodiacs.map((opt: any) => {
          const selected = form.zodiac === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() =>
                setForm((p: any) => ({
                  ...p,
                  zodiac: opt.value,
                  zodiacOther: "",
                }))
              }
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#000" : "#fff",
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {form.zodiac === "OTHER" && (
        <>
          <Text style={{ marginTop: 8 }}>Other zodiac</Text>
          <TextInput
            value={form.zodiacOther || ""}
            onChangeText={(v) =>
              setForm((p: any) => ({ ...p, zodiacOther: v }))
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 6,
              marginTop: 4,
            }}
          />
        </>
      )}
    </View>
  );
}
