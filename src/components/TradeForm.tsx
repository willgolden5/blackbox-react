import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./DesignSystem/Input";
import Select from "./DesignSystem/Select";
import Button from "./DesignSystem/Button";
import Card from "./DesignSystem/Card";

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
    <Card
      heading="Strategy Trader:"
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col rounded-lg p-4"
        >
          <div className="flex flex-col items-center space-y-5">
            <div className="items-left flex w-full flex-col  ">
              <label htmlFor="strategy-picker" className="">
                Strategy:
              </label>
              <Select
                id="strategy-picker"
                {...register("strategy", { required: "Strategy is required" })}
                items={strategies.map((strategy) => ({
                  name: strategy.name,
                  value: strategy.name,
                }))}
                className="w-full"
              />
            </div>
            <div className="flex flex w-full flex-col">
              <label htmlFor="amount" className="">
                Amount:
              </label>
              <Input
                id="amount"
                type="float"
                placeholder="1200.00"
                {...register("amount", { required: "Amount is required" })}
              />
              {errors.amount && (
                <p className="px-2 pt-2 text-xs italic text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="bg-green mt-2 w-full rounded px-4 py-2"
          >
            TRADE
          </Button>
        </form>
      }
    />
  );
};

export default TradeForm;
