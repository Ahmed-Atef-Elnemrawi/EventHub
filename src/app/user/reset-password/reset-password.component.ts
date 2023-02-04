import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  fromEvent,
  merge,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { State } from 'src/app/state/state';
import { UserApiActions } from '../state/actions';
import { ResetPasswordDto, resetPasswordValidationMessages } from '../models';
import { getError } from '../state';
import * as AuthActions from '../state/actions';

function compare(control: AbstractControl): { [key: string]: boolean } | null {
  const parent = control.parent;
  const password = parent?.get('password');
  const confirm = parent?.get('confirm');

  if (password?.pristine || confirm?.pristine) {
    return null;
  }

  return password?.value !== confirm?.value ? { match: true } : null;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChildren('FormControlName') FormInputElements!: ElementRef[];

  backendErrors$!: Observable<string>;
  resetPasswordForm!: FormGroup;
  validationErrors: { [key: string]: string } = {};
  hidePassword = true;
  hideConfirm = true;
  genericValidators!: GenericValidator;
  private destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.genericValidators = new GenericValidator(
      resetPasswordValidationMessages
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterViewInit(): void {
    const inputBlurs$: Observable<any>[] = this.FormInputElements.map(
      (inputElement) =>
        fromEvent(inputElement.nativeElement, 'blur').pipe(
          takeUntil(this.destroyed$)
        )
    );

    merge(this.resetPasswordForm.valueChanges, inputBlurs$)
      .pipe(debounceTime(500), takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.validationErrors = this.genericValidators.processMessages(
            this.resetPasswordForm
          );
        },
      });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
        ],
      ],
      confirm: ['', [Validators.required, compare]],
    });
  }

  onSubmit = () => {
    var token = this.route.snapshot.queryParamMap.get('token');
    var email = this.route.snapshot.queryParamMap.get('email');

    var value = this.resetPasswordForm.value;
    var resetPasswordDto: ResetPasswordDto = {
      ...value,
      token,
      email,
    };

    this.store.dispatch(UserApiActions.resetPassword({ resetPasswordDto }));
    this.backendErrors$ = this.store.select(getError);
  };
}
