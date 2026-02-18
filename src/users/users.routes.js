import { Router } from "express";
import { handleCreateUser, handleListUsers, handleGetUserById, handleDeleteUserId} from "./users.controller.js";

const router = Router();

// Importer les fonctions de contrôle des utilisateurs
router.post('/', handleCreateUser);

router.get('/', handleListUsers);

router.get('/:id', handleGetUserById)

router.delete('/:id', handleDeleteUserId)
export default router;

