import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'app/entities/department';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IDepartment } from 'app/shared/model/department.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-preregister',
  templateUrl: './preregister.component.html',
  styles: []
})
export class PreregisterComponent implements OnInit {
  departments: IDepartment[] = [];

  selectionForm = new FormGroup({
    dept: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  constructor(protected departmentService: DepartmentService, protected router: Router) {}

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService
      .query()
      .pipe(
        filter((res: HttpResponse<IDepartment[]>) => res.ok),
        map((res: HttpResponse<IDepartment[]>) => res.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          this.departments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  onError(message: string): void {}

  onSubmit() {
    this.router.navigate(['/register', this.selectionForm.get('dept').value, this.selectionForm.get('role').value]);
  }
}
