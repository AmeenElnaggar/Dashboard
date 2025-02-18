import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'li[app-menuitem]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menuitem.component.html',
  styleUrl: './menuitem.component.css',
})
export class MenuitemComponent {}
