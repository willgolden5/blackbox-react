import React, { useRef, useEffect } from "react";
import { createChart, IChartApi, ColorType } from "lightweight-charts";

interface ChartProps {
  data: { time: string; value: number }[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

const ChartComponent: React.FC<ChartProps> = ({
  data,
  colors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  },
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: { type: ColorType.Solid, color: colors.backgroundColor },
          textColor: colors.textColor,
        },
      });

      const series = chart.addAreaSeries({
        topColor: colors.areaTopColor,
        bottomColor: colors.areaBottomColor,
        lineColor: colors.lineColor,
      });
      series.setData(data);

      // Define handleResize inside useEffect before its usage
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      window.addEventListener("resize", handleResize);

      // Ensure the chart fits its content
      chart.timeScale().fitContent();

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [
    data,
    colors.backgroundColor,
    colors.lineColor,
    colors.textColor,
    colors.areaTopColor,
    colors.areaBottomColor,
  ]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", height: "300px" }}
    />
  );
};

export default ChartComponent;
