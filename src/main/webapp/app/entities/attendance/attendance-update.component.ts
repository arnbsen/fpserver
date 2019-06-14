import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAttendance, Attendance } from 'app/shared/model/attendance.model';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'jhi-attendance-update',
  templateUrl: './attendance-update.component.html'
})
export class AttendanceUpdateComponent implements OnInit {
  attendance: IAttendance;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    timestamp: [],
    deviceID: [],
    type: []
  });

  constructor(protected attendanceService: AttendanceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ attendance }) => {
      this.updateForm(attendance);
      this.attendance = attendance;
    });
  }

  updateForm(attendance: IAttendance) {
    this.editForm.patchValue({
      id: attendance.id,
      timestamp: attendance.timestamp != null ? attendance.timestamp.format(DATE_TIME_FORMAT) : null,
      deviceID: attendance.deviceID,
      type: attendance.type
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const attendance = this.createFromForm();
    if (attendance.id !== undefined) {
      this.subscribeToSaveResponse(this.attendanceService.update(attendance));
    } else {
      this.subscribeToSaveResponse(this.attendanceService.create(attendance));
    }
  }

  private createFromForm(): IAttendance {
    const entity = {
      ...new Attendance(),
      id: this.editForm.get(['id']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      deviceID: this.editForm.get(['deviceID']).value,
      type: this.editForm.get(['type']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttendance>>) {
    result.subscribe((res: HttpResponse<IAttendance>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
