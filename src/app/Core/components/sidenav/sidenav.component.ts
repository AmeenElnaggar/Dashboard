import {
  Component,
  HostListener,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';

import { SidenavBodyComponent } from '../../../Shared/components/sidenav-body/sidenav-body.component';
import { SidenavFooterComponent } from '../../../Shared/components/sidenav-footer/sidenav-footer.component';
import { NavbarService } from '../../../Shared/services/navbar.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    DrawerModule,
    ButtonModule,
    AvatarModule,
    SelectModule,
    SidenavBodyComponent,
    SidenavFooterComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  private navbarService = inject(NavbarService);

  visible: boolean = false;

  ngOnInit() {
    this.navbarService.visible$.subscribe(
      (response: boolean) => (this.visible = response)
    );
  }

  handleDrawerClose() {
    this.navbarService.changeVisible();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.visible) {
        this.navbarService.changeVisible();
      }
    }
  }
}
