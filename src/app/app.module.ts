import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { BusinessesComponent } from './pages/businesses/businesses.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CityModelService } from './services/city-model.service';
import { BusinessModelService } from './services/business-model.service';
import { ReviewModelService } from './services/review-model.service';
import { AddReviewComponent } from './pages/add-review/add-review.component';
import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from 'src/environments/environment';

const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCQfBEk4a_eqRUFV_neOAvfNIfB6xjxth8",
    authDomain: "challenge4-mvc-6cc5a.firebaseapp.com",
    projectId: "challenge4-mvc-6cc5a",
    storageBucket: "challenge4-mvc-6cc5a.appspot.com",
    messagingSenderId: "802337713591",
    appId: "1:802337713591:web:40d38aa604ef6252f1cc32",
    measurementId: "G-9MVW217VYJ"
  }
}; 


@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    BusinessesComponent,
    ReviewsComponent,
    NavbarComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [CityModelService, BusinessModelService, ReviewModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
