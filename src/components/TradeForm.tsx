import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./DesignSystem/Input";
import Select from "./DesignSystem/Select";
import Button from "./DesignSystem/Button";
import Card from "./DesignSystem/Card";
import { api } from "~/utils/api";

type TradeFormData = {
  strategy: string;
  amount: number;
};

type Strategy = {
  name: string;
  id: string;
};

interface TradeFormProps {
  activeStrategy: Strategy;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TradeFormData>();
  const { data: strategyData } = api.strategy.getAll.useQuery();
  const strategies = useMemo(
    () =>
      strategyData &&
      strategyData.map((strat) => ({ name: strat.name, id: strat.id })),
    [strategyData],
  );
  const onSubmit: SubmitHandler<TradeFormData> = (data) => {
    // Logic to handle trade submission
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col rounded-lg p-4"
    >
      <div className="flex flex-col items-center space-y-5">
        <div className="items-left flex w-full flex-col  ">
          <label htmlFor="strategy-picker" className="">
            Strategy:
          </label>
          {strategies && (
            <Select
              id="strategy-picker"
              {...register("strategy", { required: "Strategy is required" })}
              items={strategies.map((strategy) => ({
                name: strategy.name,
                value: strategy.name,
              }))}
              className="w-full"
            />
          )}
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
            <p className="mt-2 px-2 text-xs italic text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="mt-2 w-full rounded bg-green px-4 py-2"
        >
          TRADE
        </Button>
      </div>
    </form>
  );
};

const TradeForm: React.FC<TradeFormProps> = () => {
  return <Card heading="Strategy Trader:" body={<Form />} />;
};

export default TradeForm;
