import { IReview } from "./review";

export interface IBusiness {
    id: number;
    name: string;
    service: string;
    rating: number;
    reviewCount: number;
    reviews: IReview[];
    city: string;
    state: string;

    getID(): number;
    getName(): string;
    getService(): string;
    getRating(): number;
    getRatingString(): string;
    getCount(): number;
    getCountString(): string;
    getList(): any[];
    addReview(review: IReview): void;
    getCity(): string;
    getState(): string;
}
