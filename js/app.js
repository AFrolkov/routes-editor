import angular from 'angular';
import '../vendor/js/ng-sortable';
import '../vendor/js/ya-map';
import '../vendor/css/bootstrap-min.css';
import '../styles/style.scss';

let app = angular.module('myApp', ['ng-sortable', 'yaMap']);

import yaMapsService from './services/yaMapsService';
import LocationController from './controllers/LocationController';
import sortableForm from './directives/sortable-form-directive';

app.directive('sortableForm', sortableForm);
app.controller('LocationController', LocationController);
app.service('yaMapsService', yaMapsService);