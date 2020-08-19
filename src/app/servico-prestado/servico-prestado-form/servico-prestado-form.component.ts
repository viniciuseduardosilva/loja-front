import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service'
import { ServicoPrestado } from '../ServicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service'

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = []
  servicoPrestado: ServicoPrestado;
  sucesso: boolean = false;
  errors: String[];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoServico: ServicoPrestadoService 
  ) { 
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe( resposta => this.clientes = resposta);
  }

  onSubmit(){
    this.servicoPrestadoServico.salvar(this.servicoPrestado)
    .subscribe( resposta => { 
      this.sucesso = true;
      this.errors = null;
      this.servicoPrestado = new ServicoPrestado();
    }, errorResponse => {
      this.sucesso = false;
      this.errors = ["Erro ao salvar o cliente."]
    })
  }

}
