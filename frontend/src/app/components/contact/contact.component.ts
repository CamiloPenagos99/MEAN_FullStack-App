import { Component, OnInit, ViewChild } from '@angular/core';
//import { $ } from 'protractor';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public message:string;
  public autor:any;

  @ViewChild('contenido') eticontenido; //Viewchild de componente contenido

  constructor() { }

  ngOnInit(): void {
   // Usar jquery
   $(".logo").click(function(e){
     e.preventDefault();
    $("header").css("background","#003049");
   })

   console.log("Elemento #contenido", this.eticontenido.nativeElement.textContent); //Contenido de texto del elemento
  
  }

  //Obtener evento del hijo
  getAutor(event){
    console.log("Evento padre:" , event);
    this.autor=event;
  }

}
