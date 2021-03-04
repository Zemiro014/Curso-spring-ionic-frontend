import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CINFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";

/*
    O "@Injectable()" permite que essa classe seja um serviço que possa ser injectando  em outras classes
*/
@Injectable()  
export class CidadeService
{

    // Constructor que recebe HttpClient
    constructor(public http: HttpClient) { } 

    /* 
        O "findAll" é o método responsável em enviar a requisição GET para o "API back" e retornar uma lista de categorias do tipo "CategoriaDTO" para minha "API front"

        O "Observable" permite fazer uma requisição e aguardar a resposta 
     */
    findAll(estado_id: string) : Observable<CidadeDTO[]>
    {
       return this.http.get<CidadeDTO[]>(`${API_CINFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}