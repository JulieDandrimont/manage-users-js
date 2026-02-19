import { Router } from "express";
import { handleCreateUser, handleListUsers, handleGetUserById, handleDeleteUserId, handleUpdateUser,handleGetUserByEmail} from "./users.controller.js";

const router = Router();

// Importer les fonctions de contrôle des utilisateurs
router.post('/', handleCreateUser);

router.get('/', handleListUsers);

router.get('/search',handleGetUserByEmail) // pas fini

router.get('/:id', handleGetUserById)

router.delete('/:id', handleDeleteUserId)

router.patch('/:id', handleUpdateUser)


export default router;

