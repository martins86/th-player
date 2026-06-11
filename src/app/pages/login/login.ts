import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '@shared/interfaces/login.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup<ILogin>;

  constructor() {
    this.loadForm();
  }

  loadForm(): void {
    this.loginForm = new FormGroup({
      link: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
