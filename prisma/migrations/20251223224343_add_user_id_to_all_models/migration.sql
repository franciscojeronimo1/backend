-- AlterTable: Adicionar user_id em categories
ALTER TABLE "categories" ADD COLUMN "user_id" TEXT;

-- Atribuir todos os dados existentes ao usuário padrão
UPDATE "categories" SET "user_id" = '292739fa-30b3-4243-8b4e-0e5991ec258e' WHERE "user_id" IS NULL;

-- Tornar user_id obrigatório
ALTER TABLE "categories" ALTER COLUMN "user_id" SET NOT NULL;

-- Adicionar foreign key
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Remover constraint unique de name e criar unique composto (user_id, name)
ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS "categories_name_key";
CREATE UNIQUE INDEX "categories_user_id_name_key" ON "categories"("user_id", "name");

-- AlterTable: Adicionar user_id em products
ALTER TABLE "products" ADD COLUMN "user_id" TEXT;

-- Atribuir todos os dados existentes ao usuário padrão
UPDATE "products" SET "user_id" = '292739fa-30b3-4243-8b4e-0e5991ec258e' WHERE "user_id" IS NULL;

-- Tornar user_id obrigatório
ALTER TABLE "products" ALTER COLUMN "user_id" SET NOT NULL;

-- Adicionar foreign key
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable: Adicionar user_id em orders
ALTER TABLE "orders" ADD COLUMN "user_id" TEXT;

-- Atribuir todos os dados existentes ao usuário padrão
UPDATE "orders" SET "user_id" = '292739fa-30b3-4243-8b4e-0e5991ec258e' WHERE "user_id" IS NULL;

-- Tornar user_id obrigatório
ALTER TABLE "orders" ALTER COLUMN "user_id" SET NOT NULL;

-- Adicionar foreign key
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable: Adicionar user_id em product_sizes
ALTER TABLE "product_sizes" ADD COLUMN "user_id" TEXT;

-- Atribuir todos os dados existentes ao usuário padrão
UPDATE "product_sizes" SET "user_id" = '292739fa-30b3-4243-8b4e-0e5991ec258e' WHERE "user_id" IS NULL;

-- Tornar user_id obrigatório
ALTER TABLE "product_sizes" ALTER COLUMN "user_id" SET NOT NULL;

-- Adicionar foreign key
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Remover constraint unique de name e criar unique composto (user_id, name)
ALTER TABLE "product_sizes" DROP CONSTRAINT IF EXISTS "product_sizes_name_key";
CREATE UNIQUE INDEX "product_sizes_user_id_name_key" ON "product_sizes"("user_id", "name");


