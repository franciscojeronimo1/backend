-- AlterTable
ALTER TABLE "items" ADD COLUMN     "product_id_2" TEXT,
ADD COLUMN     "size_id_2" TEXT;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_product_id_2_fkey" FOREIGN KEY ("product_id_2") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_size_id_2_fkey" FOREIGN KEY ("size_id_2") REFERENCES "product_sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
