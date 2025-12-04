import prismaClient from "../../prisma";

interface OrderRequest{
    table: number;
    name: string;
    address?: string | null;
}

class CreateOrderService {
    async execute({table, name, address}: OrderRequest) {

        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name,
                address: address ? address.trim() : null
            }
        })
        return order;
    }

    }

    export { CreateOrderService }