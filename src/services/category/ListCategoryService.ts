import prismaClient from "../../prisma";

class ListCategoryService {
    async execute(user_id: string) {
        const categories = await prismaClient.category.findMany({
            where: {
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
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Formatar resposta
        const formattedCategories = categories.map(category => ({
            id: category.id,
            name: category.name,
            has_sizes: category.has_sizes,
            size_prices: category.size_prices.map(sp => ({
                id: sp.id,
                size_id: sp.size_id,
                price: sp.price,
                size: {
                    id: sp.size.id,
                    name: sp.size.name,
                    display: sp.size.display,
                    order: sp.size.order
                }
            })),
            created_at: category.created_at,
            updated_at: category.updated_at
        }));

        return formattedCategories;
    }
}

export { ListCategoryService }