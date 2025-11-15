import api from "./api";

async function prepareFile(item: any): Promise<any> {
  if (typeof File !== "undefined" && item instanceof File) return item;

  if (item?.uri && typeof window !== "undefined") {
    const blob = await fetch(item.uri).then((res) => res.blob());
    return new File([blob], item.name || "file.jpg", { type: blob.type });
  }

  return {
    uri: item.uri,
    name: item.name || "file.jpg",
    type: item.type || "image/jpeg",
  };
}

export const PhotosAPI = {
  list: (userId: string) =>
    api.get(`/user-photos/user/${userId}`),

  addOne: async (userId: string, file: any) => {
    const form = new FormData();
    form.append("photo", await prepareFile(file) as any);

    return api.post(`/user-photos/user/${userId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadMultiple: async (userId: string, files: any[]) => {
    const form = new FormData();
    for (const file of files) {
      form.append("photos", await prepareFile(file) as any);
    }

    return api.post(`/user-photos/user/${userId}/multi`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updatePosition: async (userId: string, position: number, file: any) => {
    const form = new FormData();
    form.append("photo", await prepareFile(file));

    return api.patch(`/user-photos/user/${userId}/position/${position}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  bulk: async (userId: string, data: any[], files: any[] = []) => {
    const form = new FormData();
    form.append("data", JSON.stringify(data));

    for (const file of files) {
      form.append("files", await prepareFile(file));
    }

    return api.patch(`/user-photos/user/${userId}/bulk`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  remove: (photoId: string) =>
    api.delete(`/user-photos/photo/${photoId}`),
};
