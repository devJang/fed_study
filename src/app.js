import tplList       from './templates/list.hbs';
import tplMain       from './templates/main.hbs';
import Component from './component';

const $ = require('jquery');
const list = require('./json/drawer-list.json');

const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json' +
	'&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';
const json = 'https://raw.githubusercontent.com/suhokim2/suhokim2.github.com/master/data.json';

const DOM = {
	fruitBtn: '[data-btn="fruit"]',
	weatherBtn: '[data-btn="weather"]',
	drawerList: '[data-view="list"]',
	fruitList: '[data-view="fruits"]',
	weatherList: '[data-view="weather"]'
};

let component = new Component();

$('#root').html(tplMain({}));
$(DOM.drawerList).html(tplList({
	list: list
}));

$(DOM.fruitBtn).on('click', function(){
	component.toggle(DOM.fruitList, json);
});
$(DOM.weatherBtn).on('click', function(){
	component.toggle(DOM.weatherList, url);
});

navigator.geolocation.getCurrentPosition(function(pos){
	var latitude = pos.coords.latitude;
	var longitude = pos.coords.longitude;

	var map = new naver.maps.Map('map', {center: new naver.maps.LatLng(latitude, longitude)});
	var marker = new naver.maps.Marker({
		position: new naver.maps.LatLng(latitude, longitude),
		map: map
	});
})