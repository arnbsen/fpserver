import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    NgbModule,
    InfiniteScrollModule,
    CookieModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NguCarouselModule,
    MomentDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    NgJhipsterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NguCarouselModule,
    MomentDateModule,
    CalendarModule
  ]
})
export class DevfpserverSharedLibsModule {
  static forRoot() {
    return {
      ngModule: DevfpserverSharedLibsModule
    };
  }
}
