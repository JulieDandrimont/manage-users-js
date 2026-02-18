import { Router } from "express";
import { handleCreateUser } from "./users.controller.js";

const router = Router();

// Importer les fonctions de contrôle des utilisateurs
router.post('/', handleCreateUser);

export default router;