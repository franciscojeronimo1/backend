import prismaClient from "../../prisma";

interface CategoryRequest {
  category_id: string;
}

class DeleteCategoryService {
  async execute({ category_id }: CategoryRequest) {
    // Verificar se categoria existe
    const category = await prismaClient.category.findUnique({
      where: { id: category_id },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    // Verificar se categoria tem produtos associados
    if (category.products.length > 0) {
      throw new Error(
        "Não é possível deletar categoria que possui produtos associados. Delete os produtos primeiro."
      );
    }

    // Deletar categoria (os size_prices serão deletados automaticamente por cascade)
    const deletedCategory = await prismaClient.category.delete({
      where: {
        id: category_id,
      },
    });

    return deletedCategory;
  }
}

export { DeleteCategoryService };

