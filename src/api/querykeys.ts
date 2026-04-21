import type { GetOrdersParams } from "./order/orderService";

export const queryKeys = Object.freeze({
    orders: {
        all: ["orders"] as const,
        lists: () => [...queryKeys.orders.all, "list"] as const,
        list: (params: GetOrdersParams) => [...queryKeys.orders.lists(), params] as const,
        details: () => [...queryKeys.orders.all, "detail"] as const,
        detail: (id: string) => [...queryKeys.orders.details(), id] as const,
    },
    carriers: {
        all: ["carriers"] as const,
        list: () => [...queryKeys.carriers.all, "list"] as const,
    },
});
