import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  sendEmail(email, url): Observable<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('http://localhost:1337/signin', JSON.stringify({ "email": email, "redirect": url }), { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          return res.message;
        } else {
          return res.message;
        }
      });
  }

  sendUserForm(email, password, username, company, idUrl): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('http://localhost:1337/confirm', JSON.stringify({ "email": email, "password": password, "username": username, "company": company, 'idUrl': idUrl }),
      { headers })
      .map((response: Response) => {

        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      });
  }

  login(email, password): Observable<boolean> {
    return this.http.post('http://localhost:1337/login', JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
        console.log(response);
        let token = response.json() && response.json().token;
        if (token) {

          this.token = token.token;
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
  checkEmail(id) {
    return this.http.post('http://localhost:1337/checkID', JSON.stringify({"ID": id }))
      .map((response: Response) => {

        let email = response.json() && response.json().email;
        if (email) {
          return email;
        } else {
          return response.json().error;
        }
      });
  }
}
