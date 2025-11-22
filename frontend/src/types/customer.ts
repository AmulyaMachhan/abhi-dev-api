export interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
  image: string;
}

export interface CustomerStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;

  getCustomers: () => Promise<void>;

  createCustomer: (data: {
    name: string;
    phoneNumber: string;
    image: string;
  }) => Promise<void>;

  updateCustomer: (
    id: string,
    data: {
      name: string;
      phoneNumber: string;
      image: string;
    }
  ) => Promise<void>;

  deleteCustomer: (id: string) => Promise<void>;
}
