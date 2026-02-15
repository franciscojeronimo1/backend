import prismaClient from "../../prisma";
import {
  toLocalDateStart,
  toLocalDateEnd,
  formatDateLocal,
} from "../../utils/dateUtils";

interface SalesRequest {
  user_id: string;
  period: "day" | "week" | "month" | "custom";
  date?: string;
  start_date?: string;
  end_date?: string;
}

class SalesService {
  private getDateRange(
    period: string,
    date?: string,
    start_date?: string,
    end_date?: string
  ) {
    const now = new Date();
    let start: Date;
    let end: Date;

    switch (period) {
      case "day":
        if (date) {
          start = toLocalDateStart(date);
          end = toLocalDateEnd(date);
        } else {
          start = new Date(now);
          start.setHours(0, 0, 0, 0);
          end = new Date(now);
          end.setHours(23, 59, 59, 999);
        }
        break;

      case "week":
        const dayOfWeek = now.getDay();
        start = new Date(now);
        start.setDate(now.getDate() - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;

      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        break;

      case "custom":
        if (!start_date || !end_date) {
          throw new Error(
            "start_date e end_date são obrigatórios para período customizado"
          );
        }
        start = toLocalDateStart(start_date);
        end = toLocalDateEnd(end_date);
        break;

      default:
        throw new Error("Período inválido. Use: day, week, month ou custom");
    }

    return { start, end };
  }

  async execute({ user_id, period, date, start_date, end_date }: SalesRequest) {
    if (period === "custom" && (!start_date || !end_date)) {
      throw new Error(
        "start_date e end_date são obrigatórios para período customizado"
      );
    }

    const { start, end } = this.getDateRange(
      period,
      date,
      start_date,
      end_date
    );

    const orders = await prismaClient.order.findMany({
      where: {
        user_id,
        status: true,
        created_at: { gte: start, lte: end },
      },
      include: { items: true },
    });

    let total = 0;
    for (const order of orders) {
      for (const item of order.items) {
        total += item.price * item.amount;
      }
    }

    return {
      total: Number(total.toFixed(2)),
      period,
      start_date: formatDateLocal(start),
      end_date: formatDateLocal(end),
      orders_count: orders.length,
    };
  }
}

export { SalesService };
