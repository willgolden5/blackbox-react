import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useController } from "react-hook-form";

type Props = {
  question: string;
  answer: React.ReactNode;
  name: string; // Name of the field in the form
  control: any; // Control object from React Hook Form
};

export default function Accordion({ question, answer, name, control }: Props) {
  const { field } = useController({ name, control });

  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [field.value]); // Depend on field value

  return (
    <div className="w-full rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <button
        role="button"
        aria-expanded={field.value}
        style={{ borderBottom: field.value ? "solid 2px" : "0px" }}
        className="flex w-full items-center justify-between rounded-[5px] border-black bg-[#bc95d4] p-5 font-bold"
        onClick={() => field.onChange(!field.value)} // Update form state on click
      >
        {question}
        <FiPlus
          style={{ transform: `rotate(${field.value ? "45deg" : "0"})` }}
          className="ml-4 min-h-[24px] min-w-[24px] transition-transform ease-in-out"
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: field.value ? `${contentHeight}` : "0" }}
        className="overflow-hidden rounded-[5px] bg-white font-bold transition-[height] ease-in-out"
      >
        <p className="p-5">{answer}</p>
      </div>
    </div>
  );
}
