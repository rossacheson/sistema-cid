import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword ? null : {passwordMismatch: true};
};

class DirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const formSubmitted = form && form.submitted;
    return !!(control && form?.invalid && (control.dirty || control.touched || formSubmitted));
  }
}

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrarseComponent {
  authService = inject(AuthService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, [passwordMatchValidator]);
  confirmPasswordMatcher = new DirtyErrorStateMatcher();
  confirmationForm: FormGroup = new FormGroup({
    confirmationCode: new FormControl('', [Validators.required]),
  });

  isLoading = false;
  step: 'register' | 'confirm' = 'register';
  newUserEmail?: string;
  newUserPassword?: string;

  onRegistrationSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      const {email, password} = this.registrationForm.value;
      this.authService.register(email, password).subscribe({
        next: () => {
          this.newUserEmail = email;
          this.newUserPassword = password;
          this.step = 'confirm';
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => alert('problem signing up'),
      });
    }
  }

  onConfirmationSubmit() {
    if (this.confirmationForm.valid) {
      this.isLoading = true;
      const {confirmationCode} = this.confirmationForm.value;
      this.authService.confirmAccount(this.newUserEmail!, confirmationCode)
        .pipe(
          switchMap(() => this.authService.login(this.newUserEmail!, this.newUserPassword!))
        )
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['bienvenido']);
          },
          error: () => alert('problem confirming'),
        });
    }
  }
}
