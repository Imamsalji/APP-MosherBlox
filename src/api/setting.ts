import api from "./axios"; // axios instance kamu

export const UpdatePassword = async (payload: FormData) => {
  const response = await api.post("/account/password", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const UpdateProfile = async (payload: FormData) => {
  const response = await api.post("/account", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};