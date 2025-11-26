import prismaClient from "../../prisma";

class ListSizesService {
    async execute() {
        const sizes = await prismaClient.productSize.findMany({
            orderBy: {
                order: 'asc'
            }
        });

        return sizes;
    }
}

export { ListSizesService };

