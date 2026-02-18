import {prisma} from "../utils/prisma.js";

function findUsersByEmail(email){

    return prisma.user.findUnique({
        where: {email} //synthaxe js
    });
}

function createUser({userData}){
    return prisma.user.create({
        data: userData
    });
}