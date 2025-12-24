import prismaClient from "../../prisma";

interface OrderRequest {
  user_id: string;
  order_id: string;
}

class FinishOrderService {
    async execute({ user_id, order_id }: OrderRequest) {
        // Verificar se o pedido existe e pertence ao usuário
        const existingOrder = await prismaClient.order.findFirst({
            where: {
                id: order_id,
                user_id
            }
        });

        if (!existingOrder) {
            throw new Error("Pedido não encontrado ou você não tem permissão para finalizá-lo");
        }

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                status: true,
            },
        });
        return order;
    }

}

export { FinishOrderService };