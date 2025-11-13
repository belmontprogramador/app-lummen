import api from "./api";
import { User, UserUpdateData } from "@/types/user";
import { LoginResponse } from "@/types/auth";
import { PaginationResponse } from "@/types/api";

/**
 * Tratamento TOTAL do FormData
 * Funciona no Web, iOS e Android
 */
export async function uploadWithPhoto(endpoint: string, data: Record<string, any>) {
  const form = new FormData();

  for (const key in data) {
    if (key === "photo") {
      const photo = data.photo;

      // WEB → transforma URI em Blob
      if (photo?.uri && !photo.file) {
        const blob = await fetch(photo.uri).then((res) => res.blob());
        form.append("photo", blob, photo.name || "photo.jpg");
      } else {
        // iOS / Android
        form.append("photo", photo.file || photo, photo.name);
      }
    } else {
      form.append(key, data[key]);
    }
  }

  return api.post(endpoint, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export const UsersAPI = {
  create: (data: Record<string, any>) => uploadWithPhoto("/users", data),

  login: (email: string, password: string) =>
    api.post<LoginResponse>("/users/login", { email, password }),

  list: (page = 1, limit = 20, q = "") =>
    api.get<PaginationResponse<User>>("/users", {
      params: { page, limit, q },
    }),

  getOne: (id: string) => api.get<User>(`/users/${id}`),

  update: (id: string, data: UserUpdateData) =>
    data.photo
      ? uploadWithPhoto(`/users/${id}`, data)
      : api.patch(`/users/${id}`, data),

  remove: (id: string) => api.delete(`/users/${id}`),

  setStatus: (id: string, status: string) =>
    api.patch(`/users/${id}/status`, { status }),

  forgotPassword: (email: string) =>
    api.post("/users/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    api.post("/users/reset-password", { token, newPassword }),
};
