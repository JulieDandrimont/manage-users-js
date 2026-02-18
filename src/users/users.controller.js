import {createUser, findUserByEmail, listUsers, getUserById,deleteUserId} from "./users.service.js";
import {validateUser} from "./users.validation.js";

export async function handleCreateUser(req, response) {             //cette fonction remplace la route post /users
    try {
        const result = validateUser(req.body);

        if (!result.ok) {                                           // Si la validation échoue, on retourne une réponse d'erreur 
            return response.status(400).json({                      // avec les détails des erreurs
                message: 'Validation failed',
                errors: result.errors
            });
        }

        // Vérifier que l'utilisateur n'existe pas déjà
        const existingUser = await findUserByEmail(req.body.email);
        if (existingUser) {
            return response.status(409).json({message:'User already exists'});
        }

        // Créer l'utilisateur
        const user = await createUser(req.body);
        return response.status(201).json(user);

        } catch (error) {
        return response.status(400).json({error : error.message});
        }
}

export async function handleListUsers(req, res){
    try {
        const users = await listUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

}

export async function handleGetUserById(req,res){
    try {
        const {id} = req.params;
        if (!id){
            return res.status(400).json({message:'Missing user ID'});
        }
        const user = await getUserById(id);
        if (!user){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

export async function handleDeleteUserId(req, res){
    try {
        const {id} = req.params;
        if (!id){
            return res.status(400).json({message:'Missing user ID'});
        }
        const user = await getUserById(id);
        if (!user){
            return res.status(404).json({message:'User not found'});
        }

        await deleteUserId(id);

        return res.status(200).json({
            message : 'user deleted successfully'
        });
    } catch(error){
        return res.status(500).json({error:error.message});
    }
}