import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { props, Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, merge, Observable, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { State } from 'src/app/state/state';
import { AuthService } from '../auth.service';
import { AuthValidationMessages, UserForAuthDto } from '../models';
import { getError } from '../state';
import * as AuthActions from '../state/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren('FromControlName') FormInputElements!: ElementRef[];

  backendErrors$ = new Observable<string>();
  errorMessages: { [key: string]: string } = {};
  genericValidator!: GenericValidator;
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<State>
  ) {
    this.genericValidator = new GenericValidator(AuthValidationMessages);
  }

  ngAfterViewInit(): void {
    const inputBlurs$: Observable<any>[] = this.FormInputElements.map(
      (control) => fromEvent(control.nativeElement, 'blur')
    );

    merge(inputBlurs$, this.loginForm.valueChanges)
      .pipe(debounceTime(500))
      .subscribe(
        () =>
          (this.errorMessages = this.genericValidator.processMessages(
            this.loginForm
          ))
      );
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    let userCredentials = { ...this.loginForm.value} as UserForAuthDto


    this.store.dispatch(AuthActions.login({ user: userCredentials }));
    this.backendErrors$ = this.store.select(getError);
  
  }
}
