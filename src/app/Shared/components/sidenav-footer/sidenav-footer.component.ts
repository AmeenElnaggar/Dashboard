import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-sidenav-footer',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './sidenav-footer.component.html',
  styleUrl: './sidenav-footer.component.css',
})
export class SidenavFooterComponent {}
