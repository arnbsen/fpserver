import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDevice, Device } from 'app/shared/model/device.model';
import { DeviceService } from './device.service';

@Component({
  selector: 'jhi-device-update',
  templateUrl: './device-update.component.html'
})
export class DeviceUpdateComponent implements OnInit {
  device: IDevice;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    lastUpdated: [],
    location: [null, [Validators.required]]
  });

  constructor(protected deviceService: DeviceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ device }) => {
      this.updateForm(device);
      this.device = device;
    });
  }

  updateForm(device: IDevice) {
    this.editForm.patchValue({
      id: device.id,
      lastUpdated: device.lastUpdated,
      location: device.location
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
      location: this.editForm.get(['location']).value
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
}
