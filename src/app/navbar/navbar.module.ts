import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule, ReactiveFormsModule, SharedModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
