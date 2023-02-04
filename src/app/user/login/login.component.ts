import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { props, Store } from '@ngrx/store';
import {
  debounceTime,
  fromEvent,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { State } from 'src/app/state/state';
import { AuthService } from '../auth.service';
import { AuthValidationMessages, UserForAuthDto } from '../models';
import { getError, getIsAuthenticated } from '../state';
import { UserApiActions } from '../state/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('FromControlName') FormInputElements!: ElementRef[];

  backendErrors$ = new Observable<string>();
  errorMessages: { [key: string]: string } = {};
  genericValidator!: GenericValidator;
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.genericValidator = new GenericValidator(AuthValidationMessages);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
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
    let userCredentials = { ...this.loginForm.value } as UserForAuthDto;

    this.store.dispatch(UserApiActions.login({ user: userCredentials }));

    //load the user
    this.store
      .select(getIsAuthenticated)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated === true)
          return this.store.dispatch(UserApiActions.loadUser());
      });

    this.backendErrors$ = this.store.select(getError);
  }
}
