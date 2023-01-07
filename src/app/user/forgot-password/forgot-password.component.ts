import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { ForgotPasswordDto } from '../models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
forgotPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['',[Validators.email, Validators.required]]
    })

    this.forgotPasswordForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap(v => console.log(this.forgotPasswordForm.get("email")?.value))
    ).subscribe();
  }

  onSubmit(){

      let forgotPasswordDto: ForgotPasswordDto = {
        Email: this.forgotPasswordForm.get("email")?.value,
        ResetPasswordClientURI: "https://localhost:4200/users/resetPassword"
      }

      this.authService.forgotPasswordRequest(forgotPasswordDto).subscribe();
  }
}
