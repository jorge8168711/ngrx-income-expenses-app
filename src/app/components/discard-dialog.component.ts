import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DiscardDialogData {
  message?: string;
  title?: string;
  no?: string;
  yes?: string;
}

@Component({
  selector: 'app-discard-dialog',
  template: /*html*/ `
    <h2 mat-dialog-title>{{ data && data.title || 'Delete item' }}</h2>
    <mat-dialog-content>
      <p>{{ data && data.message || 'Are you sure?' }}</p>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button mat-dialog-close>
        {{ data && data.no || 'No' }}
      </button>
      <button mat-button [mat-dialog-close]="true">
        {{ data && data.yes || 'Yes' }}
      </button>
    </mat-dialog-actions>
  `
})
export class DiscardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DiscardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiscardDialogData
  ) {}
}
