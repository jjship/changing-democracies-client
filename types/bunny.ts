export type BunnyMethodReturn<T> = {
  success: boolean;
  data: T[];
  error?: { message: string; status: number };
};
