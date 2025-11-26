import prismaClient from "../../prisma";

interface SizeRequest {
  size_id: string;
}

class DeleteSizeService {
  async execute({ size_id }: SizeRequest) {
    // Verificar se tamanho existe
    const size = await prismaClient.productSize.findUnique({
      where: { id: size_id },
      include: {
        category_prices: true,
        product_prices: true,
        items: true,
      },
    });

    if (!size) {
      throw new Error("Tamanho não encontrado");
    }

    // Verificar se tamanho está sendo usado
    const hasCategoryPrices = size.category_prices.length > 0;
    const hasProductPrices = size.product_prices.length > 0;
    const hasItems = size.items.length > 0;

    if (hasCategoryPrices || hasProductPrices || hasItems) {
      let usageDetails: string[] = [];
      
      if (hasCategoryPrices) {
        usageDetails.push(`${size.category_prices.length} preço(s) de categoria`);
      }
      if (hasProductPrices) {
        usageDetails.push(`${size.product_prices.length} preço(s) de produto`);
      }
      if (hasItems) {
        usageDetails.push(`${size.items.length} item(ns) em pedidos`);
      }

      throw new Error(
        `Não é possível deletar tamanho que está sendo usado: ${usageDetails.join(", ")}`
      );
    }

    // Deletar tamanho
    const deletedSize = await prismaClient.productSize.delete({
      where: {
        id: size_id,
      },
    });

    return deletedSize;
  }
}

export { DeleteSizeService };

