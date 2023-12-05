type Props = {
  heading: string;
  body: React.JSX.Element;
};

export default function Card({ heading, body }: Props) {
  return (
    <div className="w-full rounded-md border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="border-b-2 border-black bg-[#bc95d4] p-4 ">
        <h2 className="text-xl">{heading}</h2>
      </div>
      <div className="p-4">{body}</div>
    </div>
  );
}
