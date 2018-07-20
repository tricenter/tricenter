var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubFamPage } from './subfamilia';
var SubFamPageModule = /** @class */ (function () {
    function SubFamPageModule() {
    }
    SubFamPageModule = __decorate([
        NgModule({
            declarations: [
                SubFamPage,
            ],
            imports: [
                IonicPageModule.forChild(SubFamPage),
            ],
        })
    ], SubFamPageModule);
    return SubFamPageModule;
}());
export { SubFamPageModule };
//# sourceMappingURL=subfamilia.module.js.map