import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // getUsers(): Observable<any> {
  //   return this.http.get('http://localhost:3000/users')
  // }

  // addUser(ev): Observable<Object> {
  //   return this.http.post('http://localhost:3000/users',
  //     {
  //       firstName: ev.firstName.value,
  //       lastname: ev.lastname.value,
  //       email: ev.email.value,
  //       age: ev.age.value,
  //       companyId: ev.companyId.value
  //     },
  //     httpOptions)
  // }

  getData(): Observable<any> {
      return this.http.get('/read')
    }

}
