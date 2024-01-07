// types.ts
export type ToastType = "success" | "info" | "error";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  title: string;
}

export type ToastAction =
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "DELETE_TOAST"; id: number };
