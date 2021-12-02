import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private router:Router, private authservice: AuthService) { }

  login(){

    // Ir al backend

    this.authservice.login()
    .subscribe(resp => {
      console.log(resp);

      if(resp.id){
        this.router.navigate(['./heroes'])
      }
    })

    // this.router.navigate(['/heroes'])

  }
}
