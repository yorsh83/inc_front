import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-datos',
  templateUrl: './validar-datos.component.html',
  styleUrls: ['./validar-datos.component.css']
})
export class ValidarDatosComponent implements OnInit {

  aviso: any = { texto: 'No existen datos ó no hay sistema' };

  constructor() { this.aviso }

  ngOnInit(){
    this.aviso;
  }

}
