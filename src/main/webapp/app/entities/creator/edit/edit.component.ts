import { Component, OnInit } from '@angular/core';
import { IDepartment } from 'app/shared/model/department.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  department: IDepartment;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
    });
  }
  previousState() {
    window.history.back();
  }
  goToRegisterHod() {
    this.router.navigate(['/register', this.department.id, 'hod']);
  }
}
