import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
