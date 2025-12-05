-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PIX', 'CARTAO', 'DINHEIRO', 'OUTROS');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "payment_method" "PaymentMethod";
