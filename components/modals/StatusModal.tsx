// src/components/modals/StatusModal.tsx

import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onClose: () => void;
};

export default function StatusModal({
  visible,
  title = "Tudo certo!",
  message = "Operação realizada com sucesso.",
  buttonText = "OK",
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.45)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 14,
            padding: 22,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#444",
              textAlign: "center",
              marginBottom: 25,
            }}
          >
            {message}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={{
              alignSelf: "center",
              backgroundColor: "#7b2cff",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
