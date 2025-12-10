import { create } from "zustand";
import { api } from "../lib/axios";
import type { AxiosError } from "axios";
import type { CustomerStore } from "../types/customer";

const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  loading: false,
  error: null,

  getCustomers: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/userProfile");
      set({ customers: res.data.profiles });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  createCustomer: async (data: FormData) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/userProfile", data);
      set((state) => ({ customers: [...state.customers, res.data] }));
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "Failed to fetch countries",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateCustomer: async (
    id: string,
    data: {
      name: string;
      phoneNumber: string;
      image: string;
      email: string;
    }
  ) => {
    try {
      set({ loading: true, error: null });
      const res = await api.put(`/userProfile/${id}`, data);
      set((state) => ({
        customers: state.customers.map((c) => (c._id === id ? res.data : 1)),
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

  deleteCustomer: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await api.put(`/userProfile/${id}`);
      set((state) => ({
        customers: state.customers.filter((c) => c._id !== id),
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

export default useCustomerStore;
