import { LineChart, Line, ResponsiveContainer } from "recharts";

function StockSparkline({ data, isPositive }) {
  const formatted = data.map((value, index) => ({
    index,
    value,
  }));

  return (
    <div className="w-24 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#22d3ee" : "#ec4899"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockSparkline;