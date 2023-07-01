import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://fatura-takip-backend.onrender.com",
});

/* ========================= Student ===================== */
export async function addNewStudent(studentData) {
  return await HTTP.post("/student/add", studentData);
}

export async function getAllStudent() {
  return await HTTP.get("/student/get");
}

export async function deleteStudent(id) {
  return await HTTP.post("/student/delete", id);
}

/* ========================= Bill ===================== */

export async function togglePaid(data) {
  return await HTTP.put("/bill/toggle", data);
}

export async function addBilltoDB(data) {
  return await HTTP.post("/bill/add", data);
}

export async function getBillstoDB() {
  return await HTTP.get("/bill/get");
}

/* ========================= Announce ===================== */

export async function addAnnouncestoDB(data) {
  return await HTTP.post("/announce/add", data);
}

export async function getAnnouncestoDB() {
  return await HTTP.get("/announce/get");
}

export async function deleteAnnouncestoDB(id) {
  return await HTTP.delete(`/announce/delete/${id}`);
}

/* ========================= Courses ===================== */

export async function addCoursetoDB(data) {
  return await HTTP.post("/course/add", data);
}

export async function getCoursetoDB() {
  return await HTTP.get("/course/get");
}

export async function deleteCoursetoDB(id) {
  return await HTTP.delete(`/course/delete/${id}`);
}
