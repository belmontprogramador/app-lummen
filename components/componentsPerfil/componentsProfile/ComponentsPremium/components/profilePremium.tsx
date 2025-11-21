// src/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profilePremium.tsx
import { View, ScrollView } from "react-native";

// 🔹 Blocos do perfil premium
import BlockLifestyle from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/BlockLifestyle";
import BlockWorkEducation from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/BlockWorkEducation";
import BlockLanguages from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/BlockLanguages";
import BlockInterests from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/BlockInterests";

interface Props {
  enums?: any;
  form?: any;
  onChange?: (field: string, value: any) => void;
  onToggle?: (field: string, value: string) => void;
}

export default function ProfilePremium({
  enums = {},
  form = {},
  onChange = () => {},
  onToggle = () => {},
}: Props) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {/* 🔹 Lifestyle */}
        <BlockLifestyle enums={enums} form={form} onToggle={onToggle} />

        <View style={{ height: 16 }} />

        {/* 🔹 Trabalho e Educação */}
        <BlockWorkEducation enums={enums} form={form} onChange={onChange} onToggle={onToggle} />

        <View style={{ height: 16 }} />

        {/* 🔹 Línguas */}
        <BlockLanguages enums={enums} form={form} onToggle={onToggle} />

        <View style={{ height: 16 }} />

        {/* 🔹 Interesses */}
        <BlockInterests enums={enums} form={form} onToggle={onToggle} />
      </View>
    </ScrollView>
  );
}
