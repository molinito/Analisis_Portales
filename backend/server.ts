import express from "express";
import bodyparser from "body-parser";
import cors from "cors"; // Importa cors
import path from "path"; // Importa path para servir archivos estáticos
import { router } from "./routes";

const app = express();
const port = 3005;

// Habilita CORS para todas las rutas
app.use(cors());
app.use(bodyparser.json());

// Sirve los archivos estáticos del frontend compilado
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API routes
app.use("/api", router);

// Para cualquier ruta que no sea de API, servir el frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});



/*import express from "express";
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
*/

