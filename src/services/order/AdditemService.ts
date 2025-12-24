import prismaClient from "../../prisma";

interface ItemRequest {
    user_id: string;
    order_id: string;
    product_id: string;
    amount: number;
    size_id?: string;
    product_id_2?: string;
    size_id_2?: string;
}

class AddItemService {
    // Função auxiliar para buscar o preço de um produto
    private async getProductPrice(user_id: string, productId: string, sizeId: string | undefined): Promise<number> {
        const product = await prismaClient.product.findFirst({
            where: { 
                id: productId,
                user_id
            },
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
            throw new Error("Produto não encontrado ou você não tem permissão para acessá-lo");
        }

        if (sizeId) {
            // Verificar se tamanho existe e pertence ao usuário
            const size = await prismaClient.productSize.findFirst({
                where: { 
                    id: sizeId,
                    user_id
                }
            });

            if (!size) {
                throw new Error("Tamanho não encontrado ou você não tem permissão para acessá-lo");
            }

            // Se produto tem preços customizados, usar eles
            if (product.has_custom_prices) {
                const customPrice = product.custom_prices.find(
                    cp => cp.size_id === sizeId
                );

                if (!customPrice) {
                    throw new Error(`Preço não encontrado para tamanho ${size.name}`);
                }

                return customPrice.price;
            } else {
                // Usar preço da categoria
                const categoryPrice = product.category.size_prices.find(
                    cp => cp.size_id === sizeId
                );

                if (!categoryPrice) {
                    throw new Error(`Preço não encontrado para tamanho ${size.name} na categoria`);
                }

                return categoryPrice.price;
            }
        } else {
            // Produto sem tamanho - usar preço fixo
            if (!product.price) {
                throw new Error("Produto sem tamanho deve ter preço fixo");
            }

            return product.price;
        }
    }

    async execute({ user_id, order_id, product_id, amount, size_id, product_id_2, size_id_2 }: ItemRequest) {
        // Verificar se pedido existe e pertence ao usuário
        const order = await prismaClient.order.findFirst({
            where: { 
                id: order_id,
                user_id
            }
        });

        if (!order) {
            throw new Error("Pedido não encontrado ou você não tem permissão para acessá-lo");
        }

        // Validações para pizza meia a meia
        if (product_id_2) {
            // Validar que size_id_2 foi fornecido
            if (!size_id_2) {
                throw new Error("size_id_2 é obrigatório quando product_id_2 é fornecido");
            }

            // Validar que size_id foi fornecido (necessário para meia a meia)
            if (!size_id) {
                throw new Error("size_id é obrigatório para pizza meia a meia");
            }

            // Validar que tamanhos são iguais
            if (size_id !== size_id_2) {
                throw new Error("Os tamanhos devem ser iguais para pizza meia a meia");
            }

            // Validar que produtos são diferentes
            if (product_id === product_id_2) {
                throw new Error("Os sabores devem ser diferentes");
            }

            // Buscar ambos os produtos para validação (verificando user_id)
            const product1 = await prismaClient.product.findFirst({
                where: { 
                    id: product_id,
                    user_id
                },
                include: {
                    category: true
                }
            });

            const product2 = await prismaClient.product.findFirst({
                where: { 
                    id: product_id_2,
                    user_id
                },
                include: {
                    category: true
                }
            });

            if (!product1 || !product2) {
                throw new Error("Um ou ambos os produtos não foram encontrados");
            }

            // Validar que ambos têm tamanhos (categoria deve ter has_sizes = true)
            if (!product1.category.has_sizes || !product2.category.has_sizes) {
                throw new Error("Ambos os produtos devem ter tamanhos para pizza meia a meia");
            }

            // Buscar preços de ambos os produtos
            const price1 = await this.getProductPrice(user_id, product_id, size_id);
            const price2 = await this.getProductPrice(user_id, product_id_2, size_id_2);

            // Usar o maior preço
            const finalPrice = Math.max(price1, price2);

            // Criar item com meia a meia
            const item = await prismaClient.item.create({
                data: {
                    order_id,
                    product_id,
                    size_id,
                    product_id_2,
                    size_id_2,
                    amount,
                    price: finalPrice
                },
                include: {
                    product: true,
                    size: true,
                    product_2: true,
                    size_2: true
                }
            });

            return item;
        } else {
            // Item normal (sem meia a meia)
            // Buscar produto com categoria e preços (verificando user_id)
            const product = await prismaClient.product.findFirst({
                where: { 
                    id: product_id,
                    user_id
                },
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
                throw new Error("Produto não encontrado ou você não tem permissão para acessá-lo");
            }

            const price = await this.getProductPrice(user_id, product_id, size_id);

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
}

export { AddItemService }