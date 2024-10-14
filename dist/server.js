"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // Importa cors
const path_1 = __importDefault(require("path")); // Importa path para servir archivos estáticos
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3005;
// Habilita CORS para todas las rutas
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Sirve los archivos estáticos del frontend compilado
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/build")));
// API routes
app.use("/api", routes_1.router);
// Para cualquier ruta que no sea de API, servir el frontend
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/build", "index.html"));
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
