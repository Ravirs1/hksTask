import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm : FormGroup;
  toggle = false;

  constructor(private authService : AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.loginForm = this.formBuilder.group({
        username: ['kminchelle',
          Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          // Validators.email
          // Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|
          // (\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)
          // +[a-zA-Z]{2,}))$/)
        ])
      ],
      
        password: [
          '0lelplR',
            Validators.compose([
            Validators.required,
            Validators.minLength(1)
          ])
        ]
    })

  }

ngOnInit(): void {

}

togglePassword(type : boolean) {
  this.toggle = !type;
}

submit() {
  if(!this.loginForm.valid) {
    alert('please enter valid credential')
  }
 else  {
    this.authService.logIn(this.loginForm.value).subscribe( (res) => {
      if(res.token) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    }, err => {
      alert(err.message)
    })
  }
}

}
