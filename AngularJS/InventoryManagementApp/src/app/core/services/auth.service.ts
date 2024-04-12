import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fetchUserUrl: string = environment.baseUrl + environment.fetchUsers;

  constructor(private http: HttpClient) { }

  fetchUser() {
    return this.http.get(this.fetchUserUrl);
  }

  fetchUserById(id: any) {
    return this.http.get(this.fetchUserUrl + '/' + id);
  }

  createUser(newUser: any) {
    return this.http.post(this.fetchUserUrl, newUser);
  }

  updateUser(id: any, newUser: any) {
    return this.http.put(this.fetchUserUrl + '/' + id, newUser);
  }

  deleteUser(id: any) {
    return this.http.delete(this.fetchUserUrl + '/' + id);
  }
}
