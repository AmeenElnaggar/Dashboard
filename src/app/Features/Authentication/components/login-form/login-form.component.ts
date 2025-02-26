import { Component, effect, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map, Observable } from 'rxjs';
import { AuthData } from '../../model/authdata.model';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { AsyncPipe } from '@angular/common';
import { SpinnerService } from '../../../../Shared/services/spinner.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, SpinnerComponent, AsyncPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private spinnerService = inject(SpinnerService);

  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
  isError$: Observable<any> = this.authService.authData$.pipe(
    filter((response: any) => response?.error),
    map((response: any) => {
      return response?.error;
    })
  );

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
        Validators.minLength(1),
        Validators.maxLength(30),
      ],
    }),
  });

  onSubmit() {
    this.authService.submitLogin({
      email: this.myForm.value.email!,
      password: this.myForm.value.password!,
    });
  }
}
