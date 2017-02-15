import tplList      from './list.hbs';
import tplFruits    from './fruits.hbs';
import tplWeather   from './weather.hbs';
import tplMain      from './main.hbs';
import ajax         from './ajax';

const $   = require('jquery');
const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json' +
	'&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';

$('#root').html(tplMain({}));

// Controller Start !---------------------

let controller = {

    // 데이터 로직
    data : {
        // 과일 테이블의 합계를 구한다.
        fruitsTotalPrice : (val) => {
            let totalPrice = 0;

            for (let i = 0; i < val.length; i++) {
                totalPrice += val[i].price;
            }
            return totalPrice;
        },

        // 날씨 테이블의 일자를 변환한다.
        weatherDate : (val) => {
            let date = [];

            for (let i = 0; i < val.length; i++) {
                date.push(new Date(val[i].dt * 1000));
            }
            return date;
        },

        // 요청하는 데이터를 불러온다
        loadAjax : (val, type) => {
            if (type === 'fruits') {
                ajax(val, (response) => {
                    controller.table.fruits(response.fruits, controller.data.fruitsTotalPrice(response.fruits));
                });
            }
            if (type === 'weather') {
                ajax(val, (response) => {
                    controller.table.weather(response.list, controller.data.weatherDate(response.list));
                });
            }
        }
    },

    // 테이블을 담당하는 로직
    table : {
        // 과일 테이블을 생성, 수정한다.
        fruits : (val, totalPrice) => {
            $('[data-view="fruits"]').html(tplFruits({
                fruits     : val,
                totalPrice : totalPrice
            }));
        },

        // 날씨 테이블을 생성, 수정한다.
        weather : (val, date) => {
            $('[data-view="weather"]').html(tplWeather({
                weather : val,
                date    : date
            }));
        }
    }
}

//--------------------- Controller End !


// Click Event Start !---------------------

let flag = false;

$('#showFruits').on('click', () => {
	if (flag === false) {
		controller.data.loadAjax('../data.json', 'fruits');
		$('#showFruits').html(`그 만 보 기`);
		flag = true;
	} else {
		controller.table.fruits("");
		$('#showFruits').html(`과 일 보 기`);
		flag = false;
	}
});

$('#showWeather').on('click', () => {
	if (flag === false) {
		controller.data.loadAjax(url, 'weather');
		$('#showWeather').html(`그 만 보 기`);
		flag = true;
	} else {
		controller.table.weather("");
		$('#showWeather').html(`날 씨 보 기`);
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