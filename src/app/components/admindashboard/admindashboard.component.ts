import { Component, inject } from '@angular/core'; // <-- Import inject
import { AuthService } from '../../services/auth123'; // <-- Import AuthService
import { RouterModule } from '@angular/router'; // Assuming RouterModule is needed for <a routerLink>

@Component({
  selector: 'app-admindashboard',
  standalone: true, // Crucial for using 'inject' in this way
  imports: [RouterModule], // Add necessary imports like RouterModule
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss',
})
export class AdmindashboardComponent {
  // FIX: Use inject() to initialize the public property 'authService'
  // This makes the service instance available in the HTML template.
  public authService = inject(AuthService);

  // The rest of the class can be empty or contain other logic
}
