import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import styles from "./style.module.css"
const data = [
  {
    name: "Пн",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Вт",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Ср",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Чт",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Пт",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Сб",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Вс",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function Charts() {
  return (
    <div className={styles.charts}>
    <LineChart width={400} height={260} data={data}>
      <CartesianGrid stroke="#CCCCCC" vertical={false} />
      <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 30, right: 30 }} />
      <YAxis axisLine={false} tickLine={false}  />
      <Tooltip  />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#5778EE"
        activeDot={{ r: 8 }}
      />
    </LineChart>
    </div>
  );
}
