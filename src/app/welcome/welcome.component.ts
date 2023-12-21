import { Component } from '@angular/core';
import { Api } from '../../api';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  providers: [Api]
})


export class WelcomeComponent implements OnInit {
  userData: any;

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.api.getUserData().subscribe(
      (response) => {
        console.log(response.results[0].name)
        this.userData = response.results[0];
        console.log(this.userData)
      },
      (error) => {
        console.error('Ошибка при получении данных из API:', error);
      }
    );
  }
}
