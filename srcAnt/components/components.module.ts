import { NgModule } from '@angular/core';
//import { ChangeDetectorRef } from '@angular/core';
//import { Component } from '@angular/core';
//import { OnInit } from '@angular/core';
import { ComcabeceraComponent } from './comcabecera/comcabecera';
import { CombuscarComponent } from './combuscar/combuscar';
import { CompieComponent } from './compie/compie';
import { ComcestaComponent } from './comcesta/comcesta';
@NgModule({
	declarations: [ComcabeceraComponent,
    CombuscarComponent,
    CompieComponent,
    ComcestaComponent],
	imports: [],
	exports: [ComcabeceraComponent,
    CombuscarComponent,
    CompieComponent,
    ComcestaComponent]
})
export class ComponentsModule {}
