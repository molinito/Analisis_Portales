import { useState, useEffect} from 'react';
import { Drawer, IconButton, List,ListItem, ListItemIcon,ListItemText, Divider, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import WebIcon from '@mui/icons-material/Web';

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

//const SideBarMenu = () => {
export const SideBarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);  // Estado para controlar el menú
  const isSmallScreen = useMediaQuery('(max-width:768px)'); // Detecta pantallas pequeñas


  const toggleDrawer = () => {
    setIsOpen(!isOpen);  // Alterna el menú al hacer clic
  };

// CAMBIO PRUEBA
  const navigate = useNavigate();
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);




  useEffect(() => {
    const fetchPortals = async () => {
      try {
        //const response = await axios.get("http://localhost:3005/api/portals");
        const response = await axios.get("https://analisis-portales-back.onrender.com/");  // Cambio para obtener los portales

        //const response = await axios.get(`http://localhost:3005/api/portals`);
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
    return;
  }

  if (error) {
    return <p>{error}</p>;
  }
  // FIN CAMBIO PRUEBA

  return (
    <>
      {isSmallScreen && (
        <IconButton 
          onClick={toggleDrawer} 
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}  // Botón hamburguesa
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'} // Oculto en pantallas pequeñas
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        {/* Opción para acceder a datos globales */}
        <Button component="a" onClick={() => navigate("/portals", { state: { portals } })}>
          <ListItemIcon>
            <WebIcon />
          </ListItemIcon>
          <ListItemText primary="Datos Portales" />
        </Button>
        {/* Opción para acceder al gráfico de torta */}
        <Button component="a" onClick={() => navigate("/portal-pie-chart", { state: { portals } })}>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Torta Visitas" />
        </Button>
        {/* Opción para acceder al gráfico de barras */}
        <Button component="a" onClick={() => navigate("/bar-chart-visits", { state: { portals } })}>
          <ListItemIcon>
          <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Visitas por Portales" />
        </Button>
        {/* Opción para acceder al gráfico de líneas */}
        <Button component="a" onClick={() => navigate("/usage-chart", { state: { portals } })}>
          <ListItemIcon>
          <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="Gráfico de Uso" />

        </Button>
      </List>
        {/* Contenido del menú */}
      </Drawer>
    </>
  );
};

export default SideBarMenu;

