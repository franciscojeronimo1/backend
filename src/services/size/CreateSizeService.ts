import prismaClient from "../../prisma";

interface SizeRequest {
    name: string;
    display: string;
    order: number;
}

class CreateSizeService {
    async execute({ name, display, order }: SizeRequest) {
        // Verificar se já existe
        const existingSize = await prismaClient.productSize.findUnique({
            where: { name }
        });

        if (existingSize) {
            throw new Error("Tamanho já existe");
        }

        const size = await prismaClient.productSize.create({
            data: {
                name,
                display,
                order
            }
        });

        return size;
    }
}

export { CreateSizeService };

