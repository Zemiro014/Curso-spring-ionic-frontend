import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CINFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_User";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService
{
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) { }

    authentication(creds : CredenciaisDTO)
    {
        return this.http.post(
            `${API_CINFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken()
    {
        return this.http.post(
            `${API_CINFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string)
    {
        let tok = authorizationValue.substring(6);
        let user : LocalUser = {
           token: tok,
           email: this.jwtHelper.decodeToken(tok).sub
       };

       this.storage.setLocalUser(user);
    }

    logout()
    {
        this.storage.setLocalUser(null);
    }
}