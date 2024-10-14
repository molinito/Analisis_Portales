import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WebIcon from "@mui/icons-material/Web";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import axios from "axios";


interface Portal {
  id: number;
  name: string;
  url: string;
  usage: {
    totalVisits: number;
    totalTimeSpent: number;
    mostVisitedSection: string;
  };
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/portals`);
        setPortals(response.data);
        setLoading(false);
      } catch {
        setError("Error al obtener los portales");
        setLoading(false);
      }
    };

    fetchPortals();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f0f4f8",
        padding: 4,
        width: "100%", // Se ajusta al 100% en pantallas pequeñas
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Datos Portales en Gacitua
      </Typography>

      <Grid container spacing={3}>
        {/* Botón para Portales */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <WebIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h6" gutterBottom>
              Ver Portales
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/portals")}
            >
              Ir a Portales
            </Button>
          </Paper>
        </Grid>

        {/* Botón para Usage Chart */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <ShowChartIcon color="secondary" sx={{ fontSize: 60 }} />
            <Typography variant="h6" gutterBottom>
              Gráfico de Uso
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate("/usage-chart", { state: { portals } })}
            >
              Ver Gráfico
            </Button>
          </Paper>
        </Grid>

        {/* Botón para Bar Chart Visits */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <BarChartIcon sx={{ color: "#ff5722", fontSize: 60 }} />
            <Typography variant="h6" gutterBottom>
              Visitas por Portales
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff5722", color: "#fff" }}
              fullWidth
              onClick={() =>
                navigate("/bar-chart-visits", { state: { portals } })
              }
            >
              Ver Gráfico de Visitas
            </Button>
          </Paper>
        </Grid>

        {/* Botón para Portal Pie Chart */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <PieChartIcon sx={{ color: "#4caf50", fontSize: 60 }} />
            <Typography variant="h6" gutterBottom>
              Distribución de Visitas
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4caf50", color: "#fff" }}
              fullWidth
              onClick={() =>
                navigate("/portal-pie-chart", { state: { portals } })
              }
            >
              Ver Gráfico de Torta
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
