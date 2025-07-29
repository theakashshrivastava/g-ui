import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const credentials = this.loginForm.value;

  //     this.loginService.login(credentials).subscribe({
  //       next: (response) => {
  //         localStorage.setItem('authToken', response);
  //         this.router.navigate(['/signin']);
  //         // optionally store user role
  //         this.errorMessage = '';
  //         // navigate to protected admin page
  //       },
  //       error: () => {
  //         this.errorMessage = 'Invalid login credentials';
  //       }
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.loginService.login(credentials).subscribe({
        next: (response: string) => {
          // response is the token string
          localStorage.setItem('authToken', response);

          // Decode token to get role
          const payload: any = jwtDecode(response);
          const role = payload.role; // Make sure your JWT includes this claim

          localStorage.setItem('userRole', role);

          // Route based on role
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/addItem']);
          } else {
            // this.router.navigate(['/user']);
            alert("user componet need to create");
          }

          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Invalid login credentials';
        }
      });
    }
  }

}


