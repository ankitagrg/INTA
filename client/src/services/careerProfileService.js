import api from "../api/axiosClient";

export async function getProfileOptions() {
  const { data } = await api.get("/profile/options");
  return data;
}

export async function getMyProfile() {
  const { data } = await api.get("/profile");
  return data;
}

export async function saveMyProfile(payload) {
  const { data } = await api.put("/profile", payload);
  return data;
}
