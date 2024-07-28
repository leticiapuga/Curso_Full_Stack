// HTTP:

// const http = require('http')

// const server = http.createServer((request, response) => {  //AQUI É CRIADO O SERVIÇO "http"

//     response.end("Hellow, World!")

// })

// server.listen(3000, () => {

//     console.log("Runing server")
        
// })


// EXPRESS:

// const express = require('express')

// const app = express(); //A PARTIR DE AGORA SEMPRE QUE EU UTILIZAR O "app" ESTAREI UTILIZANDO O "express", POIS O APP É UM ATALHO

// app.use(express.json());

// const usuarios = [
//     {id: 1, nome: "Letícia", email: "leticiademirandapuga@gmail.com"},
//     {id: 2, nome: "Laura", email: "laurapuga@gmail.com"},
//     {id: 3, nome: "Davi", email: "dmpms@gmail.com"}
// ]

// app.get(("/usuarios"), (request, response) => {
//     response.status(200).json(usuarios);
// })

// app.post(("/usuario"), (request, response) => {
//     const{ nome, email } = request.body; 
//     usuarios.push({nome: nome, email: email});
//     response.status(201).json({nome: nome, email: email}) //O CÓDIGO 201 SIGNIFICA "create" 
// })

// app.put(("/usuario/:id"), (request, response) => {
//     const{ nome, email } = request.body; 
//     const { id } = request.params;

//     const usuario = usuarios.find(u=>u.id == id)

//     if(usuario){
//         usuario.nome = nome;
//         usuario.email = email;
//         response.status(200).json(usuario)
//     } else {
//         response.status(404).json("Usuário não encontrado")
//     }
// })

// app.delete(("/usuario/:id"), (request, response) => {
//     const{ id } = request.params; 
//     const index = usuarios.findIndex(u => u.id = id)

//     if (index != 1) {
//         usuario.slice(index, 1)
//         response.status(204).send()
//     } else{
//         response.status(404).json("Usuário não encontrado")
//     }

// })

// app.listen(3000, () => {
//     console.log("Running server")
// })



const express = require('express')

const pg = require('pg')

const app = express(); //A PARTIR DE AGORA SEMPRE QUE EU UTILIZAR O "app" ESTAREI UTILIZANDO O "express", POIS O APP É UM ATALHO

app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "mysecretpassword",
    database: "bootcamp_01",
    port: 5432
})

const usuarios = [
    {id: 1, nome: "Letícia", email: "leticiademirandapuga@gmail.com"},
    {id: 2, nome: "Laura", email: "laurapuga@gmail.com"},
    {id: 3, nome: "Davi", email: "dmpms@gmail.com"}
]

app.get(("/pacientes"), async (request, response) => {
    const pacientes = await pool.query('SELECT * FROM pacientes')
    response.status(200).json(pacientes.rows)
})

app.post(("/usuarios"), async(request, response) => {
    const{ nome, email, data_nascimento } = request.body; 
    const pacientes = await pool.query('INSERT INTO pacientes (nome, email, data_nascimento) VALUES ($1, $2, $3)',[nome, email, data_nascimento]); 
    response.status(201).json({nome: nome, email: email, data_nascimento: data_nascimento}) //O CÓDIGO 201 SIGNIFICA "create" 
})

app.put(("/usuario/:id"), async (request, response) => {
    const{ nome, email, data_nascimento } = request.body; 
    const { id } = request.params;

    const pacientes = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id])

    if(pacientes){
        const pacientes = await pool.query('UPDATE pacientes SET nome = $1, email = $2, data_nascimento = $3 WHERE id = $4',[nome, email, data_nascimento, id])
        response.status(200).json('')
    } else {
        response.status(404).json("Usuário não encontrado")
    }
})

app.delete(("/usuario/:id"), (request, response) => {
    const{ id } = request.params; 

    const index = usuarios.findIndex(u => u.id = id)

    if (index != 1) {
       
        response.status(204).send()
    } else{
        response.status(404).json("Usuário não encontrado")
    }

})

app.listen(3000, () => {
    console.log("Running server")
})
