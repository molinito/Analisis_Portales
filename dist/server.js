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
const port = process.env.PORT || 3005; // Cambia esto
// Habilita CORS para todas las rutas
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Sirve los archivos estáticos del frontend compilado
//app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist")));
// API routes
app.use("/api", routes_1.router);
// Para cualquier ruta que no sea de API, servir el frontend
//app.get("*", (req, res) => {
    //res.sendFile(path_1.default.join(__dirname, "../frontend/dist", "index.html"));
//});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});