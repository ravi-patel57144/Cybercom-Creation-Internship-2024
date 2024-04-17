import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fetchUserUrl: string = environment.baseUrl + environment.userUrl;

  constructor(private http: HttpClient) {}

  fetchUser() {
    return this.http.get(this.fetchUserUrl);
  }

  fetchUserById(id: number) {
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
