import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyleClass } from 'primeng/styleclass';
import { AuthService } from '../../../Features/Authentication/services/auth.service';

@Component({
  selector: 'app-sidenav-body',
  standalone: true,
  imports: [RouterLink, StyleClass],
  templateUrl: './sidenav-body.component.html',
  styleUrl: './sidenav-body.component.css',
})
export class SidenavBodyComponent {
  private authService = inject(AuthService);

  onSubmitLogout() {
    this.authService.submitLogout();
  }
}
