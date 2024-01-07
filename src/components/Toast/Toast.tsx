// Toast.tsx
import React, { useEffect, useState } from "react";
import { useToastDispatchContext } from "./ToastContext";
import { Toast as ToastType } from "./types";

const Toast: React.FC<ToastType> = ({ id, type, message, title }) => {
  const dispatch = useToastDispatchContext();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true); // Start exit animation
      setTimeout(() => dispatch({ type: "DELETE_TOAST", id }), 500); // Remove toast after animation
    }, 5000); // Adjust display duration as needed

    return () => clearTimeout(timer);
  }, [id, dispatch]);

  const bgColor = {
    success: "bg-green",
    error: "bg-orange",
    info: "bg-purple",
  }[type];

  return (
    <div
      className={`rounded-md p-4 ${bgColor}  ${
        isExiting ? "animate-slide-out-bottom" : "animate-slide-in-bottom"
      } relative rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none`}
      style={{ animationDuration: "500ms" }}
    >
      <div className="flex flex-col space-y-0">
        <p className="font-md font-bold">{title}</p>
        <p className="font-sm py-1 font-light">{message}</p>
      </div>
      <button
        onClick={() => setIsExiting(true)}
        className="absolute right-1 top-1 p-1 text-xs font-extralight"
      >
        X
      </button>
    </div>
  );
};

export default Toast;
