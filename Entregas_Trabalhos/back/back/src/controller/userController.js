const { PrismaClient } = require('@prisma/client');
const prismaC = new PrismaClient();

//Entidade Usuários
const getUsers = async (request, response) => {
    const usuario = await prismaC.usuario.findMany();
    response.status(200).json(usuario)
}

const createUsers = async (request, response) => {
    const { nome, email_user, senha, cpf, avaliacao, data_nascimento } = request.body;

    const avaliacaoNumerica = parseInt(avaliacao);

    const usuario = await prismaC.usuario.create({
        data: {
            nome,
            email_user,
            senha,
            cpf,
            avaliacao: avaliacaoNumerica, 
            data_nascimento: new Date(data_nascimento) 
        }
    })

    response.status(201).json(usuario);  
}

const updateUsers = async (request, response) => {
    const {nome, email_user, senha, cpf, avaliacao, data_nascimento} = request.body;
    const {id} = request.params;

    const usuario = await prismaC.usuario.findFirst({
        where: {id}
    })

    if(usuario){
        const usuario = await prismaC.usuario.update({
            data: {
                nome, 
                email_user, 
                senha, 
                cpf, 
                avaliacao: avaliacao ? parseInt(avaliacao) : undefined, 
                data_nascimento: new Date(data_nascimento)},
            where: {id}
        })
        response.status(200).json(usuario)
    } else {
        response.status(404).json("Usuário não encontrado")
    }
}

const deleteUsers = async (request, response) => {
    const {id} = request.params;

    const usuario = await prismaC.usuario.findFirst({
        where: {id}
    })

    if(usuario){
        await prismaC.usuario.delete({
            where: {id}
        })
        response.status(204).send()
    } else{
        response.status(404).json("Usuário não encontrado")
    }
}

//Entidade Livro
const getBooks = async (request, response) => {
    const livro = await prismaC.livro.findMany();
    response.status(200).json(livro)
}

const createBooks = async (request, response) => {
    const { 
        titulo_livro, 
        autor_livro, 
        data_publicacao, 
        genero, 
        condicao_livro, 
        descricao, 
        disponibilidade_troca, 
        isbn, 
        disponibilidade_emprestimo, 
        usuario_id 
    } = request.body;

    const disponibilidadeTroca = disponibilidade_troca === 'true' || disponibilidade_troca === true;
    const disponibilidadeEmprestimo = disponibilidade_emprestimo === 'true' || disponibilidade_emprestimo === true;

    // Verifiquei se o usuário existe
    const usuario = await prismaC.usuario.findFirst({
        where: { id: usuario_id }
    })

    if (!usuario) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }

    const livro = await prismaC.livro.create({
        data: {
            titulo_livro,
            autor_livro,
            data_publicacao: new Date(data_publicacao),
            genero,
            condicao_livro,
            descricao,
            disponibilidade_troca: disponibilidadeTroca,
            isbn,
            disponibilidade_emprestimo: disponibilidadeEmprestimo,
            usuario_id
        }
    })

    response.status(201).json(livro);
}

const updateBooks = async (request, response) => {
    const { id } = request.params;
    const { 
        titulo_livro, 
        autor_livro, 
        data_publicacao, 
        genero, 
        condicao_livro, 
        descricao, 
        disponibilidade_troca, 
        isbn, 
        disponibilidade_emprestimo, 
        usuario_id 
    } = request.body;

    // Converti as variáveis de disponibilidade para Boolean
    const disponibilidadeTrocaBoolean = disponibilidade_troca === 'true';
    const disponibilidadeEmprestimoBoolean = disponibilidade_emprestimo === 'true';

    // Verifiquei se o livro existe
    const livroExistente = await prismaC.livro.findUnique({
        where: { id }
    })

    if (!livroExistente) {
        return response.status(404).json({ error: "Livro não encontrado." });
    }

    // Atualizei o livro
    const livro = await prismaC.livro.update({
        where: { id },
        data: {
            titulo_livro,
            autor_livro,
            data_publicacao: new Date(data_publicacao),
            genero,
            condicao_livro,
            descricao,
            disponibilidade_troca: disponibilidadeTrocaBoolean,
            isbn,
            disponibilidade_emprestimo: disponibilidadeEmprestimoBoolean,
            usuario_id
        }
    })

    response.status(200).json(livro);
}

const deleteBooks = async (request, response) => {
    const {id} = request.params;

    const livro = await prismaC.livro.findFirst({
        where: {id}
    })

    if(livro){
        await prismaC.livro.delete({
            where: {id}
        })
        response.status(204).send()
    } else{
        response.status(404).json("Livro não encontrado")
    }
}

//Entidade Troca
const getChanges = async (request, response) => {
    const troca = await prismaC.troca.findMany();
    response.status(200).json(troca)
}

const createChanges = async (request, response) => {
    const { 
        livro_oferecido,
        livro_desejado,
        data_solicitacao,
        data_aceitacao,
        forma_envio,
        endereco_entrega,
        status,
        usuario_id,
        livro_id 
    } = request.body;

    // Verifiquei se o usuário e o livro existem
    const usuario = await prismaC.usuario.findFirst({
        where: { id: usuario_id }
    });
    const livro = await prismaC.livro.findFirst({
        where: { id: livro_id }
    });

    if (!usuario) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }
    if (!livro) {
        return response.status(404).json({ error: "Livro não encontrado." });
    }

    const troca = await prismaC.troca.create({
        data: {
            livro_oferecido,
            livro_desejado,
            data_solicitacao: new Date(data_solicitacao),
            data_aceitacao: new Date(data_aceitacao),
            forma_envio,
            endereco_entrega,
            status,
            usuario_id,
            livro_id
        }
    })

    response.status(201).json(troca);
}

