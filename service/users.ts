import api from "./api";
import { User, UserUpdateData } from "@/types/user";
import { LoginResponse } from "@/types/auth";
import { PaginationResponse } from "@/types/api";

// ----------------------------------------------------
// UPLOAD UTIL (mantido 100% intacto)
// ----------------------------------------------------
export async function uploadWithPhoto(
  endpoint: string,
  data: Record<string, any>,
  method: "POST" | "PATCH" = "PATCH"
) {
  const form = new FormData();

  for (const key in data) {
    const value = data[key];

    // 1) FOTO PRINCIPAL
    if (key === "photo" && value) {
      const file = await prepareFile(value);
      form.append("photo", file as any);
      continue;
    }

    // 2) FOTOS EXTRAS (galeria)
    if (key === "photos" && Array.isArray(value)) {
      for (const item of value) {
        const file = await prepareFile(item);
        form.append("photos", file as any);
      }
      continue;
    }

    // 3) ALTERAÇÃO POR POSIÇÃO (galeria)
    if (key === "photo_position_file" && value) {
      const file = await prepareFile(value);
      form.append("photo_position_file", file as any);
      continue;
    }

    if (key === "photo_position_index") {
      form.append("photo_position_index", String(value));
      continue;
    }

    // 4) CAMPOS SIMPLES
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      form.append(key, String(value));
      continue;
    }

    // 5) ARRAYS
    if (Array.isArray(value)) {
      value.forEach((v) => form.append(key + "[]", String(v)));
      continue;
    }

    // 6) JSON
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
  // WEB
  if (typeof File !== "undefined" && item instanceof File) {
    return item;
  }

  // WEB (URI)
  if (item?.uri && typeof window !== "undefined") {
    const blob = await fetch(item.uri).then((res) => res.blob());
    return new File([blob], item.name || "file.jpg", { type: blob.type });
  }

  // MOBILE
  return {
    uri: item.uri,
    type: item.type || "image/jpeg",
    name: item.name || "file.jpg",
  };
}

// ----------------------------------------------------
// USERS API — total refactor
// ----------------------------------------------------

export const UsersAPI = {
  // CREATE USER (com foto)
  create: (data: Record<string, any>) =>
    uploadWithPhoto("/users", data, "POST"),

  // LOGIN
  login: (email: string, password: string) =>
    api.post<LoginResponse>("/users/login", { email, password }),

  // LIST USERS
  list: (page = 1, limit = 20, q = "") =>
    api.get<PaginationResponse<User>>("/users", {
      params: { page, limit, q },
    }),

  // GET SINGLE
  getOne: (id: string) => api.get<User>(`/users/${id}`),

  // UPDATE USER (com ou sem foto)
  update: (id: string, data: UserUpdateData) => {
    const hasFiles =
      data.photo ||
      data.photos ||
      data.photo_position_file;

    if (hasFiles) {
      return uploadWithPhoto(`/users/${id}`, data, "PATCH");
    }

    return api.patch(`/users/${id}`, data);
  },

  // DELETE USER
  remove: (id: string) => api.delete(`/users/${id}`),

  // ADMIN: STATUS
  setStatus: (id: string, status: string) =>
    api.patch(`/users/${id}/status`, { status }),
};
