import { Modal, View, Text, TouchableOpacity } from "react-native";
import React from "react-native";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
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
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            {title}
          </Text>

          <Text style={{ fontSize: 16, color: "#444", marginBottom: 25 }}>
            {message}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onCancel} style={{ marginRight: 15 }}>
              <Text style={{ fontSize: 16, color: "#555" }}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#7b2cff" }}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
