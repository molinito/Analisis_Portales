import { Router } from "express";
import * as fs from "fs";
import path from "path";

export const router = Router();

const dataPath = path.join(__dirname, "data.json");

router.get("/portals", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error al leer el archivo" });
    }
    const portals = JSON.parse(data);
    res.json(portals);
  });
});

router.get("/usage", (req, res) => {
  const data = fs.readFileSync("./backend/data.json", "utf-8");
  res.json(JSON.parse(data));
});

router.post("/track", (req, res) => {
  const { portal, eventType, timestamp } = req.body;

  const data = JSON.parse(fs.readFileSync("./backend/data.json", "utf-8"));
  const newEvent = { portal, eventType, timestamp };

  data.events.push(newEvent);

  fs.writeFileSync("./backend/data.json", JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Event registrado" });
});

// Ruta para actualizar el uso de un portal
router.post("/portals/:id/update", (req, res) => {
  const portalId = parseInt(req.params.id, 10);

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading data" });
    }

    const portals = JSON.parse(data);
    const portal = portals.find((p: any) => p.id === portalId);

    if (portal) {
      // Simula una visita incrementando visitas y tiempo total
      portal.usage.totalVisits += 1;
      portal.usage.totalTimeSpent += Math.floor(Math.random() * 60); // Simular tiempo aleatorio en minutos
      portal.usage.mostVisitedSection = "Página Principal"; // Puedes cambiar esto por algo dinámico

      fs.writeFile(dataPath, JSON.stringify(portals, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Error updating data" });
        }
        res.json({ message: "Portal usage updated", portal });
      });
    } else {
      res.status(404).json({ error: "Portal not found" });
    }
  });
});
// ESTE COMPONENTE ES EL QUE SE ENCARGA DE LOS EVENTOS DEL FRONTEND
