"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
exports.router = (0, express_1.Router)();
const dataPath = path_1.default.join(__dirname, "../backend/data.json");
exports.router.get("/portals", (req, res) => {
    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ message: "Error al leer el archivo" });
        }
        const portals = JSON.parse(data);
        res.json(portals);
    });
});
exports.router.get("/usage", (req, res) => {
    const data = fs.readFileSync("../backend/data.json", "utf-8");
    res.json(JSON.parse(data));
});
exports.router.post("/track", (req, res) => {
    const { portal, eventType, timestamp } = req.body;
    const data = JSON.parse(fs.readFileSync("../backend/data.json", "utf-8"));
    const newEvent = { portal, eventType, timestamp };
    data.events.push(newEvent);
    fs.writeFileSync("./backend/data.json", JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Event registrado" });
});
// Ruta para actualizar el uso de un portal
exports.router.post("/portals/:id/update", (req, res) => {
    const portalId = parseInt(req.params.id, 10);
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading data" });
        }
        const portals = JSON.parse(data);
        const portal = portals.find((p) => p.id === portalId);
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
        }
        else {
            res.status(404).json({ error: "Portal not found" });
        }
    });
});
// ESTE COMPONENTE ES EL QUE SE ENCARGA DE LOS EVENTOS DEL FRONTEND
