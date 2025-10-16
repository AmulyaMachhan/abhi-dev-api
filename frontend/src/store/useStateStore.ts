import { create } from "zustand";
import type { AxiosError } from "axios";
import type { StateStore, State } from "../types/state";
import { api } from "../lib/axios";

const useStateStore = create<StateStore>((set) => ({
  states: [],
  loading: false,
  error: null,

  fetchStates: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get<{ data: State[] }>("/state");
      set({ states: res.data.data.states });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch states",
      });
    } finally {
      set({ loading: false });
    }
  },

  addState: async (data: { name: string; country: string }) => {
    try {
      const res = await api.post<{ data: State }>("/state", data);
      set((state) => ({ states: [...state.states, res.data.data] }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  updateState: async (id: string, data: { name: string; country: string }) => {
    try {
      const res = await api.put<{ data: State }>(`/state/${id}`, data);
      set((state) => ({
        states: state.states.map((s) => (s._id === id ? res.data.data : s)),
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteState: async (id: string) => {
    try {
      await api.delete(`/state/${id}`);
      set((state) => ({
        states: state.states.filter((s) => s._id !== id),
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}));

export default useStateStore;
