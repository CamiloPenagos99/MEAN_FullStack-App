import { Directive , ElementRef} from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {
//private el: ElementRef<any>
  constructor() {
  console.log("Directive: ", ElementRef); //Imprimir el elemento nativo
}
 
  
}
