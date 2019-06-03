import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDayTimeTable } from 'app/shared/model/day-time-table.model';

@Component({
  selector: 'jhi-day-time-table-detail',
  templateUrl: './day-time-table-detail.component.html'
})
export class DayTimeTableDetailComponent implements OnInit {
  dayTimeTable: IDayTimeTable;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dayTimeTable }) => {
      this.dayTimeTable = dayTimeTable;
    });
  }

  previousState() {
    window.history.back();
  }
}
