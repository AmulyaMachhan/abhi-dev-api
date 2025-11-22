export interface District {
  _id: string;
  name: string;
  country: {
    _id: string;
    name: string;
  };
  state: {
    _id: string;
    name: string;
    country: {
      _id: string;
      name: string;
    };
  };
}

export interface DistrictStore {
  districts: District[];
  loading: boolean;
  error: string | null;
  fetchDistricts: () => Promise<void>;
  addDistrict: (data: {
    name: string;
    country: string;
    state: string;
  }) => Promise<void>;
  updateDistrict: (
    id: string,
    data: { name: string; country: string; state: string }
  ) => Promise<void>;
  deleteDistrict: (id: string) => Promise<void>;
}
