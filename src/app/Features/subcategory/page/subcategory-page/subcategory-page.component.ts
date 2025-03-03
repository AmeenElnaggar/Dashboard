import { Component, inject } from '@angular/core';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { SubcategoryUploadComponent } from '../../components/subcategory-upload/subcategory-upload.component';
import { SubcategoryComponent } from '../../components/subcategory/subcategory.component';
import { CategoryService } from '../../../category/service/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subcategory-page',
  standalone: true,
  imports: [SubcategoryUploadComponent, SubcategoryComponent],
  templateUrl: './subcategory-page.component.html',
  styleUrl: './subcategory-page.component.css',
})
export class SubcategoryPageComponent {
  private navbarService = inject(NavbarService);
  private categoryService = inject(CategoryService);

  ngOnInit() {
    this.navbarService.navbarTitle.set('Sub Categories');
    this.categoryService.fetchAllCategoriesData('9999', '');
  }
}
