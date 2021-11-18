import { Injectable } from '@angular/core';
import { IBusiness } from '../types/business';
import { IReview } from '../types/review';
import { Business } from './business-model.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CityModelService } from './city-model.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewModelService {

  //reviews: IReview[] = new Array<IReview>();

  constructor(private database: AngularFireDatabase) { }

  // getAll() {
  //   return this.reviews;
  // }

  add(name: string, content: string, rating: number, businessObj: IBusiness, cityModel: CityModelService) {
    let newReview: IReview = new Review(name, content, rating, businessObj.name);

    //this.reviews.push(newReview);
    businessObj.reviews[businessObj.reviews.length] = newReview;
    businessObj.reviewCount++;
    businessObj.rating = (businessObj.rating + rating)/businessObj.reviewCount;
    this.database.list('cities').remove();
    // this.database.list('cities').push(cityModel.getAll());
    cityModel.getAll().forEach(value => {
      this.database.list('cities').push(value);
    });
  }
}

export class Review implements IReview {
  name: string;
  date: string;
  content: string;
  rating: number;
  business: string;

  constructor(name: string, content: string, rating: number, business: string) {
    this.name = name;
    let temp = new Date();
    this.date = this.getDate(temp);
    this.content = content;
    this.rating = rating;
    this.business = business;
  }

  getName(): string {
    return this.name;
  }
  getDate(today: Date): string {
    // following lines of code taken from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }
  getContent(): string {
    return this.content;
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
  getBusiness(): string {
    return this.business;
  }
}
