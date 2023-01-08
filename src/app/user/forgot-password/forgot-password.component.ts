import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
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
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });

  }

  onSubmit() {
    let forgotPasswordDto: ForgotPasswordDto = {
      Email: this.forgotPasswordForm.get('email')?.value,
      ResetPasswordClientURI: 'https://localhost:4200/users/resetPassword',
    };

    this.authService.forgotPasswordRequest(forgotPasswordDto).subscribe({
      error: (err: HttpErrorResponse) =>this.errorMessageSubject.next("Invalid Request")
    });
  }
}
