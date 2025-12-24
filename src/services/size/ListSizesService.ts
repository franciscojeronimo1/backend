import prismaClient from "../../prisma";

class ListSizesService {
    async execute(user_id: string) {
        const sizes = await prismaClient.productSize.findMany({
            where: {
                user_id
            },
            orderBy: {
                order: 'asc'
            }
        });

        return sizes;
    }
}

export { ListSizesService };

