import prismaClient from "../../prisma";

class ListCategoryService {
    async execute() {
        const categorys = await prismaClient.category.findMany({
            select: {id: true, name: true}
        })
        return categorys;
    }
    
}

export { ListCategoryService }