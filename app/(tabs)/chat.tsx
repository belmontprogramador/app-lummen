import { View } from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import MatchList from "@/components/chat/MatchList";

export default function Chat() {
  useAuthGuard();

  return (
    <View style={{ flex: 1 }}>
      <MatchList />
    </View>
  );
}
