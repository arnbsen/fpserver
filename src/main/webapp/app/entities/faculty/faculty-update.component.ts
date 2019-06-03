import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFaculty, Faculty } from 'app/shared/model/faculty.model';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'jhi-faculty-update',
  templateUrl: './faculty-update.component.html'
})
export class FacultyUpdateComponent implements OnInit {
  faculty: IFaculty;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    facultyCode: []
  });

  constructor(protected facultyService: FacultyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ faculty }) => {
      this.updateForm(faculty);
      this.faculty = faculty;
    });
  }

  updateForm(faculty: IFaculty) {
    this.editForm.patchValue({
      id: faculty.id,
      facultyCode: faculty.facultyCode
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const faculty = this.createFromForm();
    if (faculty.id !== undefined) {
      this.subscribeToSaveResponse(this.facultyService.update(faculty));
    } else {
      this.subscribeToSaveResponse(this.facultyService.create(faculty));
    }
  }

  private createFromForm(): IFaculty {
    const entity = {
      ...new Faculty(),
      id: this.editForm.get(['id']).value,
      facultyCode: this.editForm.get(['facultyCode']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFaculty>>) {
    result.subscribe((res: HttpResponse<IFaculty>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
