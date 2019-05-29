import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './material.module';

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
