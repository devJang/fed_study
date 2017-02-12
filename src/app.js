import tplList  from './list.hbs';
import tplTable from './table.hbs';
import tplMain  from './main.hbs';
import ajax     from './ajax';

const $ = require('jquery');

$('#root').html(tplMain({}));

/*
 * main.hbs
 * table.hbs
 */
// Table Start !---------------------

var table = [{}];
$('#showTable').on('click', () => {
	console.log("click");
	
	var arr = [];
	ajax('../data.json', (response) => {
		var fruits = response.fruits;
		for (var i = 0; i < fruits.length; i++) {
			arr.push({
				name     : fruits[i].name,
				quantity : fruits[i].quantity,
				price    : fruits[i].price
			}); // arr.push
			console.log(`${arr[i].name}는(은) ${arr[i].quantity}개에 ${arr[i].price}`);
		}
	}); // For
	return table.push(arr);
}); // onClick

console.log(`test : ${table}`);

$('[data-view="table"]').html(tplTable({
	table : table
}));

// Table End !---------------------

/*
 * header.hbs
 * list.hbs
 */
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
