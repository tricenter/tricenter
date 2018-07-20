import { Component, ChangeDetectorRef } from '@angular/core';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { FiltroPage } from '../../pages/filtro/filtro';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { BuscarPage } from '../../pages/buscar/buscar';
import { CestaPage } from '../../pages/cesta/cesta';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';
  
@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',

 animations: [
    trigger('cartBadge', [
        state('idle', style({
            opacity: '1',
            backgroundColor: '#000000',
            transform: 'scale(1)'
        })),
        
        state('adding', style({
            opacity: '1',
            backgroundColor: '#000000',
            transform: 'scale(1)'
        })),
        
        transition('idle <=> adding', animate(750, keyframes([    
          style({opacity: 0, transform: 'scale(1)', offset: 0}),
          style({opacity: 1, transform: 'scale(1.3)', offset: 0.3}),
          style({opacity: 1, transform: 'scale(1)', offset: 1.0})
        ]))), 
    ]),

    trigger('addButton', [
        state('idle', style({
            opacity: '1'
        })),
        state('adding', style({
            opacity: '1',
            fontWeight: 'bold'
        })),
        transition('idle <=> adding', animate('300ms linear')),
        transition('void => *', [
            style({transform: 'translateX(200%)'}),
            animate('300ms ease-in-out')
        ])
    ])    
  ]
  
})

export class ListaPage {

  dato;
  temaactivo;
  subtemaactivo;
  datoscargados;
  datoscargados2;
  datoscargados3;
  miModelo: any;

  unidades: number;
  codigo: number;
  todayDate = new Date();
  fecha = (this.todayDate.getFullYear() + '' + ((this.todayDate.getMonth() + 1)) + '' + this.todayDate.getDate() + '' +this.todayDate.getHours() + '' + this.todayDate.getMinutes()+ '' + this.todayDate.getSeconds());
  
  txtbuscar : {
    valor: ''
   }

  formulario = 
  {
   valor: '',
   valor2: ''
  }

  encodeData : string ;
  encodedData : {} ;
  options :BarcodeScannerOptions;

  items: Object[] = []
  itemsInCart: Object[] = [];
  cartBadgeState: string = 'idle';
 
  myForm: FormGroup;

 constructor(
  public navParams: NavParams,
  public servicios:AppserviciosProvider,
  private barcodeScanner: BarcodeScanner,
  public variablesglobales:VariablesGlobalesProvider,
  public navCtrl: NavController,
  public changeDetector: ChangeDetectorRef,
  public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      unidades: ['1', [Validators.required, Validators.pattern(/^([0-9]|1[0])$/)]],
      codigo: ['', [Validators.required, Validators.pattern(/^[1-9_-]{5,6}$/)]],
      ARTICULOS_DESNORMAL: ['', ],
    });
  this.loadData();
  this.miModelo = {};

    this.items = [
      {title: 'Something', quantityInCart: 0, addButtonState: 'idle'}
    ];
  }
  openFiltro() {
    this.navCtrl.push(FiltroPage);
  }

   
  scan(){
    this.options = {
        prompt : "Situa el código a escanear "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
    console.log(barcodeData);
    
     this.variablesglobales.setBuscar2(barcodeData.text);
     this.navCtrl.push(BuscarPage);

    alert("Producto encontrado:\n" + "Codigo de Barras: " + barcodeData.text + "\n" + "Su PVP es: " + this.datoscargados);
    }, (err) => {
        console.log("Ha ocurrido un error: " + err);
    });         
  }
  
  encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
        console.log("Ha ocurrido un error: " + err);
    });                 
  }   

  loadData() {   
    this.servicios.getBuscar(this.variablesglobales.buscar).then(
      data => {
          this.datoscargados = data;
          //console.log("Obtiene valor = " + data);
      })
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  addToCart(item){
    item.quantityInCart = +1;
    item.addButtonState = 'adding';
    this.cartBadgeState = 'adding';
    this.changeDetector.detectChanges();
  }

  addToCartFinished(item){
    this.cartBadgeState = 'idle';
    item.addButtonState = 'idle';
  }

  abrelaPage(page) {
  	if(page=="subtema") {  
  		this.navCtrl.push(SubFamPage);
  	}
  	
  	if(page=="tema") {  
  		this.navCtrl.push(DatosPage);
  	}
  }

  openCatalogo(){
    this.variablesglobales.settema("ESCOLAR");
    this.variablesglobales.setlisart("REGLAS");
    this.navCtrl.push(DatosPage);
  }

  openTiendas(){
    this.navCtrl.push(TiendasPage);
	}

	openBuscar(){
    this.navCtrl.push(BuscarPage);
	}

  openInicio() {
    this.navCtrl.push(HomePage);
  }

  openBuscar2() { 
    if(this.formulario.valor.length < 3){
       console.log("Para la busqueda, minimo 3 caracteres");
     } else {
      this.variablesglobales.setBuscar2(this.formulario.valor);
      this.navCtrl.push(BuscarPage);
    }
  }
  openCesta() {
    this.navCtrl.push(CestaPage);
  }

  cesta(value) {
    //var data = {};
    if (this.variablesglobales.emailactivo == ""){
      
      this.navCtrl.push(AreaclientePage);
      console.log("Debe iniciar sesion antes de comprar");
      
    } else {

      this.unidades = this.myForm.value.unidades;
      this.codigo = value;
      this.servicios.addCesta(this.codigo, this.fecha, this.unidades, this.variablesglobales.emailactivo).then(
        data => {
         this.datoscargados2 = data;
         for (let dat of this.datoscargados2) {
            console.log("Obtiene valorDATA = " + dat["RESULTADO"]);
             
            if (dat["RESULTADO"]=="OK"){
             /*
              const toast = this.toastCtrl.create({
                position: "top",
                message: 'Artículo añadido.',
                duration: 3000
              });
              toast.present();
              */
              this.servicios.obtenernumerocesta( this.variablesglobales.emailactivo).then(
              data => {
                this.datoscargados3 = data;
                  for (let dat of this.datoscargados3) {
                  console.log("Obtiene valorDATA = " + dat["valor"]);

                  this.variablesglobales.setValorcesta(dat["valor"]);
              }})
            } // fin if
           } // fin for
          })
        .catch(
          error => {
            console.log(error);
        }
      )
    }
  } // fin cesta
}