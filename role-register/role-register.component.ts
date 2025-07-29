import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationService } from '../services/registration.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-role-register',
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './role-register.component.html',
  styleUrl: './role-register.component.css'
})
export class RoleRegisterComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegistrationService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // 'ADMIN' or 'USER'
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.registerService.registerUser(formData).subscribe({
        next: () => alert('User registered successfully!'),
        error: () => alert('Registration failed!')
      });
    }
  }

  openDialog(title: string, message: string, status: string) {
    // this.dialog.open(MessageDialogComponent, {
    //   data: { title, message }
    // });
  }


}
