// ToastContainer.tsx
import React from "react";
import { useToastStateContext } from "./ToastContext";
import Toast from "./Toast";

const ToastContainer: React.FC = () => {
  const toasts = useToastStateContext();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 m-8 flex flex-col items-center justify-center space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
