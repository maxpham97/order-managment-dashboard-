export type OrderStatus = 'pending' | 'in_transit' | 'delivered' | 'cancelled'
export type EquipmentType = 'dry_van' | 'reefer' | 'flatbed' | 'step_deck'
export type LoadType = 'ftl' | 'ltl'
export type StopType = 'pick_up' | 'drop_off' | 'stop'
export type AppointmentType = 'fixed' | 'window' | 'fcfs'
export interface Carrier {
    id: string; name: string; mcNumber: string
    phone: string; rating: number // 1-5
}