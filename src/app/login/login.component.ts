import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm?: any;

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  error = undefined


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submit(): Promise<void> {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const isConnected = await this.authService.login(username, password);
       // Call the authentication service's login method
       if (isConnected) {
        // Navigate to the ProductListComponent upon successful login
        this.router.navigate(['/dashboard/sessions']);
      } else {
        // Handle authentication error (show error message, etc.)
      }

    }
  }
}