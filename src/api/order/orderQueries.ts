import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../querykeys";
import { orderService, type GetOrdersParams } from "./orderService";

export const useOrders = (params: GetOrdersParams) =>
    useQuery({
        queryKey: queryKeys.orders.list(params),
        queryFn: () => orderService.getOrders(params),
    });

export const useOrder = (id: string) =>
    useQuery({
        queryKey: queryKeys.orders.detail(id),
        queryFn: () => orderService.getOrder(id),
        enabled: Boolean(id),
    });

export const useCarriers = () =>
    useQuery({
        queryKey: queryKeys.carriers.list(),
        queryFn: () => orderService.getCarriers(),
        staleTime: Infinity,
    });
