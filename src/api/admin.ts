import api from "./axios"; // axios instance kamu
import type { Game } from "../types/Game";
import type { Product } from "../types/Product";
import type {
  OrderItem,
  GetOrders,
  CheckoutPayload,
  CheckoutResponse,
  UploadPaymentResponse,
} from './../types/Order'

/* =========================
   DASHBOARD
========================= */

export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

/* =========================
   GAME MANAGEMENT
========================= */

export const getAllGames = async () => {
  const response = await api.get("/admin/games");
  return response.data.data;
};

export const createGame = async (payload: FormData) => {
  const response = await api.post("/admin/games", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateGame = async (id: number, payload: FormData) => {
  const response = await api.post(`/admin/games/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteGame = async (id: number) => {
  const response = await api.delete(`/admin/games/${id}`);
  return response.data;
};

/* =========================
   PRODUCT MANAGEMENT
========================= */

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/admin/products");
  return response.data.data;
};

export const createProduct = async (payload: FormData) => {
  const response = await api.post("/admin/products", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (id: number, payload: FormData) => {
  const response = await api.post(`/admin/products/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

/* =========================
   ORDER MANAGEMENT
========================= */

export const getAllOrders = async (): Promise<OrderItem[]> => {
  const response = await api.get("/admin/orders");
  return response.data.data;
};

// export const verifyOrder = async (id: number) => {
//   const response = await api.patch(`/admin/orders/${id}/verify`);
//   return response.data;
// };
export const verifyOrder = async (
  id: number,
  status: string,
  admin_note: string
) => {
  const response = await api.put(`/admin/orders/${id}/verify`, {
    status,
    admin_note,
  });

  return response.data;
};

export const rejectOrder = async (id: number) => {
  const response = await api.patch(`/admin/orders/${id}/reject`);
  return response.data;
};