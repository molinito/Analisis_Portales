"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // Importa cors
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3005;
// Habilita CORS para todas las rutas
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/api", routes_1.router);
app.get("/", (req, res) => {
    res.send("Server is running now");
});
app.post("/api/track", (req, res) => {
    console.log("Tracking event", req.body);
    res.status(200).send("Event tracked");
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
// ESTE COMPONENTE ES EL QUE SE ENCARGA DE INICIAR EL SERVIDOR DE EXPRESS
