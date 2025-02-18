import { HostListener, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { switchSidennavModeAction } from '../../../Store/actions/sidenav.action';
import { Observable } from 'rxjs';
import { sidenavSelector } from '../../../Store/selectors/sidenav.selector';
import { Card } from '../../../Shared/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private store = inject(Store<StoreInterface>);
  visible$: Observable<boolean> = this.store.select(sidenavSelector);

  changeVisible() {
    this.store.dispatch(switchSidennavModeAction());
  }

  data = [
    {
      icon: 'pi pi-user ',
      title: 'Total Users',
      value: 120,
      url: '',
      bgColor: 'bg-blue-300',
    },
    {
      icon: 'pi pi-user ',
      title: 'Products',
      value: 50,
      url: '',
      bgColor: 'bg-green-300',
    },
    {
      icon: 'pi pi-user ',
      title: 'Orders',
      value: 5,
      url: '',
      bgColor: 'bg-orange-300',
    },
    {
      icon: 'pi pi-user ',
      title: 'Total Sales',
      value: 1000,
      url: '',
      bgColor: 'bg-yellow-300',
    },
  ];

  usersData = [
    {
      name: 'Amin',
      email: 'amin@example.com',
      age: 25,
      phone: '0123456789',
      provider: 'Google',
      role: 'Admin',
      isDeleted: false,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      age: 30,
      phone: '0112233445',
      provider: 'Facebook',
      role: 'User',
      isDeleted: true,
    },
    {
      name: 'Sara',
      email: 'sara@example.com',
      age: 28,
      phone: '0109876543',
      provider: 'Twitter',
      role: 'Moderator',
      isDeleted: false,
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
    ];
  }

  getProductsDataaa() {
    return [
      {
        id: '1026',
        code: 'zx23zc42c',
        name: 'Teal T-Shirt',
        description: 'Product Description',
        image: 'teal-t-shirt.jpg',
        price: 49,
        category: 'Clothing',
        quantity: 3,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
      },
      {
        id: '1027',
        code: 'acvx872gc',
        name: 'Yellow Earbuds',
        description: 'Product Description',
        image: 'yellow-earbuds.jpg',
        price: 89,
        category: 'Electronics',
        quantity: 35,
        inventoryStatus: 'INSTOCK',
        rating: 3,
      },
      {
        id: '1028',
        code: 'tx125ck42',
        name: 'Yoga Mat',
        description: 'Product Description',
        image: 'yoga-mat.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 15,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1029',
        code: 'gwuby345v',
        name: 'Yoga Set',
        description: 'Product Description',
        image: 'yoga-set.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 8,
      },
      {
        id: '1029',
        code: 'gwuby345v',
        name: 'Yoga Set',
        description: 'Product Description',
        image: 'yoga-set.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 8,
      },
    ];
  }
}
