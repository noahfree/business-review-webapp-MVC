import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Business } from '../services/business-model.service';
import { City, CityModelService } from '../services/city-model.service';
import { Review } from '../services/review-model.service';
import { IBusiness } from '../types/business';
import { ICity } from '../types/city';
import { IReview } from '../types/review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  path: string;
  toggle: boolean;
  @ViewChild('back', {static: true}) back!: ElementRef<HTMLElement>;

  constructor(private location: Location, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {  
    this.path = this.router.url;
    if (this.path == "/cities"){ 
      this.toggle = true;
      this.renderer.setStyle(this.back.nativeElement, 'cursor', 'not-allowed');
    }
    else { 
      this.toggle = false;
      this.renderer.setStyle(this.back.nativeElement, 'cursor', 'pointer');
    }
  }

  navigateBack(): void {
    try {
      this.location.back()
    }
    catch {

    }
  }
}
