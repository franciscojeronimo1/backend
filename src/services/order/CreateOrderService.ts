import prismaClient from "../../prisma";
import { PaymentMethod } from "@prisma/client";

interface OrderRequest{
    user_id: string;
    table: number;
    name: string;
    address?: string | null;
    payment_method?: PaymentMethod | null;
}

class CreateOrderService {
    async execute({user_id, table, name, address, payment_method}: OrderRequest) {

        const order = await prismaClient.order.create({
            data:{
                user_id,
                table: table,
                name: name,
                address: address ? address.trim() : null,
                payment_method: payment_method || null
            }
        })
        return order;
    }

    }

    export { CreateOrderService }