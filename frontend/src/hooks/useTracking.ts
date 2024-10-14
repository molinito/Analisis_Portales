import { useEffect } from "react";
import axios from "axios";

const useTracking = (portal: string) => {
  useEffect(() => {
    const registerEvent = async (eventType: string) => {
      const timestamp = new Date().toISOString();
      await axios.post("http://localhost:3005/api/track", {
        portal,
        eventType,
        timestamp,
      });
    };
    registerEvent("page_view");

    return () => {
      registerEvent("page_exit");
    };
  }, [portal]);
};

export default useTracking;

// ESTE ARCHIVO SE ENCARGA DE HACER EL SEGUIMIENTO DE LAS VISITAS A LOS PORTALES
