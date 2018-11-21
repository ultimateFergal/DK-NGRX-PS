import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

/* NgRx */
import { StoreModule, Store, select } from '@ngrx/store';
import { reducer } from './state/user.reducer';

import * as fromUser from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<fromUser.State>, ) {
  }

  ngOnInit(): void {
    // TODO Unsubscribe
    this.store.pipe(select('user')).subscribe(
      maskedUser => { 
        if (maskedUser) {
          // this.maskUserName = maskedUser.maskUserName;
          this.maskUserName = maskedUser.maskUser; // Después del strong tipying
        }
      });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    //this.maskUserName = value;
    this.store.dispatch({
      type: 'TOGGLE_MASK_USER',
      payload: value
    });


  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
