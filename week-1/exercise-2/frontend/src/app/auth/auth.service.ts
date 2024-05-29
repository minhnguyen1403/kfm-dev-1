import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import UserEntity from '../user/user.entity';

@Injectable({ providedIn: 'root' })
export default class AuthService {
    private userSubject: BehaviorSubject<UserEntity | null>;
    public user: Observable<UserEntity | null>;

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http
            .post<UserEntity>(`http://localhost:3005/v1/users/login`, { username, password })
            .pipe(
                map((user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                })
            );
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    register(user: UserEntity) {
        return this.http.post(`http://localhost:3005/v1/users/register`, user);
    }

    get isAuth() {
        return !!localStorage.getItem('user');
    }
}
