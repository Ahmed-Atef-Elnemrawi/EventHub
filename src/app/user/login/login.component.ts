import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, fromEvent, merge, Observable, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { AuthService } from '../auth.service';
import { UserForAuthDto } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren('FromControlName') FormInputElements!: ElementRef[];
  private errorMessageSubject$ = new Subject<{ [key: string]: string }>();
  errorMessage$ = this.errorMessageSubject$.asObservable();

  userCredentials!: UserForAuthDto;
  genericValidator!: GenericValidator;
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  AuthValidationMessages = {
    email: {
      required: 'email is required',
    },

    password: {
      required: 'password is required',
    },
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.genericValidator = new GenericValidator(this.AuthValidationMessages);
  }

  ngAfterViewInit(): void {
    const inputBlurs$: Observable<any>[] = this.FormInputElements.map(
      (control) => fromEvent(control.nativeElement, 'blur')
    );

    merge(inputBlurs$, this.loginForm.valueChanges)
      .pipe(debounceTime(500))
      .subscribe(() =>
        this.errorMessageSubject$.next(
          this.genericValidator.processMessages(this.loginForm)
        )
      );
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    let values = this.loginForm.value;
    this.userCredentials = { ...values } as UserForAuthDto;

    this.authService.login(this.userCredentials).subscribe({
      next: (value) => localStorage.setItem('token', JSON.stringify(value)),
      error: (err) => {
        if (err.status === 400 || err.status === 401) {
          this.errorMessageSubject$.next({
            badRequest: 'Invalid Email or Password',
          });
        }
      },
    });
  }
}

