import prismaClient from "../../prisma";

interface SalesRequest {
  period: 'day' | 'week' | 'month' | 'custom';
  date?: string;
  start_date?: string;
  end_date?: string;
}

class SalesService {
  private getDateRange(period: string, date?: string, start_date?: string, end_date?: string) {
    const now = new Date();
    let start: Date;
    let end: Date;

    switch (period) {
      case 'day':
        if (date) {
          start = new Date(date);
          start.setHours(0, 0, 0, 0);
          end = new Date(date);
          end.setHours(23, 59, 59, 999);
        } else {
          // Dia atual
          start = new Date(now);
          start.setHours(0, 0, 0, 0);
          end = new Date(now);
          end.setHours(23, 59, 59, 999);
        }
        break;

      case 'week':
        // Semana atual (domingo a sábado)
        const dayOfWeek = now.getDay();
        start = new Date(now);
        start.setDate(now.getDate() - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;

      case 'month':
        // Mês atual
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        break;

      case 'custom':
        if (!start_date || !end_date) {
          throw new Error("start_date e end_date são obrigatórios para período customizado");
        }
        start = new Date(start_date);
        start.setHours(0, 0, 0, 0);
        end = new Date(end_date);
        end.setHours(23, 59, 59, 999);
        break;

      default:
        throw new Error("Período inválido. Use: day, week, month ou custom");
    }

    return { start, end };
  }

  async execute({ period, date, start_date, end_date }: SalesRequest) {
    if (period === 'custom' && (!start_date || !end_date)) {
      throw new Error("start_date e end_date são obrigatórios para período customizado");
    }

    const { start, end } = this.getDateRange(period, date, start_date, end_date);

    const orders = await prismaClient.order.findMany({
      where: {
        status: true,
        created_at: {
          gte: start,
          lte: end,
        },
      },
      include: {
        items: true,
      },
    });

    // Calcular total vendido
    let total = 0;
    let ordersCount = 0;

    for (const order of orders) {
      ordersCount++;
      for (const item of order.items) {
        total += item.price * item.amount;
      }
    }

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    return {
      total: Number(total.toFixed(2)),
      period,
      start_date: formatDate(start),
      end_date: formatDate(end),
      orders_count: ordersCount,
    };
  }
}

export { SalesService };
