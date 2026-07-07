import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private auth = inject(Auth)

  private router = inject(Router);

  loginForm = new FormGroup({

  username: new FormControl('', [
    Validators.required
  ]),

  password: new FormControl('', [
    Validators.required
  ])

  });

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }

    const { username, password } = this.loginForm.value;

    this.auth.login(
      username!,
      password!
    )

    .subscribe({
    next: () => {

    if(this.auth.isAuthenticated()) {
      
      this.router.navigate(['/']);
    }

    },

      error: (error) => {
        console.log('Erreur connexion');
        console.log(error);
      }

    });
  }
  
}
