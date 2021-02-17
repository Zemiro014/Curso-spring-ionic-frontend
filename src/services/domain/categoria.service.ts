import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CINFIG } from "../../config/api.config";
import { categoriaDTO } from "../../models/categoria.dto";

@Injectable()
export class CategoriaService
{
    constructor(public http: HttpClient)
    {

    }

    findAll() : Observable<categoriaDTO[]>
    {
       return this.http.get<categoriaDTO[]>(`${API_CINFIG.baseUrl}/categorias`);
    }
}