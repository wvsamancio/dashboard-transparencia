import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ref } from 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  authenticated = false;
  message = 'You are not logged in';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentAuthenticate.subscribe({
      next: (next: any) => {
        this.authenticated = next;
      }
    })

    this.authService.currentMessage.subscribe({
      next: (next: any) => {
        this.message = next;
      }
    })

    this.authService.me().subscribe({
      next: (next: any) => {
        this.authenticated = true;
        this.message = `Welcome ${next.username}`;
      },
      error: (error: any) => {
        this.authenticated = false;
        this.message = 'You are not logged in';
      }
    })
  }

  logout() {
    this.authService.logout().subscribe({
      next: (next: any) => {
        this.authenticated = false;
        this.message = 'You are not logged in';
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  returnHome() {
    this.router.navigate(['/']);
  }
}
