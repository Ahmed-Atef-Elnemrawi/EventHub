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
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable, Subject, takeUntil } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { State } from 'src/app/state/app.state';
import { AuthValidationMessages, UserForAuthDto } from '../models';

import { AuthAPIAction } from '../state/actions';
import { authSelectors } from '../state';
import { LoadingService } from 'src/app/shared/loading/loading.service';

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
  isLoadingData$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private loaderService: LoadingService
  ) {
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
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () =>
          (this.errorMessages = this.genericValidator.processMessages(
            this.loginForm
          ))
      );
  }

  ngOnInit(): void {
    this.isLoadingData$ = this.loaderService.isUserLoaded$.asObservable();
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    let userCredentials = { ...this.loginForm.value } as UserForAuthDto;
    this.store.dispatch(AuthAPIAction.login({ user: userCredentials }));
    this.backendErrors$ = this.store.select(authSelectors.getError);
  }
}
