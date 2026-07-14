import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  contactNumber: FormControl<string>;
  isRecruiter: FormControl<boolean>;
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule,TranslatePipe, TranslateDirective],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  registerForm!: FormGroup<RegisterForm>;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      isRecruiter: [false],
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.registerError.set('');
    });
  }

  readonly registerError = signal('');

  onSubmit() {
    this.registerError.set('');

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, password, contactNumber, isRecruiter } = this.registerForm.getRawValue();

    const role = isRecruiter ? 'recruiter' : 'job_seeker';

    const response = this.authService.register({
      name,
      email,
      password,
      contactNumber,
      role,
    });

    if (!response.success) {
      this.registerError.set(response.message);
      return;
    }

    this.router.navigate(['/']);
  }

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  get contactNumber() {
    return this.registerForm.controls.contactNumber;
  }
}
