import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './user/user.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    UserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    name:'EventHub App DevTools',
    maxAge:25,
    logOnly:environment.production
  })
  ],
  providers: [

],
  bootstrap: [AppComponent],
})
export class AppModule {}
