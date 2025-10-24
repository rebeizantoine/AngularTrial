import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth123';

@Component({
  selector: 'app-register-token',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register-jwt.component.html',
  styleUrls: ['./register-jwt.component.scss'],
})
export class RegisterTokenComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  message: WritableSignal<string | null> = signal(null);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    role: ['user', Validators.required],
  });

  onRegister() {
    this.message.set(null);
    if (!this.registerForm.valid) {
      this.message.set('Please fill all fields correctly.');
      return;
    }

    const { email, password, role } = this.registerForm.value;
    this.auth.register(email!, password!, role! as 'admin' | 'user').subscribe({
      next: () => {
        this.message.set('User registered successfully!');
        this.registerForm.reset({ role: 'user' });
      },
      error: (err) => this.message.set(err?.message || 'Registration failed'),
    });
  }

  goToLogin() {
    this.router.navigate(['/login-token']);
  }
}
