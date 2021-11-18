import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessModelService } from 'src/app/services/business-model.service';
import { CityModelService } from 'src/app/services/city-model.service';
import { ReviewModelService } from 'src/app/services/review-model.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  states: Array<string> = ["Missouri", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  services: Array<string> = ["Food & Drink", "Software", "Consulting", "Shopping", "Health & Medical", "Beauty & Spas", "Home Services", "Event Planning & Services", "Arts & Entertainment", "Active Life", "Professional Services", "Automotive", "Hotels & Travel", "Education", "Pets", "Financial Services", "Public Services & Government", "Mass Media", "Other"];
  numOfStars: number = 0;
  reviewForm: FormGroup = new FormGroup({key: new FormControl()});
  toggle: boolean = false;

  @ViewChild('star1', {static: true}) star1!: ElementRef<HTMLElement>;
  @ViewChild('star2', {static: true}) star2!: ElementRef<HTMLElement>;
  @ViewChild('star3', {static: true}) star3!: ElementRef<HTMLElement>;
  @ViewChild('star4', {static: true}) star4!: ElementRef<HTMLElement>;
  @ViewChild('star5', {static: true}) star5!: ElementRef<HTMLElement>;
  @ViewChild('submitButton', {static: true}) submitButton!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2, 
    private builder: FormBuilder, 
    private router: Router, 
    private cityModel: CityModelService, 
    private businessModel: BusinessModelService, 
    private reviewModel: ReviewModelService,
    ) {
      this.cityModel = cityModel;
      this.businessModel = businessModel;
      this.reviewModel = reviewModel;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.reviewForm = new FormGroup({
      'city': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)]),
      'state': new FormControl("Missouri"),
      'business': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'service': new FormControl("Food & Drink"),
      'name': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)]),
      'content': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    console.log(this.reviewForm)
    let city = this.reviewForm.value['city'];
    let state = this.reviewForm.value['state'];
    let business = this.reviewForm.value['business'];
    let service = this.reviewForm.value['service'];
    let name = this.reviewForm.value['name'];
    let content = this.reviewForm.value['content'];
    this.cityModel.add(city, state, business, service, this.businessModel, name, content, this.numOfStars, this.reviewModel);
    
    this.router.navigateByUrl('/cities');
  }

  selectState(event): void{
    this.reviewForm.patchValue({
      'state': event.target.value
    });
    this.toggleCursor(event);
  }

  selectService(event): void{
    this.reviewForm.patchValue({
      'service': event.target.value
    });
    this.toggleCursor(event);
  }

  toggleCursor(event: any): void {
    if (this.toggle && this.reviewForm.valid){
      this.renderer.setStyle(this.submitButton.nativeElement, 'cursor', 'pointer');
    }
    else {
      this.renderer.setStyle(this.submitButton.nativeElement, 'cursor', 'not-allowed');
    }
  }

  starFunc(num: number): void {
    this.renderer.setStyle(this.star2.nativeElement, 'opacity', '50%');
    this.renderer.setStyle(this.star3.nativeElement, 'opacity', '50%');
    this.renderer.setStyle(this.star4.nativeElement, 'opacity', '50%');
    this.renderer.setStyle(this.star5.nativeElement, 'opacity', '50%');

    this.numOfStars = num;
    switch(num){
      case 5:
        this.renderer.setStyle(this.star5.nativeElement, 'opacity', '100%');
      case 4:
        this.renderer.setStyle(this.star4.nativeElement, 'opacity', '100%');
      case 3:
        this.renderer.setStyle(this.star3.nativeElement, 'opacity', '100%');
      case 2:
        this.renderer.setStyle(this.star2.nativeElement, 'opacity', '100%');
      case 1:
        this.renderer.setStyle(this.star1.nativeElement, 'opacity', '100%');
        break;
    }
    this.toggle = true;
    this.toggleCursor(null);
  }

}
