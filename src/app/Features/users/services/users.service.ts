import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { fetchAllUsersAction } from '../../../Store/actions/users.action';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private store = inject(Store<StoreInterface>);

  fetchAllUsers() {
    this.store.dispatch(fetchAllUsersAction());
  }

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
}
