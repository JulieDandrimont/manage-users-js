import {createUser, findUserByEmail} from "./users.service.js";
import {validateUser} from "./users.validation.js";

export async function handleCreateUser(request, response) {             //cette fonction remplace la route post /users
    try {
        const result = validateUser(request.body);

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