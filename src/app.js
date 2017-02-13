import tplList      from './list.hbs';
import tplFruits    from './fruits.hbs';
import tplWeather   from './weather.hbs';
import tplMain      from './main.hbs';
import ajax         from './ajax';

const $   = require('jquery');
const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json' +
	'&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';
$('#root').html(tplMain({}));

// createTable Start !---------------------
function createTable(val) {
	$('[data-view="fruits"]').html(tplFruits({
		fruits : val
	}));
}
function createWeather(val) {
	$('[data-view="weather"]').html(tplWeather({
		weather : val
	}));
}
//--------------------- createTable End !

// Click Event Start !---------------------
var flag = false;

$('#showFruits').on('click', () => {
	if (flag === false) {
		loadTableData('../data.json', 'fruits');
		flag = true;
	} else {
		createTable("");
		flag = false;
	}
});

$('#showWeather').on('click', () => {
	if (flag === false) {
		loadTableData(url, 'weather');
		flag = true;
	} else {
		createWeather("");
		flag = false;
	}
});
// --------------------- Click Event End !

function loadTableData(val, type) {
	if (type === 'fruits') {
		ajax(val, (response) => {
			createTable(response.fruits);
		});
	}
	if (type === 'weather') {
		ajax(val, (response) => {
			createWeather(response.list);
		});
	}
}

// List Start !---------------------

const list = [{
	href : 'http://www.naver.com',
	name : 'naver'
}, {
	href : 'http://www.daum.net',
	name : 'daum'
}];

$('[data-view="list"]').html(tplList({
	list : list
}));

// List End !---------------------