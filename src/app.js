import tplList      from './list.hbs';
import tplFruits    from './fruits.hbs';
import tplWeather   from './weather.hbs';
import tplMain      from './main.hbs';
import ajax         from './ajax';

const $   = require('jquery');
const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json' +
	'&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';

$('#root').html(tplMain({}));

// Table Controller !---------------------

let controller = {
	
	fruits : (val, totalPrice) => {
		$('[data-view="fruits"]').html(tplFruits({
			fruits     : val,
			totalPrice : totalPrice
		}));
	},
	
	weather : (val, date) => {
		$('[data-view="weather"]').html(tplWeather({
			weather : val,
			date    : date
		}));
	},
	
	sum         : (val) => {
		let totalPrice = 0;
		
		for (let i = 0; i < val.length; i++) {
			totalPrice += val[i].price;
		}
		return totalPrice;
	},
	
	dateWeather : (val) => {
		let date = [];
		
		for (let i = 0; i < val.length; i++) {
			date.push(new Date(val[i].dt * 1000));
		}
		return date;
	},
	
	loadData : (val, type) => {
		if (type === 'fruits') {
			ajax(val, (response) => {
				controller.fruits(response.fruits, controller.sum(response.fruits));
			});
		}
		if (type === 'weather') {
			ajax(val, (response) => {
				controller.weather(response.list, controller.dateWeather(response.list));
			});
		}
	}
}

//--------------------- Table Controller End !


// Click Event Start !---------------------

let flag = false;

$('#showFruits').on('click', () => {
	if (flag === false) {
		controller.loadData('../data.json', 'fruits');
		$('#showFruits').html("그 만 보 기");
		flag = true;
	} else {
		controller.fruits("");
		$('#showFruits').html("과 일 보 기");
		flag = false;
	}
});

$('#showWeather').on('click', () => {
	if (flag === false) {
		controller.loadData(url, 'weather');
		$('#showWeather').html("그 만 보 기");
		flag = true;
	} else {
		controller.weather("");
		$('#showWeather').html("날 씨 보 기");
		flag = false;
	}
});

// --------------------- Click Event End !


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

// ---------------------  List End !