import api from "./api";

export const MessagesAPI = {

  async getHistory(userId: string) {
    const res = await api.get(`/messages/${userId}`);
    return res.data;
  },

  async sendText(toUserId: string, text: string) {
    const res = await api.post("/messages", { toUserId, text });
    return res.data;
  },

  async sendImage(toUserId: string, imageUrl: string) {
    const res = await api.post("/messages", { toUserId, imageUrl });
    return res.data;
  },

};
