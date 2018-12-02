import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User, UserType } from '../_models/user';

@Injectable()
export class AuthenticationService {

    public sessionData;

    constructor(private http: HttpClient) {
        this.sessionData = localStorage.getItem('currentUser');
    }

    login(username: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isSignin (): boolean {
        const userSession = localStorage.getItem( 'currentUser' );
        const sessionData = JSON.parse( userSession );
        if ( sessionData.token === 'fake-jwt-token' ) {
            return true;
        }
        return false;
    }

    getSessionData <array>() {
        const sessionData = localStorage.getItem( 'currentUser' );
        const jsonData = JSON.parse( sessionData );
        jsonData.typeName = UserType[jsonData.type].toLocaleLowerCase();
        return jsonData;
    }
}
