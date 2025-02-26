import { Component, inject, signal } from '@angular/core';
import { UploadComponent } from '../../../../Shared/components/upload/upload.component';
import { UploadedImages } from '../../../../Shared/models/uploadedImages.model';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { NgClass } from '@angular/common';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-subcategory-upload',
  standalone: true,
  imports: [UploadComponent, FormsModule, Select, NgClass],
  templateUrl: './subcategory-upload.component.html',
  styleUrl: './subcategory-upload.component.css',
})
export class SubcategoryUploadComponent {
  private categoryService = inject(CategoryService);
  enteredName = signal<string>('');
  cities: City[] | undefined;

  selectedCity: '' | undefined;
  onUploadCategory(event: { imagesData: UploadedImages }) {
    const { images } = event.imagesData;
    this.categoryService.createCategory({
      image: images[0],
      name: this.enteredName(),
    });
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
