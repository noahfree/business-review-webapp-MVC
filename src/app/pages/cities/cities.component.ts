import { Component, OnInit } from '@angular/core';
import { Business, BusinessModelService } from 'src/app/services/business-model.service';
import { City, CityModelService } from 'src/app/services/city-model.service';
import { ReviewModelService } from 'src/app/services/review-model.service';
import { ICity } from 'src/app/types/city';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: Array<ICity>;
  constructor(private cityModel: CityModelService, 
              private businessModel: BusinessModelService, 
              private reviewModel: ReviewModelService ) {
    this.cityModel = cityModel;
    this.businessModel = businessModel;
    this.reviewModel = reviewModel;
    this.cities = this.cityModel.cities;
  }

  ngOnInit(): void {
    this.cities = this.cityModel.getAll();
  }

}
