import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects';
import { ErrorHandlerService } from './services/error-handler.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { AuthPagesGuard } from './guards/auth-pages.guard';
import { WhoImFollowComponent } from './profile/who-im-follow/who-im-follow.component';
import { EventsIAttendComponent } from './profile/events-i-attend/events-i-attend.component';
import { UserResolver } from './user.resolver';
import { AuthUserReducer } from './state/reducers/root.reducer';
import { AuthEffects } from './state/effects/auth.effects';
import { NonAuthPagesGuard } from './guards/non-auth-pages.guard';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ProfileEditComponent,
    WhoImFollowComponent,
    EventsIAttendComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('authUser', AuthUserReducer),
    EffectsModule.forFeature([AuthEffects, UserEffects]),

    RouterModule.forChild([
      {
        path: 'users',
        children: [
          {
            path: 'signup',
            component: SignupComponent,
            canActivate: [NonAuthPagesGuard],
          },
          {
            path: 'login',
            component: LoginComponent,
            canActivate: [NonAuthPagesGuard],
          },
          {
            path: 'account-recovery',
            component: ForgotPasswordComponent,
            canActivate: [NonAuthPagesGuard],
          },
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
            canActivate: [NonAuthPagesGuard],
          },
          {
            path: ':userId',
            component: ProfileComponent,
            canActivate: [AuthPagesGuard],

            children: [
              {
                path: 'events-I-attend',
                component: EventsIAttendComponent,
                resolve: { userData: UserResolver },
              },
              {
                path: 'who-Im-follow',
                component: WhoImFollowComponent,
                resolve: { userData: UserResolver },
              },
              { path: 'edit', component: ProfileEditComponent },
            ],
          },
        ],
      },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
  ],
})
export class UserModule {}
