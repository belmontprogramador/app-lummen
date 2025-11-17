import api from "./api";

export const userProfilesService = {
  async getMyProfile() {
    return api.get("/user-profiles/me");
  },

  async updateProfile(data: any) {
    return api.put("/user-profiles", data);
  },

  // 🚀 NOVO — buscar enums traduzidos
  async getProfileEnums() {
    return api.get("/user-profiles/enums");
  }
};
