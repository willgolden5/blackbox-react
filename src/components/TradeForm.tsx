import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type TradeFormData = {
  strategy: string;
  amount: number;
};

type Strategy = {
  name: string;
  cagr: number;
  beta: number;
  sharpe: number;
};

interface TradeFormProps {
  strategies: Strategy[];
  activeStrategy: Strategy;
}

const TradeForm: React.FC<TradeFormProps> = ({
  strategies,
  activeStrategy,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TradeFormData>();

  const onSubmit: SubmitHandler<TradeFormData> = (data) => {
    // Logic to handle trade submission
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col rounded-lg bg-gray-100 p-4"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl">Strategy Trader:</h2>
        <div className="mb-2 flex w-full items-center justify-center">
          <label htmlFor="strategy-picker" className="mr-2">
            Strategy:
          </label>
          <select
            id="strategy-picker"
            className="form-select w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("strategy")}
          >
            {strategies.map((strategy, index) => (
              <option key={index} value={strategy.name}>
                {strategy.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex w-full">
          <label htmlFor="amount" className="mb-2">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            className="mt-1 block h-8 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="1000"
            {...register("amount", { required: "Amount is required" })}
          />
          {errors.amount && (
            <p className="text-xs italic text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>
        {/* <div className="flex w-full gap-8 p-4">
          <p>CAGR: {activeStrategy.cagr}%</p>
          <p>Beta: {activeStrategy.beta}%</p>
          <p>Sharpe: {activeStrategy.sharpe}</p>
        </div> */}
      </div>
      <button
        type="submit"
        className="mt-4 w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Trade
      </button>
    </form>
  );
};

export default TradeForm;
