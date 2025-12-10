export interface Customer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imagePath: string;
}

export interface CustomerStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;

  getCustomers: () => Promise<void>;

  createCustomer: (data: FormData) => Promise<void>;

  updateCustomer: (
    id: string,
    data: {
      name: string;
      email: string;
      phoneNumber: string;
      image: string;
    }
  ) => Promise<void>;

  deleteCustomer: (id: string) => Promise<void>;
}
