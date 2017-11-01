import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account-service/account.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AccountService]
})

export class LogInComponent implements OnInit {

  constructor(private AccountService: AccountService) { }

  ngOnInit() {
  }

  option = true;
  login = false;
  signup = false;
  loggedin = false;

  onSignup() {
    this.loggedin = true;
    this.option = false;
    this.login = false;
    this.signup = false;
  }

  onSignin  (email: string, password: string) {
    // const email = await this.AccountService.login(email, password)
    //  asycnthis.AccountService.login(email, password)
    // this.loggedin = true;
    // this.option = false;
    // this.login = false;
    // this.signup = false;
  }


  buttonClick1() {
    this.option = false;
    this.login = true;
    this.signup = false;
  }

  buttonClick2() {
    this.option = false;
    this.signup = true;
    this.login = false;
  }


}
