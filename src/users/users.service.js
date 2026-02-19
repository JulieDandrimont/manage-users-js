import { prisma } from '../utils/prisma.js';

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser( userData) {
  return prisma.user.create({
    data: userData,
  });
}// comme des requêtes sql

// get all the record
export async function listUsers(){
  return prisma.user.findMany();
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where : { id }
  });
}

export async function deleteUserId(id){
  return prisma.user.delete({
    where : { id }
  });
}


export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data
  });
}