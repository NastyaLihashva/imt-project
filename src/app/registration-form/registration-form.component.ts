import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../api';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
  providers: [Api]
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  displayErrors: boolean = false;
  isSecondStep: boolean = false;
  userEmail: string = '';
  isThirdStep: boolean = false;

  constructor(private fb: FormBuilder, private api: Api, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/[a-zA-Z0-9]+/)]],
      verificationCode: ['']
    });
  }

  ngOnInit() {
    this.api.getUserData().subscribe(
      (response) => {
        this.api.saveUserData(response.results[0]);
        console.log(this.api.getUserData());
      },
      (error) => {
        this.displayErrors = true;
        console.error('Ошибка при получении данных из API:', error);
      }
    );
  }
  generatedCode = this.generateVerificationCode();
  
  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.api.getUserData();
      if (userData && this.matchUserData(userData)) {

        console.log(this.generatedCode);
        if (this.isSecondStep) {
          const enteredCode = this.registrationForm.get('verificationCode')?.value;
          if (enteredCode === this.generatedCode) {
            this.isThirdStep = true;
            this.router.navigate(['/welcome']);
          } else {
            this.displayErrors = true;
            console.log('Неверный код подтверждения.');
            this.generatedCode = this.generateVerificationCode();
            console.log(this.generatedCode);
          }
        } else {
          this.isSecondStep = true;
          this.userEmail = this.registrationForm.get('email')?.value;
          this.registrationForm.addControl('verificationCode', this.fb.control('', Validators.required));
        }
      } else {
        this.displayErrors = true;
        console.log('Данные из API не совпадают с введенными данными.');
      }
    } else {
      this.displayErrors = true;
      console.log('Форма невалидна.');
    }
  }

  matchUserData(data: any): boolean {
    const formData = this.registrationForm.value;
    return data.email === formData.email && data.login.password === formData.password;
  }

  generateVerificationCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
