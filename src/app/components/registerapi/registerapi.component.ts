import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface RegisterResponse {
  token: string;
  user?: { email: string; role: 'user' | 'admin' };
}

@Component({
  selector: 'app-register-api',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './registerapi.component.html',
  styleUrls: ['./registerapi.component.scss'],
})
export class RegisterApiComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required],
  });

  errorMessage = '';
  successMessage = '';
  roles = ['user', 'admin'];

  register() {
    if (this.registerForm.invalid) return;

    const payload = this.registerForm.value;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post<RegisterResponse>('http://localhost:3000/api/auth/register', payload).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful! Redirecting...';
        localStorage.setItem('token', res.token);
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }

  message() {
    return this.successMessage || this.errorMessage;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
