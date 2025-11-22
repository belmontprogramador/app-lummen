import api from "./api";

export const LikesAPI = {
  // 🔹 Criar um like ou super like
  async create(likedId: string, isSuper = false) {
    const res = await api.post("/likes", { likedId, isSuper });
    return res.data;
  },

  // 🔹 Remover um like existente
  async remove(likedId: string) {
    const res = await api.delete(`/likes/${likedId}`);
    return res.data;
  },

  // 🔹 Verificar se já dei like em alguém
  async check(likedId: string) {
    const res = await api.get(`/likes/check/${likedId}`);
    return res.data; // { liked: boolean, isSuper: boolean }
  },

  // 🔹 Listar quem me deu like
  async received() {
    const res = await api.get("/likes/received");
    return res.data; // lista de usuários que curtiram você
  },
};
