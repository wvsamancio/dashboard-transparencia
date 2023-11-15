import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (next: any) => {
        this.authService.token = next.token;
        this.authService.changeMessage(`Welcome ${next.user.name}`);
        this.authService.changeAuthenticateStatus(true);
        this.router.navigate(['/'])
      }
    })
  }

}
