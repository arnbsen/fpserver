import { Component, Inject } from '@angular/core';
import { ISubject } from 'app/shared/model/subject.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'jhi-subject-chooser-dialog',
  templateUrl: 'subject.chooser.dialog.html'
})
export class SubjectChooserDialogComponent {
  returnData: ISubject;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ISubject[]) {}
}
