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

  usermane: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: string [];

  constructor(
    private router: Router,
    private authService: AuthService,

  ) { }
  
  onSubmit(){
    this.authService.tentarLogar(this.usermane, this.password)
                .subscribe(resposta =>{
                  const acess_token = JSON.stringify(resposta);
                  localStorage.setItem('acess_token', acess_token)
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
    usuario.username = this.usermane;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe( resposta => {
      this.mensagemSucesso = "cadastro realizado com sucesso"
      this.loginError = false;
    }, error => {
      this.loginError = true;
      this.mensagemSucesso = null;
    }
      )
  }

}
