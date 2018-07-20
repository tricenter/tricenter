//import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
//import { ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';

@Component({

 animations: [
  trigger('cartBadge', [
    state('idle', style({
        opacity: '1',
        transform: 'scale(1)'
    })),
    
    state('adding', style({
        opacity: '1',
        transform: 'scale(1)'
    })),
    
    transition('idle <=> adding', animate(750, keyframes([
      style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
      style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
      style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
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

export class AppserviciosProvider {

  AppserviciosProvider: any = [];
  prueba;
  items: Object[] = []
  itemsInCart: Object[] = [];
  cartBadgeState: string = 'idle';

  constructor(

  public appCtrl: App,
	private alertCtrl: AlertController,
	public changeDetector: ChangeDetectorRef,
  public http: Http,
  public variablesglobales: VariablesGlobalesProvider,
	private storage: Storage

  	) {
    console.log(' ');


     this.items = [
      {title: 'Something', quantityInCart: 0, addButtonState: 'idle'}
    ];

  }

	cerrarsesion(){
	let alert = this.alertCtrl.create({
	title: 'Cerrar sesión',
	message: '¿Está seguro?',
	cssClass: 'alertCustomCss',
	buttons: [
	  {
	    text: 'No',
	    role: 'No',
	    handler: () => { console.log('No hacer nada');  }
	  },{
	    text: 'Si',
	    handler: () => {
			  	
		  	this.variablesglobales.username = "";
		    this.variablesglobales.logged = false;
		    this.variablesglobales.CLIENTES_CONTRASENA = "";
		    this.variablesglobales.emailactivo = "";
 	        
	        this.storage.set('email', '');
	        this.storage.set('usuario', '');
	        this.storage.set('pass', '');
	       	this.storage.set('valorabuscar', '');
	        this.storage.set('orden', '');
	        this.storage.set('menor', '');
	        this.storage.set('myor', '');


     		this.appCtrl.getRootNav().push(HomePage);
	    }
	  }
	]
	});
	alert.present();
	}

	gettema(){
	  	return new Promise(
	  		resolve=>{
	  			this.http.get("http://www.tricenter.es/AppCatalogo/tema")
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}
	  			)
	  		}
	  	);
	}

	getsubtema(id){
	  	return new Promise(
	  		resolve=>{
	  			this.http.get("http://www.tricenter.es/AppCatalogo/subtema/"+id)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}
	  			)
	  		}
	  	);
	}

	getlistart(id2){
		console.log("http://www.tricenter.es/AppCatalogo/listart/"+id2);
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/listart/"+id2)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}
	  			)
	  		}
	  	);
	}



	getBuscar(valor){
	console.log("http://www.tricenter.es/AppCatalogo/buscar/"+valor);
  	return new Promise(
  		resolve=>{
  		   	this.http.get("http://www.tricenter.es/AppCatalogo/buscar/"+valor)
  			.map(res=> res.json())
  			.subscribe(
  				data => {
  					resolve(data);
  				},
  				err=>{
  					console.log(err);
  				}
  			)
  		}
  	);
	}

	
	getBuscar2(valor, lower, upper){
		this.storage.set('valorabuscar', valor);
    this.storage.set('orden', 'ASC');
    this.storage.set('menor', lower);
    this.storage.set('myor', upper);
		console.log("http://www.tricenter.es/AppCatalogo/cuadroDeBusqueda/"+valor+"/ARTICULOS_PENDIENTE_ENTREGAR/ASC/"+lower+"/"+upper);
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cuadroDeBusqueda/"+valor+"/ARTICULOS_PENDIENTE_ENTREGAR/ASC/"+lower+"/"+upper)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}
	  			)
	  		}
	  	);
	}

	getAcceso2(email, contrasena){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/sublogin.php/usuario/"+email+"/"+contrasena)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}
	  			)
	  		}
	  	);
	}

	addRegistro(data){
	  	return new Promise(
	  		resolve=>{
	  			//console.log("El array DESPUES" + data);
	  		   	this.http.put("http://www.tricenter.es/AppCatalogo/usuario.php/add", data)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}
	
	setSelect(id){
	  	return new Promise(
	  		resolve=>{
	  			this.http.get("http://www.tricenter.es/AppCatalogo/usuario.php/sel/"+id)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}
	  			)
	  		}
	  	);
	}


	addUpdate(data){
		this.prueba = JSON.stringify(data)
	  	console.log("El data PRIMERO es" + this.prueba);
	  	return new Promise(
	  		resolve=>{
	  			//console.log("El array DESPUES" + data);
	  		   	this.http.put("http://www.tricenter.es/AppCatalogo/usuario.php/upd", data)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  					
	  					this.prueba = JSON.stringify(data)
	  					console.log("El data DEVUELTO es" + this.prueba);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}

/*----------------------------------------------------------------
---------------------------CESTA DE COMPRA------------------------
----------------------------------------------------------------*/
	cupon(codigo){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/cupon/"+codigo)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}

	delCesta(codigo, email){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/delarticulo/"+codigo+"/"+email)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}
	eddCesta(codigo,  fecha, unidades, email){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/edd/"+codigo+"/"+fecha+"/"+unidades+"/"+email)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}

		addCesta(codigo,  fecha, unidades, email){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/add/"+codigo+"/"+fecha+"/"+unidades+"/"+email)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}

	obtenernumerocesta(email){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/obtener/"+email)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}

	editarcesta(email){
	  	return new Promise(
	  		resolve=>{
	  		   	this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/editar/"+email)
	  			.map(res=> res.json())
	  			.subscribe(
	  				data => {
	  					resolve(data);
	  				},
	  				err=>{
	  					console.log(err);
	  				}

	  			)
	  		}
	  	);
	}
/*----------------------------------------------------------------
---------------------------FIN DE COMPRA------------------------
----------------------------------------------------------------*/

}
