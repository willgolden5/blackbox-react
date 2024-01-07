// ToastContext.tsx
import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { Toast, ToastAction } from "./types";

const ToastStateContext = createContext<Toast[]>([]);
const ToastDispatchContext = createContext<Dispatch<ToastAction>>(() => {});

const toastReducer = (state: Toast[], action: ToastAction) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "DELETE_TOAST":
      return state.filter((toast) => toast.id !== action.id);
    default:
      throw new Error(`Unhandled action type`);
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toastReducer, []);

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
