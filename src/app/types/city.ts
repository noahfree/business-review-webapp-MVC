import { IBusiness } from './business';

export interface ICity {
    id: number;
    name: string;
    state: string;
    businessCount: number;
    businesses: IBusiness[];

    getID(): number;
    getName(): string;
    getState(): string;
    getCount(): number;
    getCountString(): string
    getList(): any[];
    addBusiness(business: IBusiness): void;
}