const updateChanges = async (request, response) => {
    const { id } = request.params;
    const { 
        livro_oferecido,
        livro_desejado,
        data_solicitacao,
        data_aceitacao,
        forma_envio,
        endereco_entrega,
        status,
        usuario_id,
        livro_id 
    } = request.body;


    // Verifiquei se a troca existe
    const trocas = await prismaC.troca.findFirst({
        where: { id }
    })
    
    if (!trocas) {
        return response.status(404).json({ error: "Troca não encontrado." });
    }

    const troca = await prismaC.troca.update({
        where: { id },
        data: {
            livro_oferecido,
            livro_desejado,
            data_solicitacao: new Date(data_solicitacao),
            data_aceitacao: new Date(data_aceitacao),
            forma_envio,
            endereco_entrega,
            status        
        }
    })
    
    response.status(201).json(troca);
}

const deleteChanges = async (request, response) => {
    const {id} = request.params;

    const troca = await prismaC.troca.findFirst({
        where: {id}
    })

    if(troca){
        await prismaC.troca.delete({
            where: {id}
        })
        response.status(204).send()
    } else{
        response.status(404).json("Troca não encontrada")
    }
}

//Entidade usuario_troca
const getUserChange = async (request, response) => {
    const usuario_troca = await prismaC.usuario_troca.findMany();
    response.status(200).json(usuario_troca)
}

const createUserChange = async (request, response) => {
    const { 
        participacao,
        usuario_id,
        troca_id 
    } = request.body;

    // Verifiquei se o usuário e a troca existem
    const usuario = await prismaC.usuario.findFirst({
        where: { id: usuario_id }
    })
    const trocas = await prismaC.troca.findFirst({
        where: { id: troca_id }
    })

    if (!usuario) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }
    if (!trocas) {
        return response.status(404).json({ error: "Troca não encontrada." });
    }

    const usuario_troca = await prismaC.usuario_troca.create({
        data: {
            participacao,
            usuario_id,
            troca_id
        }
    })

    response.status(201).json(usuario_troca);
}

const updateUserChange = async (request, response) => {
    const { id_usuario_troca } = request.params;
    const { 
        participacao,
        usuario_id,
        troca_id 
    } = request.body;

    // Verifiquei se a troca existe
    const usuario_troca = await prismaC.usuario_troca.findFirst({
        where: { id_usuario_troca }
    })
    
    if (!usuario_troca) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }

    const usuario_trocas = await prismaC.usuario_troca.update({
        where: { id_usuario_troca },
        data: {
            participacao,
            usuario_id,
            troca_id      
        }
    })
    
    response.status(201).json(usuario_trocas);
}

const deleteUserChange = async (request, response) => {
    const {id_usuario_troca} = request.params;

    const usuarioTroca = await prismaC.usuario_troca.findFirst({
        where: {id_usuario_troca}
    })

    if(usuarioTroca){
        await prismaC.usuario_troca.delete({
            where: {id_usuario_troca}
        })
        response.status(204).send()
    } else{
        response.status(404).json("Usuário não encontrada")
    }
}

// Entidade Avaliação
const getAssessment = async(request, response) => {
    const avaliacao = await prismaC.avaliacao.findMany();
    response.status(200).json(avaliacao)
}

const createAssessment = async(request, response) => {
    const { 
        nota,
        comentario,
        data_avaliacao,
        usuario_id,
        troca_id
    } = request.body;

    // Verifiquei se o usuário e a troca existem
    const usuario = await prismaC.usuario.findFirst({
        where: { id: usuario_id }
    })
    const trocas = await prismaC.troca.findFirst({
        where: { id: troca_id }
    })

    if (!usuario) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }
    if (!trocas) {
        return response.status(404).json({ error: "Troca não encontrada." });
    }

    const avaliacao = await prismaC.avaliacao.create({
        data: {
            nota,
            comentario,
            data_avaliacao: new Date(data_avaliacao),
            usuario_id,
            troca_id
        }
    })

    response.status(201).json(avaliacao);
}

const updateAssessment = async (request, response) => {
    const { id } = request.params;
    const { 
        nota,
        comentario,
        data_avaliacao,
        usuario_id,
        troca_id         
    } = request.body;

    // Verifiquei se a troca existe
    const avaliacaoEx = await prismaC.avaliacao.findFirst({
        where: { id }
    })
    
    if (!avaliacaoEx) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }

    const avaliacaoUp = await prismaC.avaliacao.update({
        where: { id },
        data: {
            nota,
            comentario,
            data_avaliacao: new Date(data_avaliacao),
            usuario_id,
            troca_id      
        }
    })
    
    response.status(201).json(avaliacaoUp);
}

const deleteAssessment = async (request, response) => {
    const {id} = request.params;

    const avaliacao = await prismaC.avaliacao.findFirst({
        where: {id}
    })

    if(avaliacao){
        await prismaC.avaliacao.delete({
            where: {id}
        })
        response.status(204).send()
    } else{
        response.status(404).json("Usuário não encontrado")
    }
}

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    getBooks,
    createBooks,
    updateBooks,
    deleteBooks,
    getChanges,
    createChanges,
    updateChanges,
    deleteChanges,
    getUserChange,
    createUserChange,
    updateUserChange,
    deleteUserChange,
    getAssessment,
    createAssessment,
    updateAssessment,
    deleteAssessment
}