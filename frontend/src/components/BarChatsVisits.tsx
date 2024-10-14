import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import _ from "lodash"; // Usamos lodash para ordenar los portales
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

// Definir la interfaz para los datos de los portales
interface BarChartVisitsProps {
  portals: {
    id: number;
    name: string;
    usage: {
      totalVisits: number;
    };
  }[];
}

const BarChartVisits: React.FC<BarChartVisitsProps> = ({ portals }) => {
  // Ordenar los portales de menor a mayor por totalVisits
  const sortedPortals = _.orderBy(portals, ["usage.totalVisits"], ["asc"]);
  const navigate = useNavigate();
  // Generar colores para las barras
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#413ea0",
    "#ffbb28",
    "#0088FE",
    "#00C49F",
    "#FF8042",
  ];

  // Preparar datos para el gráfico
  const chartData = sortedPortals.map((portal, index) => ({
    name: portal.name,
    visits: portal.usage.totalVisits,
    color: colors[index % colors.length], // Asignar color cíclicamente
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
      <h2>Portales Ordenados por Cantidad de Visitas</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* Aquí generamos un solo Bar para cada entrada de datos */}
          <Bar dataKey="visits" fill="#8884d8" barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="visits" position="insideTop" fill="#fff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartVisits;
