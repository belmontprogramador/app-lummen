// src/components/userProfile/BlockBasicInfo.tsx
import { View, TextInput, TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockBasicInfo({
  enums = {},
  form = {},
  onChange = () => {},
  onToggle = () => {},
}: any) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHeightSelect, setShowHeightSelect] = useState(false);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const handleDateChange = (_: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) onChange("birthday", formatDate(selected));
  };

  return (
    <View>
      {/* BIO */}
      <PreferenceBlock title="Bio">
        <TextInput
          value={form.bio || ""}
          onChangeText={(v) => onChange("bio", v)}
          multiline
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            minHeight: 90,
          }}
        />
      </PreferenceBlock>

      {/* BIRTHDAY */}
      <PreferenceBlock title="Birthday">
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
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
      </PreferenceBlock>

      {/* PREFERRED GENDERS */}
      <PreferenceBlock title="Preferred Genders">
        {(enums.Gender || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.preferredGenders || []).includes(o.value)}
            onPress={() => onToggle("preferredGenders", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* PREFERRED ORIENTATIONS */}
      <PreferenceBlock title="Preferred Orientations">
        {(enums.SexualOrientation || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.preferredOrientations || []).includes(o.value)}
            onPress={() => onToggle("preferredOrientations", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* PREFERRED PRONOUNS */}
      <PreferenceBlock title="Preferred Pronouns">
        {(enums.Pronoun || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.preferredPronouns || []).includes(o.value)}
            onPress={() => onToggle("preferredPronouns", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* HEIGHT */}
      <PreferenceBlock title="Height (cm)">
        <TouchableOpacity
          onPress={() => setShowHeightSelect((s) => !s)}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {form.heightCm ? `${form.heightCm} cm` : "Select your height"}
          </Text>
        </TouchableOpacity>

        {showHeightSelect && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 8,
              maxHeight: 220,
              overflow: "scroll",
              backgroundColor: "#fff",
            }}
          >
            {Array.from({ length: 121 }, (_, i) => i + 100).map((h) => (
              <TouchableOpacity
                key={h}
                onPress={() => {
                  onChange("heightCm", h);
                  setShowHeightSelect(false);
                }}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text>{h} cm</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </PreferenceBlock>

      {/* PREFERRED INTENTIONS */}
      <PreferenceBlock title="Preferred Intentions">
        {(enums.Intention || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.preferredIntentions || []).includes(o.value)}
            onPress={() => onToggle("preferredIntentions", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* PREFERRED RELATIONSHIP TYPES */}
      <PreferenceBlock title="Preferred Relationship Types">
        {(enums.RelationshipType || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.preferredRelationshipTypes || []).includes(o.value)}
            onPress={() => onToggle("preferredRelationshipTypes", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* PREFERRED ZODIACS */}
      <PreferenceBlock title="Preferred Zodiacs">
        {(enums.ZodiacSign || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.preferredZodiacs || []).includes(o.value)}
            onPress={() => onToggle("preferredZodiacs", o.value)}
          />
        ))}
      </PreferenceBlock>
    </View>
  );
}
