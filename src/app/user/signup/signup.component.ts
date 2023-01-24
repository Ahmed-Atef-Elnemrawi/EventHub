import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { Country, CountryCodes } from 'src/app/shared/models/country-codes';
import { State } from 'src/app/state/state';
import { AuthService } from '../auth.service';
import { signupValidationMessages, UserForRegistrationDto } from '../models';
import { getError } from '../state';
import * as AuthActions from '../state/actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  signUpForm!: FormGroup;
  hidePassword = true;
  hideCard = false;
  hideConfirm = true;
  validator!: GenericValidator;
  filteredCountries$!: Observable<Country[]> | undefined;
  countryCode$!: Observable<Country> | undefined;
  backendError$!: Observable<string>;

  private errorMessageSubject = new Subject<{ [key: string]: string }>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.validator = new GenericValidator(signupValidationMessages);
  }

  ngAfterViewInit(): void {
    this.signUpForm.valueChanges.subscribe(() => {
      this.errorMessageSubject.next(
        this.validator.processMessages(this.signUpForm)
      );
    });

    this.filteredCountries$ = this.signUpForm
      .get('liveIn')
      ?.valueChanges.pipe(
        map((val: string) =>
          CountryCodes.filter((country) =>
            country.name.toLowerCase().startsWith(val)
          )
        )
      );

    this.countryCode$ = this.signUpForm
      .get<string>('liveIn')
      ?.valueChanges.pipe(
        map(
          (val: string) =>
            CountryCodes.filter((c) =>
              c.name.toLowerCase().trim().includes(val.toLowerCase().trim())
            )[0]
        )
      );
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-z]*$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-z]*$/),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[A-z0-9]*$/),
        ],
      ],
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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      phoneGroup: this.fb.group({
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        countryCode: ['+20'],
      }),
      age: [
         0,
        [
          Validators.required,
          Validators.min(11),
          Validators.max(80),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      genre: [' ', [Validators.required]],
      liveIn: ['Egypt', Validators.required],
      roles: [' ', Validators.required],
    });

  }

  onSubmit() {
    if (this.signUpForm && this.signUpForm.valid) {

      const phoneGroup = this.signUpForm.get('phoneGroup');
      const code = phoneGroup?.get('countryCode')?.value;
      const phoneNumber = phoneGroup?.get('phoneNumber')?.value ;
      const roles = this.signUpForm.get('roles')?.value;

      let userForRegistrationDto: UserForRegistrationDto = {
        ...this.signUpForm.value,
        genre: +this.signUpForm.get('genre')?.value,
        roles: (roles !== ' ')? [roles]:[],
        phoneNumber: code + phoneNumber,
      };

     this.store.dispatch(AuthActions.signup({user: userForRegistrationDto}))
     this.backendError$ = this.store.select(getError);
    }
  }


}
