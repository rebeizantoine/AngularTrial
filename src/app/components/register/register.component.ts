import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registeredUsers: WritableSignal<User[]> = signal(this.loadUsers());
  message: WritableSignal<string | null> = signal('');

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    role: ['user', Validators.required],
  });

  // ✅ Load from localStorage
  loadUsers(): User[] {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  // ✅ Save to localStorage
  saveUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  onRegister() {
    this.message.set(null);

    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;

      const users = this.registeredUsers();
      let exists = false;

      for (const user of users) {
        if (user.email === email) {
          exists = true;
          break;
        }
      }

      if (exists) {
        this.message.set('User with this email already exists!');
        return;
      }

      //By writing email!, you’re saying:“I’m 100% sure it’s a string — don’t complain.”
      const newUser: User = {
        email: email!,
        password: password!,
        role: role! as 'admin' | 'user',
      };

      const updated = [...users, newUser];
      this.registeredUsers.set(updated);
      this.saveUsers(updated); // ✅ store in "users.json" (localStorage)

      this.message.set('User registered successfully!');
      this.registerForm.reset({ role: 'user' });
    } else {
      this.message.set('Please fill all fields correctly.');
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
