import api from "./api";

export const LikesAPI = {
  async create(likedId: string, isSuper = false) {
    const res = await api.post("/likes", { likedId, isSuper });
    return res.data;
  },

  async remove(likedId: string) {
    const res = await api.delete(`/likes/${likedId}`);
    return res.data;
  },

  async check(likedId: string) {
    const res = await api.get(`/likes/check/${likedId}`);
    return res.data;
  },

  async received() {
    const res = await api.get("/likes/received");
    return res.data;
  },

  async getAll() {
    const res = await api.get("/likes/all");
    return res.data;
  },

  async getSent() {
    const res = await api.get("/likes/sent");
    return res.data;
  },

  async dislike(dislikedId: string) {
    const res = await api.post("/likes/dislike", { dislikedId });
    return res.data;
  },

  async removeDislike(dislikedId: string) {
    const res = await api.delete(`/likes/dislike/${dislikedId}`);
    return res.data;
  },

  async skip(skippedId: string) {
    const res = await api.post("/likes/skip", { skippedId });
    return res.data;
  },

  // ✅ AQUI! Função nova para listar matches
  async matches() {
    const res = await api.get("/likes/matches");
    return res.data;
  },
};
