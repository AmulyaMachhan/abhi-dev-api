export interface State {
  _id: string;
  country: {
    _id: string;
    name: string;
  };
  name: string;
}

export interface StateStore {
  states: State[];
  loading: boolean;
  error: string | null;
  fetchStates: (limit?: number) => Promise<void>;
  fetchStatesByCountry: (country: string) => Promise<void>;
  addState: (data: { name: string; country: string }) => Promise<void>;
  updateState: (
    id: string,
    data: { name: string; country: string }
  ) => Promise<void>;
  deleteState: (id: string) => Promise<void>;
}
