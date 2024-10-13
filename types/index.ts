export type Entry = {
  id: number;
  [key: string]: string | number;
};

export type EntryFormData = Omit<Entry, "id">;
