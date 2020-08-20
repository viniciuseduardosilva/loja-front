import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { ClienteDto } from './login/clienteDto';

@Injectable({
  providedIn: 'root'
})
export class ClienteDtoService {

  apiURL: string = environment.apiURL+"/api/usuarios";

  constructor(
    private http: HttpClient
  ) { }

  cadastrar( clienteDto: ClienteDto) : Observable<any>{
    return this.http.post<any>(this.apiURL, clienteDto);
  }

}
