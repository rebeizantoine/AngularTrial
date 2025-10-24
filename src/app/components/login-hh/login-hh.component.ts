import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-hh.component.html',
  styleUrls: ['./login-hh.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  errorMessage: string | null = null; // ✅ Error message property

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  // Load users from localStorage
  loadUsers(): User[] {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  // Login method
  onLogin() {
    this.errorMessage = null; // Reset previous error

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const users = this.loadUsers();

      let foundUser: User | null = null;

      for (const user of users) {
        if (user.email === email && user.password === password) {
          foundUser = user;
          break;
        }
      }
      if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        if (foundUser.role === 'admin') {
          alert('we are ready to go in');
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      } else {
        this.errorMessage = 'Invalid email or password!'; // ❌ Set error message
      }
    } else {
      this.errorMessage = 'Please fill all fields correctly.'; // ❌ Set error message
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
