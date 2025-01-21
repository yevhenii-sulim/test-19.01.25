import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from './types/userType';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get<UserType[]>('/users.json');
  }
}
