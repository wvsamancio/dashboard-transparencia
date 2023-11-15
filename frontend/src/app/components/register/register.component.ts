import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder, private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe({
      next: (next) => {
        this.router.navigate(['/login'])
      }
    })
  }
}
