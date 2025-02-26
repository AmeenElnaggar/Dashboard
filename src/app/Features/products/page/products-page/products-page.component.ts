import { Component, inject } from '@angular/core';
import { ProductsTableComponent } from '../../component/products-table/products-table.component';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { AuthService } from '../../../Authentication/services/auth.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductsTableComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  private navbarService = inject(NavbarService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.isAuthenticated();
    this.navbarService.changeNavbarTitle('Products');
  }
}
