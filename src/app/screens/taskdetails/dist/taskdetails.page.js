"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskdetailsPage = void 0;
var core_1 = require("@angular/core");
var util_1 = require("@firebase/util");
var TaskdetailsPage = /** @class */ (function () {
    function TaskdetailsPage(toast, load, Auth, router, store, previos) {
        this.toast = toast;
        this.load = load;
        this.Auth = Auth;
        this.router = router;
        this.store = store;
        this.previos = previos;
        this.tasks = [];
        this.task = {};
        this.user = [];
    }
    TaskdetailsPage.prototype.ngOnInit = function () {
        this.taskid = localStorage.getItem('taskid');
        console.log(this.taskid);
        this.gettaskdetails();
        this.loggedUser = localStorage.getItem('loggedinuser');
        this.getuser();
    };
    TaskdetailsPage.prototype.showToast = function (messege) {
        this.toast
            .create({
            message: messege,
            duration: 3000,
            position: 'top'
        })
            .then(function (toastData) { return toastData.present(); });
    };
    TaskdetailsPage.prototype.gettaskdetails = function () {
        var _this = this;
        this.store
            .collection('tasks', function (ref) { return ref.where('taskid', '==', _this.taskid); })
            .valueChanges()
            .subscribe(function (res) {
            _this.tasks = res;
        });
    };
    TaskdetailsPage.prototype.getuser = function () {
        var _this = this;
        this.store
            .collection('users', function (ref) {
            return ref.where('email', '==', _this.loggedUser);
        })
            .valueChanges()
            .subscribe(function (res) {
            _this.user = res;
            console.log(_this.tasks);
        });
    };
    TaskdetailsPage.prototype.addtoliked = function () {
        this.store.collection('tasks').add({
            title: this.tasks.title,
            notes: this.tasks.notes,
            deadline: this.tasks.deadline,
            email: this.loggedUser,
            taskid: (this.myuuid = util_1.uuidv4())
        });
    };
    TaskdetailsPage.prototype.back = function () {
        this.previos.back();
    };
    TaskdetailsPage.prototype.deletetask = function (taskid) {
        this.store.collection('tasks').doc(taskid)["delete"]();
        this.showToast("Your Task has been deleted");
        this.router.navigate(['home']);
    };
    TaskdetailsPage = __decorate([
        core_1.Component({
            selector: 'app-taskdetails',
            templateUrl: './taskdetails.page.html',
            styleUrls: ['./taskdetails.page.scss']
        })
    ], TaskdetailsPage);
    return TaskdetailsPage;
}());
exports.TaskdetailsPage = TaskdetailsPage;
