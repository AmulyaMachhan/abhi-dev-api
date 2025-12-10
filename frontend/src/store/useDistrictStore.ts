import { create } from "zustand";
import type { DistrictStore } from "../types/district";
import { api } from "../lib/axios";
import type { AxiosError } from "axios";

const useDistrictStore = create<DistrictStore>((set) => ({
  districts: [],
  loading: false,
  error: null,

  fetchDistricts: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/district");
      set({ districts: res.data.districts });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchDistrictsByState: async (state) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/district/${state}`);
      set({ districts: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  addDistrict: async (data: {
    name: string;
    country: string;
    state: string;
  }) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/district", data);
      set((state) => ({ districts: [...state.districts, res.data] }));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateDistrict: async (
    id: string,
    data: { name: string; country: string; state: string }
  ) => {
    try {
      set({ loading: true, error: null });
      const res = await api.put(`/district/${id}`, data);
      console.log(res);
      set((state) => ({
        districts: state.districts.map((d) => (d._id === id ? res.data : 1)),
      }));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteDistrict: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/district/${id}`);
      set((state) => ({
        districts: state.districts.filter((d) => d._id !== id),
      }));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDistrictStore;
