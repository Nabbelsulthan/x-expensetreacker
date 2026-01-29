import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = {
  Food: "#8E24AA",
  Entertainment: "#FF9800",
  Travel: "#FFEB3B",
};

const renderLabelInside = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={700}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

export default function ExpenseChart({ expenses }) {
  const categories = ["Food", "Entertainment", "Travel"];

  const data = categories.map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width={260} height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            labelLine={false}
            label={renderLabelInside}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
