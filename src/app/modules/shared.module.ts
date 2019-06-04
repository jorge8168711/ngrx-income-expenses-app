import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    CommonModule,
    MatModule
  ],
})
export class SharedModule {}
