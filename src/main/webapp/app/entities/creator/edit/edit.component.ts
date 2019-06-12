import { Component, OnInit } from '@angular/core';
import { IDepartment } from 'app/shared/model/department.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  department: IDepartment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      console.log(department);
    });
  }
  previousState() {
    window.history.back();
  }
}
