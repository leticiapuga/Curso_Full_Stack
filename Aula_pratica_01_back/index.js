// HTTP:

// // IMPORTA O MÓDULO HTTP, QUE É UMA BIBLIOTECA PADRÃO DO NODE.JS USADA PARA CRIAR SERVIDORES WEB
// const http = require('http')

// // CRIA UM SERVIDOR HTTP
// const server = http.createServer((request, response) => {  //AQUI É CRIADO O SERVIÇO "http"

//     // ENVIA A STRING "Hellow, World!" COMO RESPOSTA PARA A SOLICITAÇÃO
//     response.end("Hellow, World!")

// })

// // INICIA O SERVIDOR E O FAZ ESCUTAR POR CONEXÕES NA PORTA 3000
// server.listen(3000, () => {
//     // EXIBE A MENSAGEM "Runing server" NO TERMINAL, INDICANDO QUE O SERVIDOR ESTÁ FUNCIONANDO
//     console.log("Runing server")
// })



// ------------------------------------------------------------------------------------------------------------------------



// EXPRESS:

// // IMPORTA O MÓDULO EXPRESS, QUE É UM FRAMEWORK PARA NODE.JS QUE FACILITA A CRIAÇÃO DE SERVIDORES WEB
// const express = require('express')

// // CRIA UMA INSTÂNCIA DO EXPRESS. VAMOS USAR `app` PARA CONFIGURAR ROTAS E MIDDLEWARES (É UMA FUNÇÃO QUE RODA ENTRE O PEDIDO DO CLIENTE E A RESPOSTA DO SERVIDOR)
// const app = express(); //A PARTIR DE AGORA SEMPRE QUE EU UTILIZAR O "app" ESTAREI UTILIZANDO O "express", POIS O APP É UM ATALHO

// // CONFIGURA O MIDDLEWARE PARA ANALISAR O CORPO DAS REQUISIÇÕES COMO JSON (É UM FORMATO DE TEXTO PARA ARMAZENAR E TROCAR DADOS.)
// app.use(express.json());

// // CRIA UMA LISTA DE OBJETOS REPRESENTANDO USUÁRIOS, CADA UM COM UM `id`, `nome`, E `email`
// const usuarios = [
//     {id: 1, nome: "Letícia", email: "leticiademirandapuga@gmail.com"},
//     {id: 2, nome: "Laura", email: "laurapuga@gmail.com"},
//     {id: 3, nome: "Davi", email: "dmpms@gmail.com"}
// ]

// // DEFINE UMA ROTA GET PARA O CAMINHO "/usuarios"
// app.get(("/usuarios"), (request, response) => {
//     // ENVIA UM STATUS 200 (OK) E A LISTA DE USUÁRIOS EM FORMATO JSON
//     response.status(200).json(usuarios);
// })

// // DEFINE UMA ROTA POST PARA O CAMINHO "/usuario"
// app.post(("/usuario"), (request, response) => {
//     // `request.body`: CONTÉM OS DADOS ENVIADOS NO CORPO DA REQUISIÇÃO
//     const{ nome, email } = request.body; 
//     // ADICIONA UM NOVO USUÁRIO À LISTA
//     usuarios.push({nome: nome, email: email});
//     // ENVIA UM STATUS 201 (Created) E O NOVO USUÁRIO COMO JSON
//     response.status(201).json({nome: nome, email: email}) //O CÓDIGO 201 SIGNIFICA "create" 
// })

// // DEFINE UMA ROTA PUT PARA O CAMINHO "/usuario/:id", ONDE `:id` É UM PARÂMETRO DINÂMICO
// app.put(("/usuario/:id"), (request, response) => {
//     const{ nome, email } = request.body; 
//     const { id } = request.params;

//     // PROCURA UM USUÁRIO NA LISTA COM O `id` CORRESPONDENTE
//     const usuario = usuarios.find(u=>u.id == id)

//     // SE O USUÁRIO FOR ENCONTRADO, ELE É ATUALIZADO; CASO CONTRÁRIO, UMA MENSAGEM DE ERRO 404 É ENVIADA
//     if(usuario){
//         usuario.nome = nome;
//         usuario.email = email;
//         response.status(200).json(usuario)
//     } else {
//         response.status(404).json("Usuário não encontrado")
//     }
// })

// // DEFINE UMA ROTA DELETE PARA O CAMINHO "/usuario/:id"
// app.delete(("/usuario/:id"), (request, response) => {
//     const{ id } = request.params; 
//     // ENCONTRA O ÍNDICE DO USUÁRIO COM O `id` CORRESPONDENTE
//     const index = usuarios.findIndex(u => u.id = id)

//     // SE O USUÁRIO FOR ENCONTRADO, ELE É REMOVIDO DA LISTA; CASO CONTRÁRIO, UMA MENSAGEM DE ERRO 404 É ENVIADA
//     if (index != 1) {
//         usuarios.splice(index, 1)
//         response.status(204).send()
//     } else{
//         response.status(404).json("Usuário não encontrado")
//     }

// })

// // INICIA O SERVIDOR E O FAZ ESCUTAR POR CONEXÕES NA PORTA 3000
// app.listen(3000, () => {
//     // EXIBE A MENSAGEM "Running server" NO CONSOLE, INDICANDO QUE O SERVIDOR ESTÁ FUNCIONANDO
//     console.log("Running server")
// })



// ------------------------------------------------------------------------------------------------------------------------



// IMPORTA O MÓDULO 'express' QUE É UM FRAMEWORK PARA CONSTRUIR APLICATIVOS WEB EM NODE.JS
const express = require('express');

// IMPORTA O MÓDULO 'pg' QUE É UTILIZADO PARA INTERAGIR COM UM BANCO DE DADOS POSTGRESQL
const pg = require('pg');

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
