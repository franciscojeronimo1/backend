import prismaClient from "../../prisma";

interface ProductRequest {
  product_id: string;
}

class DeleteProductService {
  async execute({ product_id }: ProductRequest) {
    // Verificar se produto existe e se tem itens associados
    const product = await prismaClient.product.findUnique({
      where: { id: product_id },
      include: {
        items: true,
      },
    });

    if (!product) {
      throw new Error("Produto não encontrado");
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

