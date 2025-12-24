import prismaClient from "../../prisma";

interface SearchClientsRequest {
    user_id: string;
    search: string;
}

class SearchClientsService {
    async execute({ user_id, search }: SearchClientsRequest) {
        // Busca pedidos onde o nome contém o termo de busca (case insensitive) e pertence ao usuário
        const orders = await prismaClient.order.findMany({
            where: {
                user_id,
                name: {
                    not: null,
                    contains: search,
                    mode: 'insensitive'
                }
            },
            select: {
                name: true,
                address: true,
                created_at: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // Agrupa por nome e pega o último endereço usado (mais recente)
        const clientsMap = new Map<string, { name: string; address: string | null }>();

        orders.forEach(order => {
            if (order.name && !clientsMap.has(order.name)) {
                clientsMap.set(order.name, {
                    name: order.name,
                    address: order.address
                });
            }
        });

        // Converte Map para Array
        const clients = Array.from(clientsMap.values());

        return clients;
    }
}

export { SearchClientsService };
