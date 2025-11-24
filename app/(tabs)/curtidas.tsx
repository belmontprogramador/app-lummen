import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import LikesSection from "@/components/componentsCurtidas/LikesSection";

export default function CurtidasTab() {
  useAuthGuard();

  return <LikesSection />;
}
