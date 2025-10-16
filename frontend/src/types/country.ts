export interface Country {
  _id: string;
  name: string;
}

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  fetchCountries: () => Promise<void>;
  addCountry: (data: { name: string }) => Promise<void>;
  updateCountry: (id: string, data: { name: string }) => Promise<void>;
  deleteCountry: (id: string) => Promise<void>;
}
