import { prisma } from '../utils/prisma.js';

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select : {id: true, email :true, name: true, phone: true,createdAt: true,
      updatedAt: true
    }
  });
}

export async function createUser( userData) {
  return prisma.user.create({
    data: userData,
    select : {id: true, email :true, name: true, phone: true,createdAt: true,
      updatedAt: true
    }
  });
}// comme des requêtes sql

// get all the record
export async function listUsers(){
  return prisma.user.findMany(
    {select : {id: true, email :true, name: true, phone: true,createdAt: true,
      updatedAt: true
    }}
  );
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where : { id },
    select : {
      id: true, 
      email :true, name: true, phone: true,createdAt: true,
      updatedAt: true
    }
  });
}

export async function deleteUserId(id){
  return prisma.user.delete({
    where : { id },
    select : {
      id: true, 
      email :true, name: true, phone: true,createdAt: true,
      updatedAt: true
    }
  });
}

export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select : {
      id: true, 
      email :true, name: true, phone: true,createdAt: true,
      updatedAt: true
    },
    
  });
}
