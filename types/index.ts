export type Entry = {
  id: string;
  [key: string]: string | number;
};

export type EntryFormData = Omit<Entry, "id">;
