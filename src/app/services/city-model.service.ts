import { Injectable } from '@angular/core';
import { min } from 'rxjs/operators';
import { IBusiness } from '../types/business';
import { ICity } from '../types/city';
import { BusinessModelService } from './business-model.service';
import { ReviewModelService } from './review-model.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({ 
  providedIn: 'root'
})
export class CityModelService {

  data: Record<string, ICity>;
  cities: Array<ICity> = new Array<ICity>();

  constructor(private database: AngularFireDatabase,
    private businessModel: BusinessModelService, ) {
    this.database.object<Record<string, ICity>>('cities').valueChanges().subscribe(data => {
      this.data = data;
      if (this.data && this.cities.length == 0){
        // this.cities = new Array<ICity>();
        Object.keys(this.data).forEach(value => {
          // this.cities.push(this.data[value]);
          this.cities.push(new City(this.data[value].name, this.data[value].state, this.data[value].id));
          this.cities[this.cities.length-1].businesses = this.data[value].businesses;
          this.cities[this.cities.length-1].businessCount = this.data[value].businesses.length;
          for (let i = 0; i < this.data[value].businessCount; i++){
            businessModel.addCurrent(this.data[value].businesses[i]);
          }
        });
      }
    });
  }


  getAll() {
    return this.cities;
  }

  getCount() {
    return this.cities.length;
  }

  getBusinesses(id: number) {
    return this.cities[id].businesses;
  }

  add(nameOfCity: string, state: string, business: string, service: string, businessModel: BusinessModelService, name: string, content: string, rating: number, reviewModel: ReviewModelService) {
    for (let i = 0; i < this.cities.length; i++){
      if (this.cities[i].name.toLowerCase().match(nameOfCity.toLowerCase()) != null && this.cities[i].state.match(state) != null){
        businessModel.add(business, service, this.cities[i], name, content, rating, reviewModel, this);
        return;
      }
    }
    let newCity = new City(nameOfCity, state, this.getCount());
    this.cities.push(newCity);
    console.log(this.cities);
    businessModel.add(business, service, newCity, name, content, rating, reviewModel, this);
  }
}

export class City implements ICity {
  id: number;
  name: string;
  state: string;
  businessCount: number;
  businesses: IBusiness[];

  constructor(name: string, state: string, id: number){
    this.name = name;
    this.state = state;
    this.businessCount = 0;
    this.businesses = new Array<IBusiness>();
    this.id = id;
  }

  getID(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getState(): string {
    return this.state;
  }
  getCount(): number {
    return this.businessCount;
  }
  getCountString(): string {
    if (this.businessCount > 1){
      return this.businessCount + " Businesses";
    }
    else return this.businessCount + " Business";
  }
  getList(): any[] {
    return this.businesses;
  }
  addBusiness(business: IBusiness) {
    this.businesses.push(business);
    this.businessCount++;
  }
}
