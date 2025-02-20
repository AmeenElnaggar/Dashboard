import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyleClass } from 'primeng/styleclass';

@Component({
  selector: 'app-sidenav-body',
  standalone: true,
  imports: [RouterLink, StyleClass],
  templateUrl: './sidenav-body.component.html',
  styleUrl: './sidenav-body.component.css',
})
export class SidenavBodyComponent {}
