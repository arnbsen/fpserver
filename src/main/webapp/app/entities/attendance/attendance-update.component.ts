import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAttendance, Attendance } from 'app/shared/model/attendance.model';
import { AttendanceService } from './attendance.service';
import { IDevice } from 'app/shared/model/device.model';
import { DeviceService } from 'app/entities/device';

@Component({
  selector: 'jhi-attendance-update',
  templateUrl: './attendance-update.component.html'
})
export class AttendanceUpdateComponent implements OnInit {
  attendance: IAttendance;
  isSaving: boolean;

  devs: IDevice[];

  editForm = this.fb.group({
    id: [],
    timestamp: [],
    deviceID: [],
    devId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected attendanceService: AttendanceService,
    protected deviceService: DeviceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ attendance }) => {
      this.updateForm(attendance);
      this.attendance = attendance;
    });
    this.deviceService
      .query({ filter: 'attendance-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDevice[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDevice[]>) => response.body)
      )
      .subscribe(
        (res: IDevice[]) => {
          if (!this.attendance.devId) {
            this.devs = res;
          } else {
            this.deviceService
              .find(this.attendance.devId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDevice>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDevice>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDevice) => (this.devs = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(attendance: IAttendance) {
    this.editForm.patchValue({
      id: attendance.id,
      timestamp: attendance.timestamp != null ? attendance.timestamp.format(DATE_TIME_FORMAT) : null,
      deviceID: attendance.deviceID,
      devId: attendance.devId
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
      devId: this.editForm.get(['devId']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDeviceById(index: number, item: IDevice) {
    return item.id;
  }
}
