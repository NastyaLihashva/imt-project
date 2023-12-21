import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
export const routes: Routes = [
    { path: '', component: RegistrationFormComponent },
    { path: 'welcome', component: WelcomeComponent },
];
