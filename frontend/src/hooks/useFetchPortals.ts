// useFetchPortals.ts
import { useEffect, useState } from "react";
import axios from "axios";

// Define el tipo Portal aquí
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

export const useFetchPortals = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { portals, loading, error };
};
