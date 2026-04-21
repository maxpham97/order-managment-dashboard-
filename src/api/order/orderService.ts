import { maybeThrow, networkDelay } from "../../lib/mock/network.mock";
import { MOCK_CARRIERS, MOCK_ORDERS } from "../../lib/mock/order/orders.mock";
import type { Order } from "../../types/order/order";
import type { OrderStatus } from "../../types/order/order-types";


export interface GetOrdersParams {
    page: number;
    pageSize: number;
    sortBy?: keyof Pick<Order, "createdAt" | "rate" | "weight" | "referenceNumber" | "clientName" | "status">;
    sortOrder?: "asc" | "desc";
    status?: OrderStatus;
    search?: string;
}

export interface GetOrdersResult {
    data: Order[];
    total: number;
}


class OrderService {
    getOrders = async (params: GetOrdersParams): Promise<GetOrdersResult> => {
        await networkDelay();
        maybeThrow();

        const { page, pageSize, sortBy = "createdAt", sortOrder = "desc", status, search } = params;

        let result = [...MOCK_ORDERS];

        if (status) {
            result = result.filter((o) => o.status === status);
        }

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (o) =>
                    o.referenceNumber.toLowerCase().includes(q) ||
                    o.clientName.toLowerCase().includes(q) ||
                    o.carrier.name.toLowerCase().includes(q),
            );
        }

        result.sort((a, b) => {
            const aVal = String(a[sortBy] ?? "");
            const bVal = String(b[sortBy] ?? "");
            return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });

        const total = result.length;
        const data = result.slice((page - 1) * pageSize, page * pageSize);

        return { data, total };
    };

    getOrder = async (id: string): Promise<Order> => {
        await networkDelay();
        maybeThrow();

        const order = MOCK_ORDERS.find((o) => o.id === id);
        if (!order) throw new Error(`Order "${id}" not found`);
        return { ...order };
    };

    getCarriers = async () => {
        await networkDelay();
        maybeThrow();
        return [...MOCK_CARRIERS];
    };
}

export const orderService = new OrderService();
