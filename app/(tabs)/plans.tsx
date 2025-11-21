import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

export default function PlansScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
      }}
    >
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

      {/* =========================== */}
      {/* PLAN FREE */}
      {/* =========================== */}
      <View
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
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
          Free Plan
        </Text>

        <Text style={{ color: "#666", marginBottom: 15 }}>
          Basic experience with limited features.
        </Text>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 15 }}>• Limited discovery</Text>
          <Text style={{ fontSize: 15 }}>• Standard filters</Text>
          <Text style={{ fontSize: 15 }}>
            • No access to premium preferences
          </Text>
        </View>

        <TouchableOpacity
          disabled
          style={{
            backgroundColor: "#ccc",
            paddingVertical: 12,
            borderRadius: 10,
            marginTop: 10,
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
      </View>

      {/* =========================== */}
      {/* PLAN PREMIUM */}
      {/* =========================== */}
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 4,
            color: "#7b2cff",
          }}
        >
          Premium
        </Text>

        <Text style={{ color: "#666", marginBottom: 15 }}>
          Everything you need to elevate your experience.
        </Text>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 15 }}>• Unlimited filters & discovery</Text>
          <Text style={{ fontSize: 15 }}>• Premium preferences unlocked</Text>
          <Text style={{ fontSize: 15 }}>• Priority visibility</Text>
          <Text style={{ fontSize: 15 }}>• Match with high-intent users</Text>
        </View>

        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          $14.99 <Text style={{ fontSize: 16 }}>/month</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.push("/checkout/premium");
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
            Upgrade to Premium
          </Text>
        </TouchableOpacity>
      </View>

      {/* ====== BACK BUTTON ====== */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 30, alignSelf: "center" }}
      >
        <Text style={{ fontSize: 16, color: "#7b2cff" }}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
