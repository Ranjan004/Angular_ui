import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { loginId: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  userLogin() {
    this.userService.loginUser(this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/parking/f5b0fc9f-ddde-4c3a-a25f-9ef679660db7']);
      },
      (error) => {
        console.error('Login failed:', error.error || error.message);
        alert('Login failed! Please check your credentials.');
      }
    );
  }
}
