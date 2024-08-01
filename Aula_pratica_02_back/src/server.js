const express = require('express');

const { PrismaClient } = require('@prisma/client') 

const app = express(); 

app.use(express.json());

const prisma = new PrismaClient();

app.get(("/users"), async (request, response) => {
    const users = await prisma.user.findMany();
    response.status(200).json(users);    
});


app.post("/users", async (request, response) => {
    
    const { name, email } = request.body;
    
    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    })

    response.status(201).json(user); 
});


app.put(("/users/:id"), async (request, response) => {
    
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
})


app.delete("/users/:id", async (request, response) => {

    const { id } = request.params;
    
    const user = await prisma.user.findFirst({
        where: { id }
    })


    if (user) {
        await prisma.user.delete
        
        response.status(200).json('');
    } else {
       
        response.status(404).json("Usuário não encontrado");
    }
});


app.listen(3000, () => {
    console.log("Running server");
});