export interface IGarage {
    max_7_seats: number;
    max_4_seats: number;
    max_15_seats: number;
    total: number;
}

export interface IGarageRequest {
    max_7_seats?: number;
    max_4_seats?: number;
    max_15_seats?: number;
}