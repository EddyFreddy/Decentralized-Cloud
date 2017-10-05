import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  login(email: string, password: string) {
        return this.http.post('http://localhost:4000/signin', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {

                let email = response.json();

                    localStorage.setItem('currentUser', JSON.stringify(email));

                return email.user;
            });
    }

    logout() {

        localStorage.removeItem('currentUser');
    }
}
