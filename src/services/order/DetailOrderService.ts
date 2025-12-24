import prismaClient from "../../prisma";

interface DetailRequest {
  user_id: string;
  order_id: string;
}

class DetailOrderService {
  async execute({ user_id, order_id }: DetailRequest) {
    // Verificar se o pedido existe e pertence ao usuário
    const order = await prismaClient.order.findFirst({
      where: {
        id: order_id,
        user_id
      }
    });

    if (!order) {
      throw new Error("Pedido não encontrado ou você não tem permissão para acessá-lo");
    }

    const orders = await prismaClient.item.findMany({
      where: {
        order_id: order_id,
      },
      include: {
        product: true,
        product_2: true,
        size: true,
        size_2: true,
        order: true,
      },
    });
    return orders;
  }
}

export { DetailOrderService };
