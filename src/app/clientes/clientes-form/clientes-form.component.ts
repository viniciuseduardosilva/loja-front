import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente'
import { ClientesService } from "../../clientes.service"
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  sucesso: boolean = false;
  errors: String[];
  email: string;

  constructor( 
    private service : ClientesService,
    private router : Router,
    private activatedRoute : ActivatedRoute
    ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
      this.email = urlParams[ 'email'];
      if(this.email){
        this.service.getClienteEmail(this.email)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        )
      }
    })

  }


  voltarLista(){
    this.router.navigate(['/clientes'])
  }

  onSubmit(){
    this.service.salvar(this.cliente).subscribe(
      response => {
        this.sucesso = true;
        this.errors = null;
        this.cliente = response;
      } , errorResponse => {
        this.errors = errorResponse.error.erros;
        this.sucesso = false;
      }
    )
  }

}
