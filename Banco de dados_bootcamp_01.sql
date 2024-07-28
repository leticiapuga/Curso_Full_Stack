create table pacientes(
	 id serial primary key,  -- ID SERIAL ORDENA OS IDS EM: 1, 2, 3, 4, ...
	 nome varchar(60),       -- 60 CARACTERES
	 email varchar (100),    -- 100 CARACTERES
	 data_nascimento Date 
)


insert into pacientes (nome, email, data_nascimento) values -- ISTO SIGNIFICA: INSIRA ESTES ELEMENTOS NA TABELA "PACIENTES" NAS RESPECTIVAS COLUNAS
('Letícia', 'leticiademirandapuga@gmail.com', '2002-02-19'),
('Davi', 'davimonteiro@gmail.com', '2002-03-20')

select * from pacientes -- PARA OLHAR TUDO O QUE JÁ FOI CRIADO DENTRO DE UMA TABELA

select * from pacientes p inner join consultas c on p.id = c.id_paciente
-- AQUI EU CONSIGO VER A RELAÇÃO ENTRE AS DUAS TABELAS

-- uuid É UM TIPO DE ID QUE GERA CARACTERES ALEATÓRIOS EM FORMA DE STRING

create table consultas(
	id serial primary key,
	id_paciente int references pacientes(id), 
	-- UTILIZEI O "id_paciente" COMO CHAVE ESTRANGEIRA, ISTO É, ESTE ID NOS LIGA A TABELA PACIENTES. (NÃO PODE ESQUECER DE COLOCAR O TIPO DO ID, NESSE CASO É TIPO INTEIRO)
	-- OQUE TEMOS ACIMA CHAMAMOS DE FOREIGN KEY
	
	nome_medico varchar(60)
)

insert into consultas (id_paciente, nome_medico) values
(4, 'Davi'),
(1, 'Letícia')


select * from consultas

