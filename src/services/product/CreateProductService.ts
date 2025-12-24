import prismaClient from "../../prisma";

interface SizePrice {
  size_id: string;
  price: number;
}

interface ProductRequest {
  user_id: string;
  name: string;
  price?: string;
  description: string;
  banner?: string;
  category_id: string;
  has_custom_prices?: boolean;
  custom_prices?: SizePrice[];
}

class CreateProductService {
  async execute({
    user_id,
    name,
    price,
    description,
    banner,
    category_id,
    has_custom_prices = false,
    custom_prices = [],
  }: ProductRequest) {
    // Verificar se categoria existe e pertence ao usuário
    const category = await prismaClient.category.findFirst({
      where: { 
        id: category_id,
        user_id
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada ou você não tem permissão para acessá-la");
    }

    // Se categoria não tem tamanhos, produto deve ter preço fixo
    if (!category.has_sizes && !price) {
      throw new Error(
        "Produto deve ter preço fixo quando a categoria não tem tamanhos"
      );
    }

    // Se tem preços customizados, validar
    if (has_custom_prices) {
      if (
        !custom_prices ||
        !Array.isArray(custom_prices) ||
        custom_prices.length === 0
      ) {
        throw new Error(
          "Produto com preços customizados deve ter preços definidos. Envie um array com pelo menos um preço por tamanho."
        );
      }

      // Validar que cada preço tem size_id e price
      for (const customPrice of custom_prices) {
        if (
          !customPrice.size_id ||
          customPrice.price === undefined ||
          customPrice.price === null
        ) {
          throw new Error(
            "Cada preço customizado deve ter size_id e price definidos"
          );
        }
      }
    }

    // Se não tem preços customizados e categoria tem tamanhos, usar preço fixo não faz sentido
    // Mas vamos permitir para compatibilidade com produtos antigos
    const product = await prismaClient.product.create({
      data: {
        user_id,
        name,
        price: price ? Number(price) : null,
        description,
        banner,
        category_id,
        has_custom_prices,
        custom_prices:
          has_custom_prices && custom_prices.length > 0
            ? {
                create: custom_prices.map((sp) => ({
                  size_id: sp.size_id,
                  price: sp.price,
                })),
              }
            : undefined,
      },
      include: {
        custom_prices: {
          include: {
            size: true,
          },
        },
        category: {
          include: {
            size_prices: {
              include: {
                size: true,
              },
            },
          },
        },
      },
    });

    return product;
  }
}

export { CreateProductService };
