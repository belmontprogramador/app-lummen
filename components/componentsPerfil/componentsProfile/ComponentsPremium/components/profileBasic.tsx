// src/components/componentsPerfil/componentsProfile/ComponentsPremium/components/profileBasic.tsx
import { View, ScrollView } from "react-native";

// 🔹 Blocos do perfil
import BlockBasicInfo from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/BlockBasicInfo";
import BlockLocation from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/BlockLocation";

interface Props {
  enums?: any;
  form?: any;
  onChange?: (field: string, value: any) => void;
  onToggle?: (field: string, value: string) => void;
}

export default function ProfileBasic({
  enums = {},
  form = {},
  onChange = () => {},
  onToggle = () => {},
}: Props) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {/* 🔹 Informações básicas */}
        <BlockBasicInfo enums={enums} form={form} onChange={onChange} onToggle={onToggle} />

        <View style={{ height: 16 }} />

        {/* 🔹 Localização */}
        <BlockLocation form={form} onChange={onChange} />
        
      </View>
    </ScrollView>
  );
}
