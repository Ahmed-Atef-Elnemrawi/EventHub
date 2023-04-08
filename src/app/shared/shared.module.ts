import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelCasePipe } from './camel-case.pipe';
import { DaysLeftPipe } from './days-left.pipe';

@NgModule({
  declarations: [CamelCasePipe, DaysLeftPipe],
  imports: [CommonModule],
  exports: [CamelCasePipe, DaysLeftPipe],
})
export class SharedModule {}
