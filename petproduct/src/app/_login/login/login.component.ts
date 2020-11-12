import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errormessage = "";

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    //rset login status
    this.authenticService.logout();
  }
  // Getters for easy access to form fields
  get username() {return this.loginForm.get('username');}
  get password() {return this.loginForm.get('password');}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.authenticService.login(this.username.value, this.password.value).subscribe(
      success => {
        this.router.navigate(['/']);
      },
      error => {
        this.errormessage = error.message;
        this.loading = false;
      });

  }
}
