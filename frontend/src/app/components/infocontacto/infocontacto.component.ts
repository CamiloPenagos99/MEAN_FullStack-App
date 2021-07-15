import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-infocontacto',
  templateUrl: './infocontacto.component.html',
  styleUrls: ['./infocontacto.component.css']
})
export class InfocontactoComponent implements OnInit {
  @Input() message:string; //Valor de parametro enviado por el padre
  @Output() darAutor = new EventEmitter();
  public autor: any;
  
  constructor() {
    this.autor={
      nombre: "Camilo Penagos",
      profesion: "Ingeniero Telematico",
      linkedIn: "CamiloPenagos99"
    }
   }

  ngOnInit(): void {

  }

  emiterAutor(event){
    console.log("Evento: " , event)
    this.darAutor.emit(this.autor);
    //Lanzar evento y enviar al padre output
  }

}
