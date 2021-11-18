import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Business, BusinessModelService } from 'src/app/services/business-model.service';
import { CityModelService } from 'src/app/services/city-model.service';
import { ReviewModelService } from 'src/app/services/review-model.service';
import { IBusiness } from 'src/app/types/business';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.scss']
})
export class BusinessesComponent implements OnInit {
  businesses: Array<IBusiness>;

  constructor(private cityModel: CityModelService, 
              private businessModel: BusinessModelService, 
              private reviewModel: ReviewModelService,
              private route: ActivatedRoute,
              private router: Router) {
    this.cityModel = cityModel;
    this.businessModel = businessModel;
    this.reviewModel = reviewModel;
    if (this.cityModel.cities == null || this.cityModel.cities.length == 0) {
      this.router.navigateByUrl('/cities');
    }
    // this.businesses = this.businessModel.getAll();
  }

  ngOnInit(): void {
    // this.businesses = this.businessModel.getAll();
    this.route.params.subscribe((params: Params) => { 
      this.businesses = this.cityModel.getBusinesses(params.id);
    });
  }

}
