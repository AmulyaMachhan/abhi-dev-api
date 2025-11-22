import { create } from "zustand";
import { api } from "../lib/axios";
import type { AxiosError } from "axios";

const useCustomerStore = create((set) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/userProfile");
      set({ customers: res.data });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  createCustomer: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/userProfile", data);
    } catch (error) {}
  },
}));

export default useCustomerStore;
