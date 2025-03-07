import { Component, inject } from '@angular/core';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { SubcategoryUploadComponent } from '../../components/subcategory-upload/subcategory-upload.component';
import { SubcategoryComponent } from '../../components/subcategory/subcategory.component';

@Component({
  selector: 'app-subcategory-page',
  standalone: true,
  imports: [SubcategoryUploadComponent, SubcategoryComponent],
  templateUrl: './subcategory-page.component.html',
  styleUrl: './subcategory-page.component.css',
})
export class SubcategoryPageComponent {
  private navbarService = inject(NavbarService);

  ngOnInit() {
    this.navbarService.navbarTitle.set('Sub Categories');
  }
}
