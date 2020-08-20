import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario'
import { AuthService } from '../auth.service';
import { ClienteDto } from './clienteDto';
import { ClienteDtoService } from '../cliente-dto.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username: string;
  password: string;
  telefone: string;
  nome: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private clienteDtoService: ClienteDtoService,
  ) { }
  
  onSubmit(){
    this.authService.tentarLogar(this.username, this.password)
                .subscribe(resposta =>{
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

  cadastrarDto(){
    const clienteDto: ClienteDto = new ClienteDto();
    clienteDto.senha= this.password;
    clienteDto.email= this.username;
    clienteDto.nome= this.nome;
    clienteDto.telefone= this.telefone;
    this.clienteDtoService.cadastrar(clienteDto).subscribe( resposta =>{
      this.mensagemSucesso = resposta;
      this.cadastrando = false;
      this.username = '';
      this.password = '';
      this.nome='';
      this.telefone='';
      this.errors = [];
    }, errorResposta => {
      this.mensagemSucesso = null;
      this.errors = errorResposta.error.errors;
    })
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
