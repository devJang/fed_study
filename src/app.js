import tplList       from './list.hbs';
import tplMain       from './main.hbs';
import controllTable from './controllTable.js';
import loadData      from './loadData.js';

const $ = require('jquery');
const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json' +
    '&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';

$('#root').html(tplMain({}));

// Click Event Start !---------------------

let flag = false;

$('#showFruits').on('click', () => {
    if (flag === false) {
        loadData.loadAjax('../data.json', 'fruits');
        $('#showFruits').html(`그 만 보 기`);
        flag = true;
    } else {
        controllTable.fruits("");
        $('#showFruits').html(`과 일 보 기`);
        flag = false;
    }
});

$('#showWeather').on('click', () => {
    if (flag === false) {
        loadData.loadAjax(url, 'weather');
        $('#showWeather').html(`그 만 보 기`);
        flag = true;
    } else {
        controllTable.weather("");
        $('#showWeather').html(`날 씨 보 기`);
        flag = false;
    }
});

// --------------------- Click Event End !


// List Start !---------------------

const list = [{
    href: 'http://www.naver.com',
    name: 'naver'
}, {
    href: 'http://www.daum.net',
    name: 'daum'
}];

$('[data-view="list"]').html(tplList({
    list: list
}));

// ---------------------  List End !