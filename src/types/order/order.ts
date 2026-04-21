import type { AppointmentType, Carrier, EquipmentType, LoadType, OrderStatus, StopType } from "./order-types";

export interface Order {
    id: string;
    referenceNumber: string // "ORD-2024-0001"
    status: OrderStatus;
    clientName: string;
    carrier: Carrier
    equipmentType: EquipmentType;
    loadType: LoadType
    stops: Stop[]
    weight: number; rate: number; notes: string
    statusHistory: StatusChange[]
    createdAt: string; updatedAt: string
}


interface Stop {
    id: string; type: StopType; order: number
    address: Address; locationName?: string; refNumber?: string
    appointmentType: AppointmentType
    appointmentDate: string | null; notes?: string
}
interface Address {
    city: string;
    state: string;
    zip: string
}
interface StatusChange {
    from: OrderStatus | null;
    to: OrderStatus;
    changedAt: string;
    note?: string
}