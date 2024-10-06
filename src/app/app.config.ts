import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {BrowserModule, provideClientHydration} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner"; 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PipesModule } from "./_pipes/pipes.module";
import { GalleriaModule } from 'primeng/galleria'; 
import { CarouselModule as Carousel } from 'primeng/carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import { TabViewModule } from "primeng/tabview";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//Interceptors
import { HttpErrorInterceptor, HttpHeadersInterceptor } from "./_interceptors/index";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
      NgxSpinnerModule,
      AppRoutingModule,
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      NgxSpinnerService,
    NgxDropzoneModule,
    NgSelectModule,
    PipesModule,
    NgxSliderModule,
    CarouselModule,
    GalleriaModule,
    Carousel,
    NgImageSliderModule,
    DataViewModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    TabViewModule
    ),
  
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ]
};
