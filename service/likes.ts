import api from "./api";

export const LikesAPI = {
  //
  // ❤️ LIKE
  //
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
    return res.data; // { liked: boolean }
  },

  async received() {
    const res = await api.get("/likes/received");
    return res.data;
  },

  //
  // 💔 DISLIKE
  //
  async dislike(dislikedId: string) {
    const res = await api.post("/likes/dislike", { dislikedId });
    return res.data;
  },

  async removeDislike(dislikedId: string) {
    const res = await api.delete(`/likes/dislike/${dislikedId}`);
    return res.data;
  },

  //
  // ⏭ SKIP
  //
  async skip(skippedId: string) {
    const res = await api.post("/likes/skip", { skippedId });
    return res.data;
  },
};
