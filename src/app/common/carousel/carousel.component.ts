import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carousel } from "bootstrap";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @ViewChild("carouselExampleSlidesOnly")
  carouselElement!: ElementRef<HTMLElement>;
  carouselRef!: Carousel; 
   
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.carouselRef = new Carousel(this.carouselElement.nativeElement, {
      interval: 500
    });
    this.startSlide();
    this.nextSlide();
  }

  startSlide() {
    this.carouselRef.cycle();
  }

  nextSlide() {
    this.carouselRef.next();
  }

}