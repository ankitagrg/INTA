import api from "../api/axiosClient";

export async function startSession(category) {
  const { data } = await api.post("/sessions/start", { category });
  return data;
}

export async function submitAnswer({ sessionId, questionId, answerText }) {
  const { data } = await api.post("/sessions/answer", { sessionId, questionId, answerText });
  return data;
}

export async function getNextQuestion(sessionId) {
  const { data } = await api.get(`/sessions/${sessionId}/next-question`);
  return data;
}

export async function getSessionResults(sessionId) {
  const { data } = await api.get(`/sessions/${sessionId}/results`);
  return data;
}

export async function completeSession(sessionId) {
  const { data } = await api.post(`/sessions/${sessionId}/complete`);
  return data;
}

export async function getDashboard() {
  const { data } = await api.get("/sessions/dashboard");
  return data;
}
