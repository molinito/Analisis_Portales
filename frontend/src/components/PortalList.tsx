import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Link,
} from "@mui/material";

// Definir la interfaz de los datos de los portales
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

const PortalList: React.FC = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Obtener la lista de portales del backend al montar el componente
  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/portals");
        setPortals(response.data);
        setLoading(false);
      } catch {
        setError("Error al obtener los portales");
        setLoading(false);
      }
    };

    fetchPortals();
  }, []);

  // Manejar la simulación de actualización de estadísticas en el backend
  const handleUpdateUsage = async (id: number) => {
    try {
      // Hacer una solicitud POST al backend para actualizar el uso del portal
      await axios.post(`http://localhost:3005/api/portals/${id}/update`);
      // Después de actualizar, volver a obtener la lista de portales para reflejar los cambios
      const response = await axios.get("http://localhost:3005/api/portals");
      setPortals(response.data);
    } catch (error) {
      console.error("Error updating portal usage", error);
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: 20 }}
        >
          Cargando portales...
        </Typography>
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" padding={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Portales Web
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {portals.map((portal) => (
          <Grid item xs={12} sm={6} md={4} key={portal.id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {portal.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  URL:{" "}
                  <Link
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {portal.url}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Visitas Totales: {portal.usage.totalVisits}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tiempo Total: {portal.usage.totalTimeSpent} minutos
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sección más visitada: {portal.usage.mostVisitedSection}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateUsage(portal.id)}
                  sx={{
                    marginTop: 2,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                  }}
                  fullWidth
                >
                  Simular Visita
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PortalList;






/*
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Link,
} from "@mui/material";

// Definir la interfaz de los datos de los portales
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

const PortalList: React.FC = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Obtener la lista de portales del backend al montar el componente
  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/portals");
        setPortals(response.data);
        setLoading(false);
      } catch {
        setError("Error al obtener los portales");
        setLoading(false);
      }
    };

    fetchPortals();
  }, []);

  // Manejar la simulación de actualización de estadísticas en el backend
  const handleUpdateUsage = async (id: number) => {
    try {
      // Hacer una solicitud POST al backend para actualizar el uso del portal
      await axios.post(`http://localhost:3005/api/portals/${id}/update`);
      // Después de actualizar, volver a obtener la lista de portales para reflejar los cambios
      const response = await axios.get("http://localhost:3005/api/portals");
      setPortals(response.data);
    } catch (error) {
      console.error("Error updating portal usage", error);
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: 20 }}
        >
          Cargando portales...
        </Typography>
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" padding={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Portales Web
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {portals.map((portal) => (
          <Grid item xs={12} sm={6} md={4} key={portal.id}>
            <Card elevation={3} style={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {portal.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  URL:{" "}
                  <Link
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {portal.url}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Visitas Totales: {portal.usage.totalVisits}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tiempo Total: {portal.usage.totalTimeSpent} minutos
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sección más visitada: {portal.usage.mostVisitedSection}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateUsage(portal.id)}
                  style={{ marginTop: 10 }}
                  fullWidth
                >
                  Simular Visita
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PortalList;*/
