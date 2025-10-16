import { create } from "zustand";
import { api } from "../lib/axios";
import type { AxiosError } from "axios";
import type { LanguageStore } from "../types/language";

const useLanguageStore = create<LanguageStore>((set) => ({
  languages: [],
  loading: false,
  error: null,

  fetchLanguages: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/language");
      set({ languages: res.data.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  addLanguage: async (data) => {
    try {
      const res = await api.post("/language", data);
      set((state) => ({ languages: [...state.languages, res.data.data] }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  updateLanguage: async (id, data) => {
    try {
      const res = await api.put(`/language/${id}`, data);
      set((state) => ({
        languages: state.languages.map((l) => (l._id === id ? res.data : l)),
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteLanguage: async (id) => {
    try {
      await api.delete(`/language/${id}`);
      set((state) => ({
        languages: state.languages.filter((l) => l._id !== id),
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}));

export default useLanguageStore;
