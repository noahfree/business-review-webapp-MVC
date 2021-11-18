import { Injectable } from '@angular/core';
import { IBusiness } from '../types/business';
import { ICity } from '../types/city';
import { IReview } from '../types/review';
import { ReviewModelService } from './review-model.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CityModelService } from './city-model.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessModelService {

  businesses: IBusiness[] = new Array<IBusiness>();

  constructor(private database: AngularFireDatabase) { }

  getAll() {
    return this.businesses;
  }

  getCount() {
    return this.businesses.length;
  }

  getReviews(id: number) {
    return this.businesses[id].reviews;
  }

  addCurrent(business: Business){
    let name = business.name;
    let service = business.service;
    let city = business.city;
    let state = business.state;
    let reviewCount = business.reviewCount;
    let newBusiness = new Business(name, service, city, state, business.id);
    newBusiness.reviews = business.reviews;
    newBusiness.reviewCount = reviewCount;
    newBusiness.rating = business.rating;
    this.businesses[business.id] = newBusiness;
  }

  add(name: string, service: string, cityObj: ICity, revName: string, revContent: string, revRating: number, reviewModel: ReviewModelService, cityModel: CityModelService){
    let cities = cityObj.businesses;
    for (let i = 0; i < cities.length; i++){
      if (cities[i].name.toLowerCase() == name.toLowerCase() && cities[i].service == service){
        reviewModel.add(revName, revContent, revRating as number, cities[i], cityModel);
        return;
      }
    }
    let newBusiness = new Business(name, service, cityObj.name, cityObj.state, this.getCount());
    cityObj.addBusiness(newBusiness);
    this.businesses.push(newBusiness);
    reviewModel.add(revName, revContent, revRating as number, newBusiness, cityModel);
  }
}

export class Business implements IBusiness {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviewCount: number;
  reviews: IReview[];
  city: string;
  state: string;

  constructor(name: string, service: string, city: string, state: string, id: number) {
    this.name = name;
    this.service = service;
    this.rating = 0;
    this.reviewCount = 0;
    this.reviews = new Array<IReview>();
    this.city = city;
    this.state = state;
    this.id = id;
  }

  getID(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getService(): string {
    return this.service;
  }
  getRating(): number {
    return this.rating as number;
  }
  getRatingString(): string {
    if (this.rating > 1) {
      return this.rating + " Stars";
    }
    else return this.rating + " Star";
  }
  getCount(): number {
    return this.reviewCount;
  }
  getCountString(): string {
    if (this.reviewCount > 1){
      return this.reviewCount + " Reviews";
    }
    else return this.reviewCount + " Review";
  }
  getList(): any[] {
    return this.reviews;
  }
  addReview(review: IReview) {
    this.reviews.push(review);
    this.reviewCount++;
    this.rating = (this.rating + review.rating)/this.reviewCount;
  }
  getCity(): string {
    return this.city;
  }
  getState(): string {
    return this.state;
  }
}

