import axios from "axios";

const BASE_URL =
  "https://81ddadcb-aef7-4c78-a255-e50a3da2f3c9.mock.pstmn.io/api/shops";

export const shopApi = {
  getAll: () => axios.get(BASE_URL),

  getById: (id) => axios.get(`${BASE_URL}/${id}`),

  create: (data) => axios.post(BASE_URL, data),

  update: (id, data) => axios.patch(`${BASE_URL}/${id}`, data),

  toggleStatus: (id, isActive) =>
    axios.patch(`${BASE_URL}/${id}/status`, {
      IsActive: isActive,
    }),
};