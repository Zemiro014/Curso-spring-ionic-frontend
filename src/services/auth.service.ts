import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CINFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_User";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService
{
    constructor(public http: HttpClient, public storage: StorageService)
    {

    }
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

    successfulLogin(authorizationValue: string)
    {
        let tok = authorizationValue.substring(6);
        let user : LocalUser = {
           token: tok
       };

       this.storage.setLocalUser(user);
    }

    logout()
    {
        this.storage.setLocalUser(null);
    }
}