import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { ComingEventComponent } from './coming-event/coming-event.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { HomeSidenavComponent } from './home-sidenav/home-sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './state/reducers/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffect } from './state/effects/home.effect';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeResolver } from './resolvers/Home.resolver';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        HomeComponent,
        HomeContentComponent,
        HomeSidenavComponent,
        ComingEventComponent,
    ],
    exports: [],
    providers: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        StoreModule.forFeature('home', homeReducer),
        EffectsModule.forFeature([HomeEffect]),
        SharedModule,
        RouterModule.forChild([
            { path: 'home', component: HomeComponent, resolve: { HomeData: HomeResolver } }
        ]),
    ]
})
export class HomeModule {}
