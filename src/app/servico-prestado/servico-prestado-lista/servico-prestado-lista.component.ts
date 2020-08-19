import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './ServicoPrestadoBusca';
import { ServicoPrestadoService } from '../../servico-prestado.service'

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number [];
  lista: ServicoPrestadoBusca[];
  mensage: string;
  constructor(
    private servicoPrestadoServio: ServicoPrestadoService
  ) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
   }

  ngOnInit(): void {
  }

  consultar(){
    this.servicoPrestadoServio.buscar(this.nome, this.mes)
    .subscribe( resposta => {
      this.lista = resposta
      if( this.lista.length >= 0 ){
        this.mensage = "nenhum registro encontrado."
      } else 
      this.mensage = null;
    });
  }

}
