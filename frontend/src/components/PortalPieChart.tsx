import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Definimos los colores para cada porción del gráfico
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AB47BC",
  "#FF7043",
  "#66BB6A",
  "#42A5F5",
  "#D32F2F",
];

// Definir la interfaz para los datos de los portales
interface Portal {
  id: number;
  name: string;
  usage: {
    totalVisits: number;
  };
}

interface PortalPieChartProps {
  portals: Portal[];
}

const PortalPieChart: React.FC<PortalPieChartProps> = ({ portals }) => {
  const navigate = useNavigate();

  // Preparamos los datos para el gráfico de torta
  const pieData = portals.map((portal) => ({
    name: portal.name,
    value: portal.usage.totalVisits,
  }));

  return (
    <Card elevation={3} style={{ margin: "20px", padding: "20px" }}>
      <Box display="flex" justifyContent="flex-end" padding={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Distribución de Visitas por Portal
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PortalPieChart;
