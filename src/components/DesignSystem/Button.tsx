import React from "react";

// Extending the native button props
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  primary?: number;
};

export default function Button({ children, primary = 1, ...rest }: Props) {
  return (
    <button
      {...rest} // Spread the rest of the props here
      aria-label={rest["aria-label"] || "Click to perform an action"}
      className={`flex cursor-pointer items-center justify-center rounded-md border-2 border-black ${
        primary === 1
          ? "bg-purple-500"
          : primary === 2
            ? "bg-yellow-500"
            : primary === 3
              ? "bg-green-500"
              : "bg-white"
      } px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none ${
        rest.className || ""
      }`}
    >
      {children}
    </button>
  );
}
