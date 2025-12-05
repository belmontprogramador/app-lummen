import { View, Text, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";  // Usando o useLocalSearchParams para acessar os parâmetros

export default function PremiumCheckout() {
  const { id, name, price, currency } = useLocalSearchParams();  // Usando useLocalSearchParams para acessar os parâmetros

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>Checkout</Text>
      
      {/* Exibe as informações do plano */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Plano: {name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Preço: {currency} {price}</Text>

      {/* Adiciona um botão de confirmação */}
      <Button
        title="Confirmar pagamento"
        onPress={() => {
          console.log("Pagamento confirmado!");
          // Lógica do pagamento aqui
        }}
      />
    </View>
  );
}
