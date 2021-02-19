import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CINFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService
{
    constructor(public http: HttpClient)
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
}