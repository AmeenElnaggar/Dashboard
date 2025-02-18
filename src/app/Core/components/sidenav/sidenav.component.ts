import {
  Component,
  effect,
  HostListener,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { MenuitemComponent } from '../../../Shared/components/menu-item/menuitem.component';
import { MenuUserComponent } from '../../../Shared/components/menu-user/menu-user.component';
import { HomeService } from '../../../Features/home/services/home.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    DrawerModule,
    ButtonModule,
    AvatarModule,
    SelectModule,
    MenuitemComponent,
    MenuUserComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  private homeService = inject(HomeService);

  visible: boolean = false;

  ngOnInit() {
    this.homeService.visible$.subscribe(
      (response: boolean) => (this.visible = response)
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.visible) {
        this.homeService.changeVisible();
      }
    }
  }
}

/*
import {
  Component,
  effect,
  HostListener,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { MenuitemComponent } from '../../../Shared/components/menu-item/menuitem.component';
import { MenuUserComponent } from '../../../Shared/components/menu-user/menu-user.component';
import { HomeService } from '../../../Features/home/services/home.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    DrawerModule,
    ButtonModule,
    AvatarModule,
    SelectModule,
    MenuitemComponent,
    MenuUserComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  private homeService = inject(HomeService);

  visible: boolean = true;

  ngOnInit() {
    this.homeService.visible$.subscribe(
      (response: boolean) => (this.visible = response)
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.visible) {
        this.homeService.changeVisible();
      }
    }
  }
}

*/
