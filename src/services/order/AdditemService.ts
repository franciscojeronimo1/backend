import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
    size_id?: string;
}

class AddItemService {
    async execute({ order_id, product_id, amount, size_id }: ItemRequest) {
        // Buscar produto com categoria e preços
        const product = await prismaClient.product.findUnique({
            where: { id: product_id },
            include: {
                category: {
                    include: {
                        size_prices: {
                            include: {
                                size: true
                            }
                        }
                    }
                },
                custom_prices: {
                    include: {
                        size: true
                    }
                }
            }
        });

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        // Verificar se pedido existe
        const order = await prismaClient.order.findUnique({
            where: { id: order_id }
        });

        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        let price: number;

        // Se produto tem tamanho, buscar preço
        if (size_id) {
            // Verificar se tamanho existe
            const size = await prismaClient.productSize.findUnique({
                where: { id: size_id }
            });

            if (!size) {
                throw new Error("Tamanho não encontrado");
            }

            // Se produto tem preços customizados, usar eles
            if (product.has_custom_prices) {
                const customPrice = product.custom_prices.find(
                    cp => cp.size_id === size_id
                );

                if (!customPrice) {
                    throw new Error(`Preço não encontrado para tamanho ${size.name}`);
                }

                price = customPrice.price;
            } else {
                // Usar preço da categoria
                const categoryPrice = product.category.size_prices.find(
                    cp => cp.size_id === size_id
                );

                if (!categoryPrice) {
                    throw new Error(`Preço não encontrado para tamanho ${size.name} na categoria`);
                }

                price = categoryPrice.price;
            }
        } else {
            // Produto sem tamanho - usar preço fixo
            if (!product.price) {
                throw new Error("Produto sem tamanho deve ter preço fixo");
            }

            price = product.price;
        }

        // Criar item com preço
        const item = await prismaClient.item.create({
            data: {
                order_id,
                product_id,
                amount,
                price,
                size_id: size_id || null
            },
            include: {
                product: true,
                size: true
            }
        });

        return item;
    }
}

export { AddItemService }