import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURL+"/api/usuarios";
  tokenURL: string = environment.apiURL + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
  ) {  }
salvar( usuario: Usuario) : Observable<any>{
  return this.http.post<any>(this.apiURL, usuario);
}

obterToken(){
  const tokenString = localStorage.getItem('access_token');
  console.log(tokenString);
  if(tokenString){
    const token = JSON.parse(tokenString).access_token
    return token;
  }
  return null;
}

encerrarSessao(){
  localStorage.removeItem('access_token')
}

getUsuarioAutenticado(){
  const token = this.obterToken();
  if(token){
    const usuario = this.jwtHelper.decodeToken(token).user_name;
    return usuario;
  }
  return null;
}

isAuthenticated() : boolean {
  const token = this.obterToken();
  if( token){
    const expirated = this.jwtHelper.isTokenExpired(token)
    return !expirated;
  }
return false;
}

tentarLogar(username: string, password: string) : Observable<any>{
  const params = new HttpParams()
                      .set('username', username )
                      .set('password', password)
                      .set('grant_type', 'password');
  const headers = {
    'Authorization': 'Basic '+btoa(`${ this.clientId}:${this.clientSecret}`),
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
  return this.http.post(this.tokenURL, params.toString(), { headers })
}

}
