"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotasksPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var NotasksPage = /** @class */ (function () {
    function NotasksPage(modalCtrl, router) {
        this.modalCtrl = modalCtrl;
        this.router = router;
    }
    NotasksPage.prototype.ngOnInit = function () { };
    NotasksPage.prototype.dismissModal = function () {
        this.modalCtrl.dismiss();
    };
    NotasksPage.prototype.navigate = function () {
        this.router.navigate(['home/add-task']);
        this.dismissModal();
    };
    __decorate([
        core_1.ViewChild(angular_1.IonModal)
    ], NotasksPage.prototype, "modal");
    NotasksPage = __decorate([
        core_1.Component({
            selector: 'app-notasks',
            templateUrl: './notasks.page.html',
            styleUrls: ['./notasks.page.scss']
        })
    ], NotasksPage);
    return NotasksPage;
}());
exports.NotasksPage = NotasksPage;
