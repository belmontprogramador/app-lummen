import { View, TextInput, TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // ✅ ADICIONADO

import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockBasicInfo({
  enums = {},
  form = {},
  onChange = () => {},
  onToggle = () => {},
}: any) {
  const { t } = useTranslation(); // ✅ ADICIONADO

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
      <PreferenceBlock title={t("profile.bio")}>
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
      <PreferenceBlock title={t("profile.birthday")}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
          }}
        >
          <Text style={{ color: form.birthday ? "#000" : "#777" }}>
            {form.birthday || t("profile.selectBirthday")}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={form.birthday ? new Date(form.birthday) : new Date("1990-01-01")}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
      </PreferenceBlock>

      {/* GENDER */}
      <PreferenceBlock title={t("profile.gender")}>
        {(enums.Gender || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.gender || []).includes(o.value)}  // ✅ MARCAÇÃO CORRETA
            onPress={() => onToggle("gender", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* ORIENTATION */}
      <PreferenceBlock title={t("profile.orientation")}>
        {(enums.SexualOrientation || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.orientation || []).includes(o.value)}
            onPress={() => onToggle("orientation", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* PRONOUN */}
      <PreferenceBlock title={t("profile.pronoun")}>
        {(enums.Pronoun || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.pronoun || []).includes(o.value)}
            onPress={() => onToggle("pronoun", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* HEIGHT */}
      <PreferenceBlock title={t("profile.height")}>
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
            {form.heightCm ? `${form.heightCm} cm` : t("profile.selectHeight")}
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

      {/* INTENTION */}
      <PreferenceBlock title={t("profile.intention")}>
        {(enums.Intention || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.intention || []).includes(o.value)}
            onPress={() => onToggle("intention", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* RELATIONSHIP TYPE */}
      <PreferenceBlock title={t("profile.relationshipType")}>
        {(enums.RelationshipType || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.relationshipType || []).includes(o.value)}
            onPress={() => onToggle("relationshipType", o.value)}
          />
        ))}
      </PreferenceBlock>

      {/* ZODIAC */}
      <PreferenceBlock title={t("profile.zodiac")}>
        {(enums.ZodiacSign || []).map((o: any) => (
          <PreferenceChip
            key={o.value}
            label={o.label}
            active={(form.zodiac || []).includes(o.value)}
            onPress={() => onToggle("zodiac", o.value)}
          />
        ))}
      </PreferenceBlock>
    </View>
  );
}
