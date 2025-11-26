/*
  Warnings:

  - Added the required column `price` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "has_sizes" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable: Adicionar coluna price como nullable primeiro
ALTER TABLE "items" ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "size_id" TEXT;

-- Preencher preços existentes com o preço do produto
UPDATE "items" 
SET "price" = "products"."price"
FROM "products"
WHERE "items"."product_id" = "products"."id" AND "items"."price" IS NULL;

-- Agora tornar price obrigatório
ALTER TABLE "items" ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "has_custom_prices" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "product_sizes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_size_prices" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "category_size_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_size_prices" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_size_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_sizes_name_key" ON "product_sizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_size_prices_category_id_size_id_key" ON "category_size_prices"("category_id", "size_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_size_prices_product_id_size_id_key" ON "product_size_prices"("product_id", "size_id");

-- AddForeignKey
ALTER TABLE "category_size_prices" ADD CONSTRAINT "category_size_prices_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_size_prices" ADD CONSTRAINT "category_size_prices_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "product_sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size_prices" ADD CONSTRAINT "product_size_prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size_prices" ADD CONSTRAINT "product_size_prices_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "product_sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "product_sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
