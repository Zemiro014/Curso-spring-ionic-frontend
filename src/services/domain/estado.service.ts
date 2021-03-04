import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CINFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";

/*
    O "@Injectable()" permite que essa classe seja um serviço que possa ser injectando  em outras classes
*/
@Injectable()  
export class EstadoService
{

    // Constructor que recebe HttpClient
    constructor(public http: HttpClient) { } 

    /* 
        O "findAll" é o método responsável em enviar a requisição GET para o "API back" e retornar uma lista de categorias do tipo "CategoriaDTO" para minha "API front"

        O "Observable" permite fazer uma requisição e aguardar a resposta 
     */
    findAll() : Observable<EstadoDTO[]>
    {
       return this.http.get<EstadoDTO[]>(`${API_CINFIG.baseUrl}/estados`);
    }
}