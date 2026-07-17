import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  protected readonly title = signal('Dating App');
  protected members = signal<User[]>([]);

  ngOnInit(): void {
    this.http.get<User[]>('https://localhost:7297/api/members').subscribe({
      next: response => {
        this.members.set(response);
        //console.log(this.members());
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Completed the hhtp request.');
      }
    });
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}
