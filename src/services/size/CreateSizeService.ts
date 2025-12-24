import prismaClient from "../../prisma";

interface SizeRequest {
    user_id: string;
    name: string;
    display: string;
    order: number;
}

class CreateSizeService {
    async execute({ user_id, name, display, order }: SizeRequest) {
        // Verificar se já existe para este usuário
        const existingSize = await prismaClient.productSize.findFirst({
            where: { 
                name,
                user_id
            }
        });

        if (existingSize) {
            throw new Error("Tamanho já existe");
        }

        const size = await prismaClient.productSize.create({
            data: {
                user_id,
                name,
                display,
                order
            }
        });

        return size;
    }
}

export { CreateSizeService };

