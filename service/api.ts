import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://botgrupo.lummen-app.com",
  timeout: 30000,
});

// Interceptor para incluir token JWT
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // API-KEY obrigatória no seu backend:
  config.headers["x-api-key"] = "Ofuturoeosucessoenosso";
  return config;
});

export default api;
