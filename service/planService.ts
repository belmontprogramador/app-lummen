import api from "@/service/api";
import axios from "axios";

export const PlanAPI = {
  // 🔥 Buscar planos públicos (automático por IP)
  async listPublicPlans() {
    console.log("📡 Buscando planos públicos...");

    try {
      const res = await api.get("/plans/public");

      console.log("✅ Planos recebidos:", res.data);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("❌ Erro ao buscar planos:", err.response?.data);
        throw err.response?.data || err;
      }

      console.log("❌ Erro inesperado:", err);
      throw err;
    }
  },
};
