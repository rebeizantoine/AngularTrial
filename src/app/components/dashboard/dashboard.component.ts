import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth123';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public authService = inject(AuthService);
}
