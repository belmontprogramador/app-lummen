import api from "@/service/api";

export const BlogAPI = {
  // ✅ FEED PRINCIPAL DO APP (LISTAGEM)
  async listFeed(page = 1, limit = 10) {
    console.log("📡 Buscando feed:", { page, limit });

    const res = await api.get(
      `/blog-feed?page=${page}&limit=${limit}`
    );

    console.log("✅ Feed recebido:", res.data);
    return res.data;
  },

  // ✅ DETALHE DO POST POR ID
  async getPostById(id: string) {
    console.log("📡 Buscando post por ID:", id);

    const res = await api.get(`/blog-feed/${id}`);

    console.log("✅ Post recebido:", res.data);
    return res.data;
  },

  // ✅ LISTAR CATEGORIAS
  async listCategories() {
    console.log("📡 Buscando categorias...");

    const res = await api.get("/blog-categories");

    console.log("✅ Categorias recebidas:", res.data);
    return res.data;
  },

  // ✅ LISTAR POSTS POR CATEGORIA
  async listPostsByCategory(categoryId: string, page = 1, limit = 10) {
    console.log("📡 Buscando posts da categoria:", categoryId);

    const res = await api.get(
      `/blog-post/category/${categoryId}?page=${page}&limit=${limit}`
    );

    console.log("✅ Posts da categoria recebidos:", res.data);
    return res.data;
  },
};
