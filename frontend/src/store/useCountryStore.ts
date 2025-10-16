import { create } from "zustand";
import { api } from "../lib/axios";
import type { AxiosError } from "axios";
import type { CountryState } from "../types/country";

const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  loading: false,
  error: null,

  fetchCountries: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/country");
      set({ countries: res.data.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  addCountry: async (data) => {
    try {
      const res = await api.post("/country", data);
      set((state) => ({ countries: [...state.countries, res.data.data] }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  updateCountry: async (id, data) => {
    try {
      const res = await api.put(`/country/${id}`, data);
      set((state) => ({
        countries: state.countries.map((c) =>
          c._id === id ? res.data.data : c
        ),
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteCountry: async (id) => {
    try {
      await api.delete(`/country/${id}`);
      set((state) => ({
        countries: state.countries.filter((c) => c._id !== id),
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}));

export default useCountryStore;
