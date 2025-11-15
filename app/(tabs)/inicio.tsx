import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { UsersAPI } from "@/service/users";
import { useTranslation } from "react-i18next";

export default function Inicio() {
  useAuthGuard();

  const { t } = useTranslation();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await UsersAPI.list(1, 20);
      setUsers(res.data.items || []);
    } catch (e) {
      console.log("Erro ao carregar usuários:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{t("inicio.noUsers")}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {users.map((u) => (
        <ScrollView
          key={u.id}
          style={{
            width: screenWidth,
            padding: 20,
          }}
        >
          {/* FOTO PRINCIPAL */}
          <Image
            source={{ uri: `https://botgrupo.lummen-app.com${u.photo}` }}
            style={{
              width: 320,
              height: 320,
              borderRadius: 20,
              alignSelf: "center",
              marginBottom: 20,
              backgroundColor: "#eee",
            }}
          />

          {/* NOME DO USUÁRIO */}
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {u.name || "—"}
          </Text>

          {/* EMAIL */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginBottom: 20,
              color: "#444",
            }}
          >
            {u.email}
          </Text>

          {/* PROFILE */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            Profile:
          </Text>

          {Object.keys(u.profile || {})
            .filter((key) => key !== "name")
            .map((key) => (
              <Text key={key} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: "bold" }}>{key}: </Text>
                {u.profile[key] ?? "—"}
              </Text>
            ))}

          {/* PREFERENCES */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Preferences:
          </Text>

          {Object.keys(u.preference || {}).map((key) => (
            <Text key={key} style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>{key}: </Text>
              {u.preference[key] ?? "—"}
            </Text>
          ))}

          {/* CARROSSEL DE FOTOS */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Photos:
          </Text>

          {u.photos && u.photos.length > 0 ? (
            u.photos.map((p: any) => (
              <Image
                key={p.id}
                source={{
                  uri: `https://botgrupo.lummen-app.com${p.url}`,
                }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
              />
            ))
          ) : (
            <Text>—</Text>
          )}

          {/* PAGAMENTOS */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Payments:
          </Text>

          {u.payments && u.payments.length > 0 ? (
            u.payments.map((p: any) => (
              <Text key={p.id}>
                <Text style={{ fontWeight: "bold" }}>Payment: </Text>
                {p.amount} {p.currency} — {p.status}
              </Text>
            ))
          ) : (
            <Text>—</Text>
          )}

          {/* CRÉDITOS */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Credits:
          </Text>

          {u.credits && u.credits.length > 0 ? (
           u.credits.map((c: any) => (
              <Text key={c.id}>
                <Text style={{ fontWeight: "bold" }}>{c.type}: </Text>
                {c.credits} créditos (usados {c.used})
              </Text>
            ))
          ) : (
            <Text>—</Text>
          )}

          {/* BOOSTS */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Boosts:
          </Text>

          {u.boosts && u.boosts.length > 0 ? (
          u.boosts.map((b: any) => (
              <Text key={b.id}>
                <Text style={{ fontWeight: "bold" }}>{b.type}: </Text>
                {b.status}
              </Text>
            ))
          ) : (
            <Text>—</Text>
          )}

          <View style={{ marginBottom: 80 }} />
        </ScrollView>
      ))}
    </ScrollView>
  );
}
