import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  AfterViewInit,
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
import { debounceTime, fromEvent, merge, Observable, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { AuthService } from '../auth.service';
import { ResetPasswordDto, resetPasswordValidationMessages } from '../models';

function compare(control: AbstractControl): {[key:string]: boolean} | null {
  const parent = control.parent;
  const password = parent?.get('password')
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
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  @ViewChildren('FormControlName') FormInputElements!: ElementRef[];

  private backendErrorsSubject = new Subject<string[]>();
  backendErrors$ = this.backendErrorsSubject.asObservable();

  resetPasswordForm!: FormGroup;
  validationErrors: { [key: string]: string } = {};
  hidePassword = true;
  hideConfirm = true;
  genericValidators!: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.genericValidators = new GenericValidator(
      resetPasswordValidationMessages
    );
  }
  ngAfterViewInit(): void {
    const inputBlurs$: Observable<any>[] = this.FormInputElements.map(
      (inputElement) => fromEvent(inputElement.nativeElement, 'blur')
    );

    merge(this.resetPasswordForm.valueChanges, inputBlurs$)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.validationErrors = this.genericValidators.processMessages(
            this.resetPasswordForm
          );

          console.log(this.resetPasswordForm);
        },
      });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
        "password":["",[Validators.required]],
        "confirm":["",[Validators.required, compare]]
      });
  }

  onSubmit = () => {
    var token = this.route.snapshot.queryParamMap.get('token');
    var email = this.route.snapshot.queryParamMap.get('email');

    var value = this.resetPasswordForm.value;
    var resetPassword: ResetPasswordDto = {
      ...value,
      token,
      email,
    };

    this.authService.resetPassword(resetPassword).subscribe({
      next: () => {
        this.router.navigateByUrl('/users/login');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.errors instanceof Array) {
          this.backendErrorsSubject.next( err.error.errors);
        }
      },
    });
    console.log(this.validationErrors);
  };
}
