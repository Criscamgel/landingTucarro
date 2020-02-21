import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CentralesService } from '../../services/centrales.service';


@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.css']
})
export class FormStepComponent{

  constructor(private centrales: CentralesService) { }
  

  mail = RegExp("^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
  env = environment;
  modal:boolean = false;
  valorFinanciarCop:any;
  editable:boolean = true;
  aprobado:boolean = false;
  negado:boolean = false;
  sppiner:boolean = true;
  

  min = this.env.min
  minF = 10000000

  contacto:ContactoInterface = {
    DatosBasicos: {
      TipoDocumento: null,  
      NumeroDocumento: null,  
      Nombre1: null,  
      Celular: null,  
      CorreoPersonal: null
    },
  
    DatosFinancieros: {  
      ActividadEconomica: null,  
      ActividadIndependiente: 3,  
      IngresoMensual: null  
    },
  
    OtrosDatos: {  
      AutorizaConsultaCentrales: false,  
      AutorizaMareigua: false,  
      ValorFinanciar: null,
      IdentificacionVendedor: null  
    }
  }

  /* Functions */

  oldLetters(event: any) {    
    const pattern =  new RegExp(environment.patternLetter);    
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  oldNumbers(event: any) {
    const pattern =  new RegExp(environment.patternNumber);    
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chechedc(this){
    this.contacto.OtrosDatos.AutorizaMareigua = true       
  }

  sendCentrales(this){    
    this.editable = false;

    console.log("this.contacto ---> ", this.contacto);
    
    
    if(this.contacto.DatosFinancieros.ActividadEconomica){
      if(this.contacto.DatosFinancieros.ActividadEconomica === 1){
          this.contacto.DatosFinancieros.ActividadEconomica = 1;
          this.contacto.DatosFinancieros.ActividadIndependiente = 15;
      }
      if(this.contacto.DatosFinancieros.ActividadEconomica === 11){
          this.contacto.DatosFinancieros.ActividadEconomica = 1;
          this.contacto.DatosFinancieros.ActividadIndependiente = 16;
      }
      if(this.contacto.DatosFinancieros.ActividadEconomica === 2){
          this.contacto.DatosFinancieros.ActividadEconomica = 2;
          this.contacto.DatosFinancieros.ActividadIndependiente = 3;
      }
    }

    this.centrales.authenticate(this.contacto);
    setTimeout(() => {
      this.centrales.response(this.contacto).subscribe((resp:any) => {
        this.respuesta = resp.IdResultado;
        
        if(this.respuesta == 2 || this.respuesta == 3){
          this.sppiner = false
          this.aprobado = true
        }else{
          this.sppiner = false
          this.negado = true
        }
      })  
     }, 3000);
    
  }

  toNumber(val){
    let valArr=val.split('');
    let valFiltered = valArr.filter(x=> !isNaN(x))
    let valProcessed = valFiltered.join('')     
    return Number(valProcessed);
   }

   checkTyc(this){
    this.modal=false; 
    this.contacto.OtrosDatos.AutorizaConsultaCentrales=true;
    this.contacto.OtrosDatos.AutorizaMareigua=true;
   }

   reload()
    {
    window.location.href="https://www.tucarro.com.co/"; 
    }
}

export interface DatosBasicos {
  
  Nombre1?: String; 
  TipoDocumento?: String;  
  NumeroDocumento?: String;  
  Celular?: String;  
  CorreoPersonal?: String;
}

export interface DatosFinancieros {
  
  ActividadEconomica?: Number;  
  ActividadIndependiente?: Number;  
  IngresoMensual?: Number;
  
}

export interface OtrosDatos {
  
  AutorizaConsultaCentrales?: Boolean;  
  AutorizaMareigua?: Boolean;  
  ValorFinanciar?: Number;
  IdentificacionVendedor?: Number;
}

export interface ContactoInterface{

  DatosBasicos?:DatosBasicos;
  DatosFinancieros?:DatosFinancieros;
  OtrosDatos?:OtrosDatos;
}
