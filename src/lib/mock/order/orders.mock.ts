import type { Order } from "../../../types/order/order";
import type {
    AppointmentType,
    Carrier,
    EquipmentType,
    LoadType,
    OrderStatus,
    StopType,
} from "../../../types/order/order-types";
import { pick } from "../../utils/array.utils";
import { isoDate } from "../../utils/date.utils";

// ─── Carriers ─────────────────────────────────────────────────────────────────

export const MOCK_CARRIERS: Carrier[] = [
    { id: "c-01", name: "Swift Transportation",  mcNumber: "MC-123456", phone: "602-555-0101", rating: 4 },
    { id: "c-02", name: "Werner Enterprises",    mcNumber: "MC-234567", phone: "402-555-0102", rating: 5 },
    { id: "c-03", name: "JB Hunt Transport",     mcNumber: "MC-345678", phone: "479-555-0103", rating: 4 },
    { id: "c-04", name: "Schneider National",    mcNumber: "MC-456789", phone: "920-555-0104", rating: 3 },
    { id: "c-05", name: "Knight-Swift",          mcNumber: "MC-567890", phone: "602-555-0105", rating: 4 },
    { id: "c-06", name: "XPO Logistics",         mcNumber: "MC-678901", phone: "203-555-0106", rating: 3 },
    { id: "c-07", name: "Old Dominion Freight",  mcNumber: "MC-789012", phone: "336-555-0107", rating: 5 },
    { id: "c-08", name: "Estes Express Lines",   mcNumber: "MC-890123", phone: "804-555-0108", rating: 4 },
    { id: "c-09", name: "Yellow Corporation",    mcNumber: "MC-901234", phone: "913-555-0109", rating: 2 },
    { id: "c-10", name: "Saia Inc.",             mcNumber: "MC-012345", phone: "404-555-0110", rating: 4 },
    { id: "c-11", name: "USA Truck",             mcNumber: "MC-112233", phone: "479-555-0111", rating: 3 },
    { id: "c-12", name: "Heartland Express",     mcNumber: "MC-223344", phone: "319-555-0112", rating: 4 },
    { id: "c-13", name: "Marten Transport",      mcNumber: "MC-334455", phone: "715-555-0113", rating: 4 },
    { id: "c-14", name: "Universal Truckload",   mcNumber: "MC-445566", phone: "248-555-0114", rating: 3 },
    { id: "c-15", name: "Covenant Logistics",    mcNumber: "MC-556677", phone: "423-555-0115", rating: 5 },
];

// ─── Seed data ────────────────────────────────────────────────────────────────

const CLIENT_NAMES = [
    "Acme Corp", "Global Freight LLC", "Horizon Trade", "Pacific Goods Inc.",
    "Atlantic Supplies", "Summit Retail", "Valley Foods", "Metro Distributors",
    "Coastal Hardware", "Inland Logistics", "Pioneer Manufacturing",
    "Keystone Products", "BlueStar Commerce", "Redwood Wholesale", "IronBridge Co.",
];

const US_CITIES: { city: string; state: string; zip: string }[] = [
    { city: "Los Angeles",  state: "CA", zip: "90001" },
    { city: "Chicago",      state: "IL", zip: "60601" },
    { city: "Houston",      state: "TX", zip: "77001" },
    { city: "Phoenix",      state: "AZ", zip: "85001" },
    { city: "Philadelphia", state: "PA", zip: "19101" },
    { city: "San Antonio",  state: "TX", zip: "78201" },
    { city: "Dallas",       state: "TX", zip: "75201" },
    { city: "San Diego",    state: "CA", zip: "92101" },
    { city: "Jacksonville", state: "FL", zip: "32099" },
    { city: "Austin",       state: "TX", zip: "73301" },
    { city: "Columbus",     state: "OH", zip: "43085" },
    { city: "Charlotte",    state: "NC", zip: "28201" },
    { city: "Indianapolis", state: "IN", zip: "46201" },
    { city: "Denver",       state: "CO", zip: "80201" },
    { city: "Seattle",      state: "WA", zip: "98101" },
    { city: "Nashville",    state: "TN", zip: "37201" },
    { city: "Baltimore",    state: "MD", zip: "21201" },
    { city: "Louisville",   state: "KY", zip: "40201" },
    { city: "Portland",     state: "OR", zip: "97201" },
    { city: "Memphis",      state: "TN", zip: "38101" },
];

const STATUSES: OrderStatus[]     = ["pending", "in_transit", "delivered", "cancelled"];
const EQUIPMENT_TYPES: EquipmentType[] = ["dry_van", "reefer", "flatbed", "step_deck"];
const LOAD_TYPES: LoadType[]       = ["ftl", "ltl"];
const STOP_TYPES: StopType[]       = ["pick_up", "drop_off", "stop"];
const APPT_TYPES: AppointmentType[] = ["fixed", "window", "fcfs"];

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildStatusHistory(
    finalStatus: OrderStatus,
    createdAt: string,
): Order["statusHistory"] {
    const history: Order["statusHistory"] = [
        { from: null, to: "pending", changedAt: createdAt },
    ];
    if (finalStatus === "pending") return history;

    const movedToTransit = new Date(new Date(createdAt).getTime() + 1000 * 3600 * 6).toISOString();
    history.push({ from: "pending", to: "in_transit", changedAt: movedToTransit, note: "Picked up by driver" });
    if (finalStatus === "in_transit") return history;

    const resolved = new Date(new Date(movedToTransit).getTime() + 1000 * 3600 * 24).toISOString();
    history.push({
        from: "in_transit",
        to: finalStatus,
        changedAt: resolved,
        note: finalStatus === "delivered" ? "Delivered successfully" : "Cancelled by client",
    });
    return history;
}

function buildStops(orderId: string, count: number, baseSeed: number): Order["stops"] {
    return Array.from({ length: count }, (_, i) => {
        const addr = pick(US_CITIES, baseSeed + i * 3);
        return {
            id: `${orderId}-stop-${i + 1}`,
            type: i === 0 ? "pick_up" : i === count - 1 ? "drop_off" : pick(STOP_TYPES, baseSeed + i),
            order: i + 1,
            address: addr,
            appointmentType: pick(APPT_TYPES, baseSeed + i),
            appointmentDate: isoDate(60 - i * 2, 8 + i),
            notes: i === 0 ? "Call on arrival" : undefined,
        };
    });
}

function generateOrders(): Order[] {
    return Array.from({ length: 35 }, (_, idx) => {
        const i = idx + 1;
        const id = `ord-${String(i).padStart(3, "0")}`;
        const status = pick(STATUSES, i * 7);
        const createdAt = isoDate(60 - i, 9);
        return {
            id,
            referenceNumber: `ORD-2024-${String(i).padStart(4, "0")}`,
            status,
            clientName: pick(CLIENT_NAMES, i * 3),
            carrier: pick(MOCK_CARRIERS, i * 2),
            equipmentType: pick(EQUIPMENT_TYPES, i),
            loadType: pick(LOAD_TYPES, i),
            stops: buildStops(id, 2 + (i % 4), i * 5),
            weight: 5000 + (i * 317) % 40000,
            rate: 800 + (i * 137) % 4200,
            notes: i % 5 === 0 ? "Fragile cargo — handle with care" : "",
            statusHistory: buildStatusHistory(status, createdAt),
            createdAt,
            updatedAt: createdAt,
        };
    });
}

export const MOCK_ORDERS: Order[] = generateOrders();
