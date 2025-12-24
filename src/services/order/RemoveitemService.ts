import prismaClient from "../../prisma";

interface ItemRequest {
    user_id: string;
    item_id: string;
}

class RemoveItemService {
    async execute({ user_id, item_id }: ItemRequest) {
        // Verificar se o item existe e o pedido pertence ao usuário
        const item = await prismaClient.item.findUnique({
            where: { id: item_id },
            include: {
                order: true
            }
        });

        if (!item) {
            throw new Error("Item não encontrado");
        }

        if (item.order.user_id !== user_id) {
            throw new Error("Você não tem permissão para remover este item");
        }

        const order = await prismaClient.item.delete({
            where: {
                id: item_id
            }   
        })
        return order;
    }
}


export { RemoveItemService }