import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, observable, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { State } from 'src/app/state/state';
import { AuthService } from '../auth.service';
import { ForgotPasswordDto } from '../models';
import { getError } from '../state';
import { UserApiActions } from '../state/actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isSuccess: boolean = false;
  validator!:GenericValidator;
  validationErrors : {[key: string]: string} = {};
  backendError$! : Observable<string>;

  constructor(private fb: FormBuilder, private store: Store<State>) {

  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    let forgotPasswordDto: ForgotPasswordDto = {
      email: this.forgotPasswordForm.get('email')?.value,
      resetPasswordClientURI: 'https://localhost:4200/users/reset-password',
    };

    this.store.dispatch(UserApiActions.forgotPassword({ forgotPasswordDto }));
    this.backendError$ = this.store.select(getError);
}
}
