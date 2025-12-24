import prismaClient from "../../prisma";

interface CategoryRequest {
    user_id: string;
    category_id: string;
}

class DetailCategoryService {
    async execute({ user_id, category_id }: CategoryRequest) {
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

        return {
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
        };
    }
}

export { DetailCategoryService };

