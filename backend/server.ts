import express from "express";
import bodyparser from "body-parser";
import cors from "cors"; // Importa cors
import { router } from "./routes";

const app = express();
const port = 3005;

// Habilita CORS para todas las rutas
app.use(cors());
app.use(bodyparser.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/track", (req, res) => {
  console.log("Tracking event", req.body);
  res.status(200).send("Event tracked");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// ESTE COMPONENTE ES EL QUE SE ENCARGA DE INICIAR EL SERVIDOR DE EXPRESS
