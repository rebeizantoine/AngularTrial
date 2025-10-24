import { Routes } from '@angular/router';

// Guards
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

// Components
import { LoginComponent } from './components/login-hh/login-hh.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UnauthorisedComponent } from './components/unauthorised/unauthorised.component';

// JWT Components
import { LoginJwtComponent } from './login-jwt/login-jwt.component';
import { RegisterTokenComponent } from './components/register-jwt/register-jwt.component';

//API Components
import { RegisterApiComponent } from './components/registerapi/registerapi.component';
import { LoginApiComponent } from './components/loginapi/loginapi.component';

export const routes: Routes = [
  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // JWT Public Routes
  { path: 'login-token', component: LoginJwtComponent },
  { path: 'register-token', component: RegisterTokenComponent },

  // API Public Routes
  { path: 'loginapi', component: LoginApiComponent },
  { path: 'registerapi', component: RegisterApiComponent },
  {
    path: 'unauthorized',
    component: UnauthorisedComponent,
    // Simple template: <h1>🚫 Access Denied</h1><a routerLink="/login">Go to Login</a>
  },

  // PROTECTED ROUTES: User Dashboard
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  // PROTECTED ROUTES: Admin Dashboard
  {
    path: 'admin/dashboard',
    component: AdmindashboardComponent,
    canActivate: [authGuard, adminGuard],
  },

  // Default Routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  // 404/Wildcard route
  { path: '**', redirectTo: 'user/dashboard' },
];
