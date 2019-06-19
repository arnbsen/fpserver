import { Component, Inject } from '@angular/core';
import { ISubject } from 'app/shared/model/subject.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ILocation } from 'app/shared/model/location.model';

@Component({
  selector: 'jhi-subject-chooser-dialog',
  templateUrl: 'subject.chooser.dialog.html'
})
export class SubjectChooserDialogComponent {
  returnSub: ISubject;
  returnLoc: ILocation;
  constructor(@Inject(MAT_DIALOG_DATA) public data: [ISubject[], ILocation[]]) {}
}
