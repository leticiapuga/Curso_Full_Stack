// IMPORTA O MÓDULO 'express' QUE É UM FRAMEWORK PARA CONSTRUIR APLICATIVOS WEB EM NODE.JS
const express = require('express');

// CRIA UMA APLICAÇÃO EXPRESS
const app = express(); // A PARTIR DE AGORA SEMPRE QUE EU UTILIZAR O "app" ESTAREI UTILIZANDO O "express", POIS O APP É UM ATALHO

// CONFIGURA A APLICAÇÃO PARA PARSEAR DADOS JSON ENVIADOS NO BODY DAS REQUISIÇÕES
app.use(express.json());

// DESESTRUTURAÇÃO PARA PEGAR APENAS O OBJETO 'Pool' DO MÓDULO 'pg'
const { Pool } = pg;

// CRIA UMA INSTÂNCIA DE POOL PARA CONEXÃO COM O BANCO DE DADOS POSTGRESQL
const pool = new Pool({
    user: "postgres", // NOME DE USUÁRIO PARA O BANCO DE DADOS
    password: "mysecretpassword", // SENHA PARA O BANCO DE DADOS
    database: "bootcamp_01", // NOME DO BANCO DE DADOS
    port: 5432 // PORTA NA QUAL O BANCO DE DADOS ESTÁ RODANDO
});

// DEFINE UM ARRAY DE OBJETOS 'usuarios' PARA USO FUTURO, PROVAVELMENTE COMO DADOS DE EXEMPLO
const usuarios = [
    { id: 1, nome: "Letícia", email: "leticiademirandapuga@gmail.com" },
    { id: 2, nome: "Laura", email: "laurapuga@gmail.com" },
    { id: 3, nome: "Davi", email: "dmpms@gmail.com" }
];

// DEFINE UMA ROTA GET (BUSCAR) PARA O ENDPOINT '/pacientes'
app.get("/pacientes", async (request, response) => {
    // EXECUTA UMA CONSULTA SQL PARA SELECIONAR TODOS OS PACIENTES
    const pacientes = await pool.query('SELECT * FROM pacientes');
    // RETORNA O RESULTADO COMO JSON COM STATUS 200 (OK)
    response.status(200).json(pacientes.rows);
});

// DEFINE UMA ROTA POST (CRIAR) PARA O ENDPOINT '/usuarios'
app.post("/usuarios", async (request, response) => {
    // DESESTRUTURA OS CAMPOS 'nome', 'email' E 'data_nascimento' DO CORPO DA REQUISIÇÃO
    const { nome, email, data_nascimento } = request.body;
    // EXECUTA UMA CONSULTA SQL PARA INSERIR UM NOVO PACIENTE
    const pacientes = await pool.query(
        'INSERT INTO pacientes (nome, email, data_nascimento) VALUES ($1, $2, $3)',
        [nome, email, data_nascimento]
    );
    // RETORNA O OBJETO INSERIDO COMO JSON COM STATUS 201 (CREATED)
    response.status(201).json({ nome: nome, email: email, data_nascimento: data_nascimento });
});

// DEFINE UMA ROTA PUT (ATUALIZAR) PARA O ENDPOINT '/usuario/:id'
app.put("/usuario/:id", async (request, response) => {
    // DESESTRUTURA OS CAMPOS 'nome', 'email' E 'data_nascimento' DO CORPO DA REQUISIÇÃO
    const { nome, email, data_nascimento } = request.body;
    // PEGA O 'id' DOS PARÂMETROS DA ROTA
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