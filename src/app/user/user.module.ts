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
import { authReducer } from './state/user.reducer';
import { UserEffects } from './state/user.effects';
import { ErrorHandlerService } from './error-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature([UserEffects]),

    RouterModule.forChild([
      {
        path: 'users',
        children: [
          { path: 'signup', component: SignupComponent },
          { path: 'login', component: LoginComponent},
          { path: 'account-recovery', component: ForgotPasswordComponent },
          { path: 'reset-password', component: ResetPasswordComponent },
          { path: ':userName', component: ProfileComponent,canActivate:[AuthGuard] , children:[
            {path:'event-i-attends', component: ProfileComponent},
            {path:'edit', component: ProfileEditComponent}
          ] },
        ],
      },
    ]),

    JwtModule.forRoot({
      config: {
        tokenGetter: () => null,
        allowedDomains: ['https://localhost:5001'],
        disallowedRoutes: [],
      },
    }),
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
