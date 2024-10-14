import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

interface PortalUsage {
  id: number;
  name: string;
  usage: {
    totalVisits: number;
    totalTimeSpent: number; // Tiempo en minutos
    mostVisitedSection: string;
  };
}

interface UsageChartProps {
  portals: PortalUsage[];
}
const UsageChart: React.FC<UsageChartProps> = ({ portals }) => {
  // Transformar los datos para que funcionen con Recharts
  const data = portals.map((portal) => ({
    name: portal.name,
    totalVisits: portal.usage.totalVisits,
    totalTimeSpent: portal.usage.totalTimeSpent,
  }));

  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: 400 }}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
      <h2>Totales visitas por portales y tiempo</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalVisits"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="totalTimeSpent" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
