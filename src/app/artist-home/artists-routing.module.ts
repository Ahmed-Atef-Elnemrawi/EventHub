import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistAddComponent } from './artist-add/artist-add.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistHomeComponent } from './artist-home.component';
import { ArtistHomeResolver } from './artist-home.resolver';
import { ArtistGuard } from './artist.guard';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventComponent } from './events/event/event.component';

const routes: Routes = [
  {
    path: 'artists',
    children: [
      {
        path: ':artistId',
        component: ArtistHomeComponent,
        resolve: { ArtistHomeData: ArtistHomeResolver },
        children: [
          {
            path: 'edit',
            component: ArtistEditComponent,
            outlet: 'secondary',
            canActivate: [ArtistGuard],
          },
          {
            path: 'events/:eventId',
            component: EventComponent,
            outlet: 'secondary',
          },
          {
            path: 'events/:eventId/edit',
            component: EventEditComponent,
            outlet: 'secondary',
            canActivate: [ArtistGuard],
          },
        ],
      },
      {
        path: ':id/add',
        component: ArtistAddComponent,
        canActivate: [ArtistGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
