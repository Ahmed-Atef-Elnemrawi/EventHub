import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/material.module';
import { EventsComponent } from './events/events.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArtistsRoutingModule } from './artists-routing.module';
import { AboutComponent } from './about/about.component';
import { ArtistHomeComponent } from './artist-home.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { EventComponent } from './events/event/event.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ArtistEffects } from './state/effects/artist-effects';
import { ArtistAddComponent } from './artist-add/artist-add.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistEventEffect } from './state/effects/artist-event-effects';
import { artistAndEventReducer } from './state/reducers/root.reducer';

@NgModule({
  declarations: [
    ArtistHomeComponent,
    EventsComponent,
    AboutComponent,
    EventEditComponent,
    ArtistEditComponent,
    EventComponent,
    ArtistAddComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ArtistsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('AAE', artistAndEventReducer),
    EffectsModule.forFeature([
      ArtistEffects,
      ArtistEventEffect,
    ]),
  ],
})
export class ArtistHomeModule {}
