export interface Language {
  _id: string;
  name: string;
}

export interface LanguageStore {
  languages: Language[];
  loading: boolean;
  error: string | null;
  fetchLanguages: () => Promise<void>;
  addLanguage: (data: { name: string }) => Promise<void>;
  updateLanguage: (id: string, data: { name: string }) => Promise<void>;
  deleteLanguage: (id: string) => Promise<void>;
}
