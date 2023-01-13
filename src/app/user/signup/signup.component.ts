import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
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
  validator!: GenericValidator;

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
      phoneNumber: ['', [Validators.required]],
      age: [0, [Validators.required]],
      genre: [0, [Validators.required]],
      liveIn: ['', Validators.required],
      roles: ['', Validators.required],
    });

    this.signUpForm.setValue({
      firstName: 'ahmed',
      lastName: 'atef',
      userName: 'ahmed-atef',
      password: 'Osource23',
      email: 'ah.at.elnemrawi@gmail.com',
      phoneNumber: '+2012432425333',
      age: 10,
      genre: 1,
      liveIn: 'egypt',
      roles: ' ',
    });
  }

  onSubmit() {
    if (this.signUpForm && this.signUpForm.valid) {
      let userForRegistrationDto: UserForRegistrationDto = {
        ...this.signUpForm.value,
        genre: +this.signUpForm.get('genre')?.value,
        roles: [this.signUpForm.get('roles')?.value],
      };

      console.log(userForRegistrationDto);
      console.log(userForRegistrationDto.roles);

      this.authService.registerUser(userForRegistrationDto).subscribe({});
    }
  }
}
