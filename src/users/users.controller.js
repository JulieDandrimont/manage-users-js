import {createUser, findUserByEmail, listUsers, getUserById,deleteUserId,updateUser} from "./users.service.js";
import {validateUser, validateUpdateUser} from "./users.validation.js";

export async function handleCreateUser(req, response) {             //cette fonction remplace la route post /users
    try {
        req.body.email = req.body.email.toLowerCase().trim()//normalized email 
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
        return response.status(500).json({error : error.message});
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

 

export async function handleUpdateUser(req,res){
    try{
        //check if user already exists
        const {id} = req.params;
        
        if (!id){
            return res.status(400).json({message:'Missing user ID'});
        }
        // verify if user exists
        const user = await getUserById(id);
        if (!user){
            return res.status(404).json({message:'User not found'});
        }
        // Vérifier que l'email n'existe pas déjà
        if (req.body.email){
            const existingEmail = await findUserByEmail(req.body.email);
            if (existingEmail && req.body.email!= user.email) {
            return res.status(409).json({message:'Email already in use'});
        }
        }
        if(Object.keys(req.body).length === 0 ){
            return res.status(400).json({
                error: 'Validation error',
                fields: {body: 'Provide at least one field to update',},
            });
        }

        // validate user data
        const results = validateUpdateUser(req.body);
        if (!results.ok){
        return res.status(400).json({
            message:'validation failed',
            errors :results.errors
        });

    }
    if (Object.keys(req.body).includes("email")){
        results.data.email = results.data.email.toLowerCase().trim()
    }
    const updatedUser = await updateUser(id,results.data);
    return res.status(200).json(updatedUser);
    } catch (error){
            return res.status(500).json({ error : error.message})
        }
   

}

export async function handleGetUserByEmail(req,res) { // à modifiiiier 
    try {
        // on aurait pu faire une vérification regex d'un email ici
        const {email} = req.query;
        if (!email){
            return res.status(400).json({message:'Missing email'});
        }
        const user = await findUserByEmail(email);
        if (!user){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:'bug server'});
    }
}
