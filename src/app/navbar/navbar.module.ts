import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavbarService } from './navbar.service';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NavbarEffect } from './state/effect';
import { navbarReducer } from './state/reducer';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('navbar', navbarReducer),
    EffectsModule.forFeature([NavbarEffect])
  ],
  exports: [NavbarComponent],
  providers: [NavbarService],
})
export class NavbarModule {}
