import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Mail!: string;
  MotDePasse!: string;

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.Mail, this.MotDePasse).subscribe(
      response => {
        console.log(response); // Faites quelque chose avec la réponse
      },
      error => {
        console.error(error); // Gérez les erreurs ici
      }
    );
  }
}
