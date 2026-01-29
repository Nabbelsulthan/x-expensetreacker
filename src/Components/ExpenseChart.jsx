import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  Entertainment: "#ff9800",
  Food: "#8a2be2",
  Travel: "#ffe600",
};

export default function ExpenseChart({ expenses }) {
  const data = ["Entertainment", "Food", "Travel"].map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
  }));

  return (
    <ResponsiveContainer width={300} height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label={({ percent }) =>
            percent > 0 ? `${Math.round(percent * 100)}%` : ""
          }
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}
