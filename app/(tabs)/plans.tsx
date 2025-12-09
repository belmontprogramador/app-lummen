import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { PlanAPI } from "@/service/planService";

interface Plan {
  id: string;
  name: string;
  title: string;
  price: number | null;
  currency: string;
  features: any;
  durationDays: number;
}

export default function PlansScreen() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 🔥 Busca os planos no backend
  // ==========================================
  useEffect(() => {
    async function load() {
      try {
        const data = await PlanAPI.listPublicPlans();
        setPlans(data);
      } catch (err) {
        console.log("❌ Erro ao carregar planos:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ==========================================
  // 🔥 Monta a URL do checkout externo (iOS)
  // ==========================================
  function buildCheckoutUrl(plan: Plan) {
    return `https://lummenapp.com/checkout?id=${plan.id}&name=${plan.name}&price=${plan.price}&currency=${plan.currency}`;
  }

  // ==========================================
  // 🔥 Enquanto carrega
  // ==========================================
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ActivityIndicator size="large" color="#7b2cff" />
        <Text style={{ marginTop: 10, color: "#444" }}>
          Loading your plans...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
      }}
    >
      {/* HEADER */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Choose Your Plan
      </Text>

      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: "#555",
          marginBottom: 25,
        }}
      >
        Unlock advanced filters, premium preferences and better match control.
      </Text>

      {/* ==========================================
          🔥 LISTAGEM DINÂMICA DE PLANOS
         ========================================== */}
      {plans.map((plan) => {
        const isFree = plan.name.toLowerCase() === "free";

        return (
          <View
            key={plan.id}
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOpacity: 0.07,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            {/* TITLE */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 4,
                color: isFree ? "#000" : "#7b2cff",
              }}
            >
              {plan.title}
            </Text>

            {/* PRICE */}
            {!isFree && (
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 15,
                }}
              >
                {plan.currency} {plan.price}
                <Text style={{ fontSize: 16 }}>/month</Text>
              </Text>
            )}

            {/* FEATURES */}
            <View style={{ marginBottom: 15 }}>
              {Array.isArray(plan.features) ? (
                plan.features.map((f, i) => (
                  <Text key={i} style={{ fontSize: 15 }}>
                    • {f}
                  </Text>
                ))
              ) : typeof plan.features === "object" ? (
                Object.entries(plan.features).map(([key, value], i) => (
                  <Text key={i} style={{ fontSize: 15 }}>
                    • {key}: {JSON.stringify(value)}
                  </Text>
                ))
              ) : (
                <Text style={{ fontSize: 15 }}>• {String(plan.features)}</Text>
              )}
            </View>

            {/* ==========================================
                🔥 BOTÃO PARA UPGRADE
               ========================================== */}
            {isFree ? (
              <TouchableOpacity
                disabled
                style={{
                  backgroundColor: "#ccc",
                  paddingVertical: 12,
                  borderRadius: 10,
                  opacity: 0.6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Current Plan
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === "ios") {
                    // 🔥 iPhone → abrir checkout externo
                    const url = buildCheckoutUrl(plan);
                    Linking.openURL(url);
                  } else {
                    // 🔥 Android + Web → navegar dentro do app
                    router.push(
                      `/checkout/premium?id=${plan.id}&name=${plan.name}&price=${plan.price}&currency=${plan.currency}`
                    );
                  }
                }}
                style={{
                  backgroundColor: "#7b2cff",
                  paddingVertical: 14,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "600",
                  }}
                >
                  Upgrade to {plan.title}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 30, alignSelf: "center" }}
      >
        <Text style={{ fontSize: 16, color: "#7b2cff" }}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
