import type { OrderDto } from "./order-dto";

export interface LocalDraft {
    id: string;
    title: string;
    formData: Partial<OrderDto>;
    savedAt: string
}
