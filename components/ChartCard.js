"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useTheme } from "next-themes";

export default function ChartCard({
  title,
  data,
  dataKey,
  stroke = "#10B981",
  xKey = "key",
  xTicks
}) {
  const hasData = Array.isArray(data) && data.length > 0;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const labelMap = new Map(data?.map((entry) => [entry.key, entry.label]));

  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-foreground shadow-soft">
      <h3 className="text-sm font-semibold">{title}</h3>
      {hasData ? (
        <div className="mt-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id={`chart-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey={xKey}
                ticks={xTicks}
                tickFormatter={(value) => labelMap.get(value) || value}
                stroke={isDark ? "#94A3B8" : "#64748b"}
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={isDark ? "#94A3B8" : "#64748b"}
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: isDark ? "#0F172A" : "#ffffff",
                  border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  borderRadius: "12px",
                  boxShadow: isDark
                    ? "0 10px 20px rgba(0,0,0,0.35)"
                    : "0 10px 20px rgba(15,23,42,0.08)"
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, stroke: stroke, strokeWidth: 2, fill: isDark ? "#0B1220" : "#ffffff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="mt-6 flex h-48 items-center justify-center text-sm text-muted">
          No data yet
        </div>
      )}
    </div>
  );
}
