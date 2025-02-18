import { Component, effect, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ],
    }),
  });

  onSubmit() {}
}
