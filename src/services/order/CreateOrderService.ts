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
        try {
            const order = await prismaClient.order.create({
                data:{
                    user_id,
                    table: table,
                    name: name,
                    address: address ? address.trim() : null,
                    payment_method: payment_method || null
                }
            })
            
            // Log para debug
            if (process.env.NODE_ENV === 'development') {
                console.log(`[CreateOrderService] Order created successfully: ${order.id}`)
            }
            
            return order;
        } catch (error) {
            // Log detalhado do erro
            console.error('[CreateOrderService] Error creating order:', error)
            if (error instanceof Error) {
                console.error('[CreateOrderService] Error message:', error.message)
                console.error('[CreateOrderService] Error stack:', error.stack)
            }
            throw error;
        }
    }

    }

    export { CreateOrderService }