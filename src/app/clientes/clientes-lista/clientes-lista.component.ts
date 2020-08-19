import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  msgSucesso: String;
  msgErro: String;
  
  constructor(
    private service: ClientesService, 
    private router: Router
    ) {

   }

  ngOnInit(): void {
    this.service.getClientes().subscribe( resposta => {
      this.clientes = resposta;
      console.log(resposta)
    })
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente : Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service.deletar( this.clienteSelecionado)
    .subscribe( resposta => {
      this.msgSucesso = 'Cliente deletado com sucesso !'
      this.ngOnInit();
    },
    erro => this.msgErro = 'Cliente não foi deletado.')
  }

}
