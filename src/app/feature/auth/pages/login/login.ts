import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth-service';

type LoginFormValues = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(
    private loginFormBuilder: FormBuilder,
    private authService: AuthService,
     private router: Router
  ) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.loginFormBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {email,password}: LoginFormValues = this.loginForm.getRawValue();

    const response = this.authService.login(email,password)

    if(!response.success){
      console.log(response.message);
      return
    }
    this.router.navigate(['/']);
    
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
