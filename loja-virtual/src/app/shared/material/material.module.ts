import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  exports : [
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule]
})
export class MaterialModule { }
