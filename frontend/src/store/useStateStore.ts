import { create } from "zustand";
import type { AxiosError } from "axios";
import type { StateStore, State } from "../types/state";
import { api } from "../lib/axios";

const useStateStore = create<StateStore>((set) => ({
  states: [],
  loading: false,
  error: null,

  fetchStates: async (limit?: number) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get<{ data: State[] }>(`/state?limit=${limit}`);
      set({ states: res.data.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch states",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchStatesByCountry: async (country: string) => {
    try {
      const res = await api.get(`/state/${country}`);
      set({ states: res.data });
    } catch (error) {
      console.log(error);
    }
  },

  addState: async (data: { name: string; country: string }) => {
    try {
      const res = await api.post<State>("/state", data);
      set((state) => ({ states: [...state.states, res.data] }));
    } catch (err) {
      console.error(err);
    }
  },

  updateState: async (id: string, data: { name: string; country: string }) => {
    try {
      const res = await api.put<State>(`/state/${id}`, data);
      set((state) => ({
        states: state.states.map((s) => (s._id === id ? res.data : s)),
      }));
    } catch (err) {
      console.error(err);
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
    }
  },
}));

export default useStateStore;
