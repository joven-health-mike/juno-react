/**
 * these methods don't return data, they set users in the Provider which posts results to listeners
 * from useContext!
 */

export type ContextData<T> = {
  data: T[];
  getAll: () => void;
  get: (id: string) => void;
  add: (data: T) => void;
  update: (data: T) => void;
  delete: (data: T) => void;
};
