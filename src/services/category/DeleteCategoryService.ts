import prismaClient from "../../prisma";

interface CategoryRequest {
  user_id: string;
  category_id: string;
}

class DeleteCategoryService {
  async execute({ user_id, category_id }: CategoryRequest) {
    // Verificar se categoria existe e pertence ao usuário
    const category = await prismaClient.category.findFirst({
      where: {
        id: category_id,
        user_id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error(
        "Categoria não encontrada ou você não tem permissão para deletá-la"
      );
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
