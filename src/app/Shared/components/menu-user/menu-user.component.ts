import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-menu-user',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './menu-user.component.html',
  styleUrl: './menu-user.component.css',
})
export class MenuUserComponent {}
