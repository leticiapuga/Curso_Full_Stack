const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient();


const getAllUsers = async (request, response) => {
    const users = await prisma.user.findMany();
    response.status(200).json(users)
}

const creatUser = async (request, response) => {
    
    const { name, email } = request.body;
    
    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    })

    response.status(201).json(user); 
}

const updateUser = async (request, response) => {
    
    const { name, email } = request.body;
    
    const { id } = request.params;

 
    const user = await prisma.user.findFirst({
        where: { id }
    })

    
    if (user) {
        const user = await prisma.user.update({
            data:{ name, email },
            where: { id }
        })
       
        response.status(200).json(user);

    } else {
        response.status(404).json("User not found"); 
    }
}

const deleteUser = async (request, response) => {

    const { id } = request.params;
    
    const user = await prisma.user.findFirst({
        where: { id }
    })


    if (user) {
        await prisma.user.delete({
            where: { id }
        })
        
        response.status(204).send()
    } else {
       
        response.status(404).json("Usuário não encontrado"); 
    }
}

module.exports = {
    getAllUsers,
    creatUser,
    updateUser,
    deleteUser
}