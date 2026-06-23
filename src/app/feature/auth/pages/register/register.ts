import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  constructor(
    private registerFormBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {}

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.registerFormBuilder.nonNullable.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      isRecruiter: [false],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.getRawValue();

    const role = formData.isRecruiter ? 'recruiter' : 'job_seeker';

    const response = this.authService.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contactNumber: formData.contactNumber,
      role,
    });

    if (!response.success) {
      console.log(response.message);
      return;
    }

    this.router.navigate(['/']);
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get contactNumber() {
    return this.registerForm.get('contactNumber');
  }
}
