import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILocation, Location } from 'app/shared/model/location.model';
import { LocationService } from './location.service';

@Component({
  selector: 'jhi-location-update',
  templateUrl: './location-update.component.html'
})
export class LocationUpdateComponent implements OnInit {
  location: ILocation;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    locationName: []
  });

  constructor(protected locationService: LocationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);
      this.location = location;
    });
  }

  updateForm(location: ILocation) {
    this.editForm.patchValue({
      id: location.id,
      locationName: location.locationName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocation {
    const entity = {
      ...new Location(),
      id: this.editForm.get(['id']).value,
      locationName: this.editForm.get(['locationName']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocation>>) {
    result.subscribe((res: HttpResponse<ILocation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
