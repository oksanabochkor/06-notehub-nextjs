import axios from "axios";

// 🔐 базовий URL (як був у тебе)
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// 🔑 токен
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// 🔹 отримати всі нотатки (з пошуком)
export const fetchNotes = async (search: string = "") => {
  const response = await axios.get("/notes", {
    params: {
      search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 🔹 створити нотатку
export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await axios.post("/notes", note, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 🔹 видалити нотатку
export const deleteNote = async (id: string) => {
  const response = await axios.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 🔹 отримати одну нотатку
export const fetchNoteById = async (id: string) => {
  const response = await axios.get(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
