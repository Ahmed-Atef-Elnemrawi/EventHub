import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { Country, CountryCodes } from 'src/app/shared/models/country-codes';
import { AuthService } from '../auth.service';
import { signupValidationMessages, UserForRegistrationDto } from '../models';

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

  private errorMessageSubject = new Subject<{ [key: string]: string }>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private authService: AuthService, private fb: FormBuilder) {
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
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        countryCode: ['+20'],
      }),
      age: [0, [Validators.required, Validators.min(11)]],
      genre: [' ', [Validators.required]],
      liveIn: ['Egypt', Validators.required],
      roles: [' ', Validators.required],
    });


  }

  onSubmit() {
    if (this.signUpForm && this.signUpForm.valid) {

      const phoneGroup = this.signUpForm.get("phoneGroup");
      const code = phoneGroup?.get('countryCode')?.value as string;
      const phoneNumber = phoneGroup?.get("phoneNumber")?.value as string;

      let userForRegistrationDto: UserForRegistrationDto = {
        ...this.signUpForm.value,
        genre: +this.signUpForm.get('genre')?.value,
        roles: [this.signUpForm.get('roles')?.value],
        phoneNumber: code.slice(1)+phoneNumber
      };


      this.authService.registerUser(userForRegistrationDto).subscribe({});
    }
  }
}
