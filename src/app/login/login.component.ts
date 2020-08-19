import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario'
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String [];

  constructor(
    private router: Router,
    private authService: AuthService,

  ) { }
  
  onSubmit(){
    this.authService.tentarLogar(this.username, this.password)
                .subscribe(resposta =>{
                  console.log('aaaaaaa');
                  const acess_token = JSON.stringify(resposta);
                  localStorage.setItem('access_token', acess_token)
                  this.router.navigate(['/home'])
                }, errorResposta => {
                  this.errors = ['usuario ou senha incorreto']
                })
   } 
  
  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelarCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe( resposta => {
      this.mensagemSucesso = "cadastro realizado com sucesso"
      this.cadastrando = false;
      this.username = '';
      this.password = '';
      this.errors = [];
    }, errorResposta => {
      this.mensagemSucesso = null;
      this.errors = errorResposta.error.errors;
    }
      )
  }

}
