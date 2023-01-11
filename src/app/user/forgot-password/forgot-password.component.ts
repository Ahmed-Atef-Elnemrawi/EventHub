import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validators';
import { AuthService } from '../auth.service';
import { ForgotPasswordDto } from '../models';

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
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // this.validator = new GenericValidator()
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

    this.authService.forgotPasswordRequest(forgotPasswordDto).subscribe({
      error: (err: HttpErrorResponse) => {
        if (err.status === 400)
          this.errorMessageSubject.next(
            'Email Address is not associated with an EventHub Account'
          );
      },
    });
  }
}
