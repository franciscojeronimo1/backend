import prismaClient from "../../prisma";

interface SizePrice {
    size_id: string;
    price: number;
}

interface CategoryRequest {
    name: string;
    has_sizes?: boolean;
    size_prices?: SizePrice[];
}

class CreateCategoryService {
    async execute({ name, has_sizes = false, size_prices = [] }: CategoryRequest) {
        if (name === '') {
            throw new Error("Nome inválido");
        }

        // Se tem tamanhos, validar que tem preços
        if (has_sizes && size_prices.length === 0) {
            throw new Error("Categoria com tamanhos deve ter preços definidos");
        }

        const category = await prismaClient.category.create({
            data: {
                name,
                has_sizes,
                size_prices: has_sizes && size_prices.length > 0 ? {
                    create: size_prices.map(sp => ({
                        size_id: sp.size_id,
                        price: sp.price
                    }))
                } : undefined
            },
            include: {
                size_prices: {
                    include: {
                        size: true
                    }
                }
            }
        });

        return category;
    }
}

export { CreateCategoryService }