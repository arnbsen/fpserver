import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecialOccasions } from 'app/shared/model/special-occasions.model';

@Component({
  selector: 'jhi-special-occasions-detail',
  templateUrl: './special-occasions-detail.component.html'
})
export class SpecialOccasionsDetailComponent implements OnInit {
  specialOccasions: ISpecialOccasions;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ specialOccasions }) => {
      this.specialOccasions = specialOccasions;
    });
  }

  previousState() {
    window.history.back();
  }
}
