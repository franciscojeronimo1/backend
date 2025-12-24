import prismaClient from "../../prisma";

interface ProductRequest {
    user_id: string;
    category_id: string;
}

class ListByCategoryService {
    async execute({user_id, category_id}: ProductRequest ) {
        // Verificar se categoria existe e pertence ao usuário
        const category = await prismaClient.category.findFirst({
            where: { 
                id: category_id,
                user_id
            },
            include: {
                size_prices: {
                    include: {
                        size: true
                    },
                    orderBy: {
                        size: {
                            order: 'asc'
                        }
                    }
                }
            }
        });

        if (!category) {
            throw new Error("Categoria não encontrada ou você não tem permissão para acessá-la");
        }

        const products = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
                user_id
            },
            include: {
                custom_prices: {
                    include: {
                        size: true
                    },
                    orderBy: {
                        size: {
                            order: 'asc'
                        }
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Formatar resposta com preços disponíveis
        const formattedProducts = products.map(product => {
            // Se produto tem preços customizados, usar eles
            // Senão, usar preços da categoria (se existirem)
            const prices = product.has_custom_prices && product.custom_prices.length > 0
                ? product.custom_prices.map(cp => ({
                    size: cp.size,
                    price: cp.price
                }))
                : category.size_prices && category.size_prices.length > 0
                ? category.size_prices.map(cp => ({
                    size: cp.size,
                    price: cp.price
                }))
                : []; // Array vazio se não houver preços

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                banner: product.banner,
                price: product.price, // Preço fixo (se não usar tamanhos)
                has_custom_prices: product.has_custom_prices,
                has_sizes: category.has_sizes,
                prices: prices,
                created_at: product.created_at,
                updated_at: product.updated_at
            };
        });

        return formattedProducts;
    }
}

export { ListByCategoryService }