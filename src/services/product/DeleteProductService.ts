import prismaClient from "../../prisma";

interface ProductRequest {
  user_id: string;
  product_id: string;
}

class DeleteProductService {
  async execute({ user_id, product_id }: ProductRequest) {
    // Verificar se produto existe, pertence ao usuário e se tem itens associados
    const product = await prismaClient.product.findFirst({
      where: { 
        id: product_id,
        user_id
      },
      include: {
        items: true,
      },
    });

    if (!product) {
      throw new Error("Produto não encontrado ou você não tem permissão para deletá-lo");
    }

    // Verificar se produto está sendo usado em pedidos
    if (product.items.length > 0) {
      throw new Error(
        `Não é possível deletar produto que está sendo usado em ${product.items.length} item(ns) de pedido(s).`
      );
    }

    // Deletar produto (os custom_prices serão deletados automaticamente por cascade)
    const deletedProduct = await prismaClient.product.delete({
      where: {
        id: product_id,
      },
    });

    return deletedProduct;
  }
}

export { DeleteProductService };

