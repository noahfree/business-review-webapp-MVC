import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from '@angular/router';
import { AddReviewComponent } from './pages/add-review/add-review.component';
import { BusinessesComponent } from './pages/businesses/businesses.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

const routes: Routes = [
  {
    path: "cities",
    component: CitiesComponent
  },
  {
    path: "businesses",
    component: BusinessesComponent
  },
  {
    path: "businesses/:id",
    component: BusinessesComponent,
  },
  // {
  //   path: "reviews",
  //   component: ReviewsComponent
  // },
  {
    path: "reviews/:id",
    component: ReviewsComponent,
  },
  {
    path: "addReview",
    component: AddReviewComponent
  },
  {
    path: "**",
    redirectTo: "/cities", 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule, BrowserModule, CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
