import prismaClient from "../../prisma";

class ListOrderService {
    async execute(user_id: string) {

        const orders = await prismaClient.order.findMany({
            where: {
                user_id,
                drafted: false,
                status: false,
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return orders;
    }

}

export { ListOrderService }