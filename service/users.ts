import api from "./api";
import { User, UserUpdateData } from "@/types/user";
import { LoginResponse } from "@/types/auth";
import { PaginationResponse } from "@/types/api";



export async function uploadWithPhoto(
  endpoint: string,
  data: Record<string, any>,
  method: "POST" | "PATCH" = "PATCH"
) {
  const form = new FormData();

  for (const key in data) {
    const value = data[key];

    // -----------------------------
    // 📌 1) CAMPOS DE ARQUIVO
    // -----------------------------
    if (key === "photo" && value) {
      const file = await prepareFile(value);
      form.append("photo", file as any);
      continue;
    }

    if (key === "photos" && Array.isArray(value)) {
      for (const item of value) {
        const file = await prepareFile(item);
        form.append("photos", file as any);
      }
      continue;
    }

    if (key === "photo_position_file" && value) {
      const file = await prepareFile(value);
      form.append("photo_position_file", file as any);
      continue;
    }

    if (key === "photo_position_index") {
      form.append("photo_position_index", String(value));
      continue;
    }

    // -----------------------------
    // 📌 2) STRINGS / NÚMEROS / BOOLEAN
    // -----------------------------
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      form.append(key, String(value));
      continue;
    }

    // -----------------------------
    // 📌 3) ARRAYS DE STRINGS (idiomas, interesses etc)
    // -----------------------------
    if (Array.isArray(value)) {
      value.forEach((v) => form.append(key + "[]", String(v)));
      continue;
    }

    // -----------------------------
    // 📌 4) QUALQUER OUTRO TIPO
    // -----------------------------
    if (value !== undefined && value !== null) {
      form.append(key, JSON.stringify(value));
    }
  }

  return api.request({
    url: endpoint,
    method,
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
}


async function prepareFile(item: any): Promise<any> {
  // WEB — já é File
  if (typeof File !== "undefined" && item instanceof File) {
    return item;
  }

  // WEB — URI precisa virar Blob
  if (item?.uri && typeof window !== "undefined") {
    const blob = await fetch(item.uri).then((res) => res.blob());
    return new File([blob], item.name || "file.jpg", { type: blob.type });
  }

  // MOBILE — padrão React Native
  return {
    uri: item.uri,
    type: item.type || "image/jpeg",
    name: item.name || "file.jpg",
  };
}


export const UsersAPI = {
  create: (data: Record<string, any>) => uploadWithPhoto("/users", data, "POST"),

  login: (email: string, password: string) =>
    api.post<LoginResponse>("/users/login", { email, password }),

  list: (page = 1, limit = 20, q = "") =>
    api.get<PaginationResponse<User>>("/users", {
      params: { page, limit, q },
    }),

  getOne: (id: string) => api.get<User>(`/users/${id}`),

update: (id: string, data: UserUpdateData) => {
  const hasFiles =
    data.photo ||
    data.photos ||
    data.photo_position_file;

  if (hasFiles) {
    return uploadWithPhoto(`/users/${id}`, data, "PATCH");
  }

  // PATCH JSON normal quando não há arquivos
  return api.patch(`/users/${id}`, data);
},



  remove: (id: string) => api.delete(`/users/${id}`),

  setStatus: (id: string, status: string) =>
    api.patch(`/users/${id}/status`, { status }),

  forgotPassword: (email: string) =>
    api.post("/users/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    api.post("/users/reset-password", { token, newPassword }),
};
