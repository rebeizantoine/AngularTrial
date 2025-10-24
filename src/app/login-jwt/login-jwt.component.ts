import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth123';
@Component({
  selector: 'app-login-token',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-jwt.component.html',
  styleUrls: ['./login-jwt.component.scss'],
})
export class LoginJwtComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  errorMessage: string | null = null;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onLogin() {
    this.errorMessage = null;

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        if (!res) {
          this.errorMessage = 'Invalid email or password!';
          return;
        }

        // Navigate based on role
        const role = this.auth.currentUserRole();
        if (role === 'admin') this.router.navigate(['/admin/dashboard']);
        else this.router.navigate(['/user/dashboard']);
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }

  goToRegister() {
    this.router.navigate(['/register-token']);
  }
}
