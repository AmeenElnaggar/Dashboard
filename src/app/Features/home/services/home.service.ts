import { inject, Injectable } from '@angular/core';
import { NavbarService } from '../../../Shared/services/navbar.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private navbarService = inject(NavbarService);

  overviewData = [
    {
      icon: 'pi pi-user ',
      title: 'Total Users',
      value: 120,
      url: 'allusers',
    },
    {
      icon: 'pi pi-objects-column',
      title: 'Products',
      value: 50,
      url: '',
    },
    {
      icon: 'pi pi-cart-arrow-down ',
      title: 'Orders',
      value: 5,
      url: '',
    },
    {
      icon: 'pi pi-wallet ',
      title: 'Total Sales',
      value: 1000,
      url: '',
    },
  ];

  getProductsData() {
    return [
      {
        user: 'Ameen',
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        user: 'Sayed',

        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
      },
      {
        user: 'Ahmed',

        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
      },
      {
        user: 'Mohamed',

        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        user: 'Ali',
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        user: 'Ali',
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
    ].slice(0, 5)
  }
}
