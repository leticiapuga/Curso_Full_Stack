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


app.put("/usuario/:id", async (request, response) => {
    
    const { nome, email, data_nascimento } = request.body;
    
    const { id } = request.params;

    // EXECUTA UMA CONSULTA SQL PARA SELECIONAR UM PACIENTE PELO ID
    const pacientes = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);

    // SE O PACIENTE EXISTIR, EXECUTA UMA CONSULTA PARA ATUALIZAR SEUS DADOS
    if (pacientes) {
        const pacientes = await pool.query(
            'UPDATE pacientes SET nome = $1, email = $2, data_nascimento = $3 WHERE id = $4',
            [nome, email, data_nascimento, id]
        );
        // RETORNA UMA RESPOSTA VAZIA COM STATUS 200 (OK)
        response.status(200).json('');
    } else {
        // SE O PACIENTE NÃO FOR ENCONTRADO, RETORNA UM ERRO 404 (NOT FOUND)
        response.status(404).json("Usuário não encontrado");
    }
});

// DEFINE UMA ROTA (DELETAR) DELETE PARA O ENDPOINT '/usuario/:id'
app.delete("/usuario/:id", async (request, response) => {
    // PEGA O 'id' DOS PARÂMETROS DA ROTA
    const { id } = request.params;

    // EXECUTA UMA CONSULTA SQL PARA SELECIONAR UM PACIENTE PELO ID
    const pacientes = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);

    // SE O PACIENTE EXISTIR, EXECUTA UMA CONSULTA PARA DELETAR O REGISTRO
    if (pacientes.rows.length > 0) {
        await pool.query('DELETE FROM pacientes WHERE id = $1', [id]);
        // RETORNA UMA RESPOSTA VAZIA COM STATUS 200 (OK)
        response.status(200).json('');
    } else {
        // SE O PACIENTE NÃO FOR ENCONTRADO, RETORNA UM ERRO 404 (NOT FOUND)
        response.status(404).json("Usuário não encontrado");
    }
});

// INICIA O SERVIDOR NA PORTA 3000 E IMPRIME UMA MENSAGEM NO TERMINAL
app.listen(3000, () => {
    console.log("Running server");
});