/*
  Warnings:

  - You are about to drop the column `data_puplicacao` on the `livros` table. All the data in the column will be lost.
  - The `avaliacao` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `data_publicacao` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('solicitada', 'aceita', 'separacao', 'enviada', 'concluida');

-- AlterTable
ALTER TABLE "livros" DROP COLUMN "data_puplicacao",
ADD COLUMN     "data_publicacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "disponibilidade_emprestimo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isbn" TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "avaliacao",
ADD COLUMN     "avaliacao" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "trocas" (
    "id" TEXT NOT NULL,
    "livro_oferecido" TEXT NOT NULL,
    "livro_desejado" TEXT NOT NULL,
    "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_aceitacao" TIMESTAMP(3) NOT NULL,
    "forma_envio" TEXT NOT NULL,
    "endereco_entrega" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'solicitada',
    "usuario_id" TEXT NOT NULL,
    "livro_id" TEXT NOT NULL,

    CONSTRAINT "trocas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_trocas" (
    "id_usuario_troca" TEXT NOT NULL,
    "participacao" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "troca_id" TEXT NOT NULL,

    CONSTRAINT "usuario_trocas_pkey" PRIMARY KEY ("id_usuario_troca")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "data_avaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,
    "troca_id" TEXT NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trocas" ADD CONSTRAINT "trocas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trocas" ADD CONSTRAINT "trocas_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_trocas" ADD CONSTRAINT "usuario_trocas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_trocas" ADD CONSTRAINT "usuario_trocas_troca_id_fkey" FOREIGN KEY ("troca_id") REFERENCES "trocas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_troca_id_fkey" FOREIGN KEY ("troca_id") REFERENCES "trocas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
