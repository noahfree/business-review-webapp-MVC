export interface IReview {
    name: string;
    date: string;
    content: string;
    rating: number;
    business: string;

    getName(): string;
    getDate(today: Date): string;
    getContent(): string;
    getRating(): number;
    getRatingString(): string;
    getBusiness(): string;
}
