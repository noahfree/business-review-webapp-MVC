import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BusinessModelService } from 'src/app/services/business-model.service';
import { CityModelService } from 'src/app/services/city-model.service';
import { Review, ReviewModelService } from 'src/app/services/review-model.service';
import { IReview } from 'src/app/types/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Array<IReview>;

  constructor(private cityModel: CityModelService, 
              private businessModel: BusinessModelService, 
              private reviewModel: ReviewModelService,
              private route: ActivatedRoute,
              private router: Router ) {
    this.cityModel = cityModel;
    this.businessModel = businessModel;
    this.reviewModel = reviewModel;
    if (this.cityModel.cities == null || this.cityModel.cities.length == 0) {
      this.router.navigateByUrl('/cities');
    }
    // this.reviews = this.reviewModel.getAll();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.reviews = this.businessModel.getReviews(params.id);
    });
  }

}
