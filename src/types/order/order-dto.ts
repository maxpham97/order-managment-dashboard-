import type {
    AppointmentType,
    Carrier,
    EquipmentType,
    LoadType,
    OrderStatus,
    StopType,
} from "./order-types";

/** Одна остановка в секции Stops модалки (Pick Up / Drop Off, адрес, дата/время, тип аппойнтмента). */
export interface StopDto {
    id: string;
    /** Порядок в списке (для кнопок вверх/вниз). */
    order: number;
    type: StopType;
    city: string;
    state: string;
    zip: string;
    appointmentDate: string | null;
    /** Время отдельно от даты, как в UI `[time]` (например `HH:mm` или ISO time). */
    appointmentTime: string | null;
    appointmentType: AppointmentType;
    notes?: string;
}

/** DTO заказа в соответствии с полями модалки: клиент, референс, логистика, стопы, вес, рейт, заметка. */
export interface OrderDto {
    id: string;
    referenceNumber: string;
    status: OrderStatus;
    clientName: string;
    carrier: Carrier;
    equipmentType: EquipmentType;
    loadType: LoadType;
    stops: StopDto[];
    weight: number;
    rate: number;
    notes: string;
}

/** Данные формы создания/редактирования до сохранения (id/status опциональны для черновика). */
export type CreateOrderInput = Omit<OrderDto, "id" | "status"> & {
    id?: string;
    status?: OrderStatus;
};
