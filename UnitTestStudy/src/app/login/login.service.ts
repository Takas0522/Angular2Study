import { Injectable } from '@angular/core';

import { LoginUser } from './LoginUser'

@Injectable()
export class LoginService {
    changeLowerCase(loginUser: LoginUser): LoginUser {
        return {
            userId: loginUser.userId.toLowerCase(),
            password: loginUser.password.toLowerCase()
        }
    }
}
