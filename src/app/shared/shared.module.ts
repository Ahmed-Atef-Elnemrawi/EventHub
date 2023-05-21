import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelCasePipe } from './camel-case.pipe';
import { DaysLeftPipe } from './days-left.pipe';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [CamelCasePipe, DaysLeftPipe, LoadingComponent],
  imports: [CommonModule],
  exports: [CamelCasePipe, DaysLeftPipe, LoadingComponent],
})
export class SharedModule {}
