import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDevice, Device } from 'app/shared/model/device.model';
import { DeviceService } from './device.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
  selector: 'jhi-device-update',
  templateUrl: './device-update.component.html'
})
export class DeviceUpdateComponent implements OnInit {
  device: IDevice;
  isSaving: boolean;

  devlocs: ILocation[];

  editForm = this.fb.group({
    id: [],
    lastUpdated: [],
    location: [null, [Validators.required]],
    locationName: [],
    devLocId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected deviceService: DeviceService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ device }) => {
      this.updateForm(device);
      this.device = device;
    });
    this.locationService
      .query({ filter: 'device-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILocation[]>) => response.body)
      )
      .subscribe(
        (res: ILocation[]) => {
          if (!this.device.devLocId) {
            this.devlocs = res;
          } else {
            this.locationService
              .find(this.device.devLocId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
              )
              .subscribe(
                (subRes: ILocation) => (this.devlocs = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(device: IDevice) {
    this.editForm.patchValue({
      id: device.id,
      lastUpdated: device.lastUpdated,
      location: device.location,
      locationName: device.locationName,
      devLocId: device.devLocId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const device = this.createFromForm();
    if (device.id !== undefined) {
      this.subscribeToSaveResponse(this.deviceService.update(device));
    } else {
      this.subscribeToSaveResponse(this.deviceService.create(device));
    }
  }

  private createFromForm(): IDevice {
    const entity = {
      ...new Device(),
      id: this.editForm.get(['id']).value,
      lastUpdated: this.editForm.get(['lastUpdated']).value,
      location: this.editForm.get(['location']).value,
      locationName: this.editForm.get(['locationName']).value,
      devLocId: this.editForm.get(['devLocId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevice>>) {
    result.subscribe((res: HttpResponse<IDevice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }
}
