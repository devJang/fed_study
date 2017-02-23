import ajax          from './util/ajax';
const $ = require('jquery');

"use strict";

class Component {
	//TODO : 쓸모없는 생성자가 되버림. 할당이 되도록 리팩토링해야함.
	constructor(isShow, weather, date, temp, fruits, total, price){
		this.isShow = isShow;
		this.weather = weather;
		this.date = date;
		this.temp = temp;
		this.fruits = fruits;
		this.total = total;
		this.price = price;
	}
	
	tpl(val){
		return require(`./templates/${val.split('"')[1]}/${val.split('"')[1]}.hbs`);
	}
	
	template(dom, tplType, res){
		let reqType = dom.split('"')[1];
		
		if (reqType == 'weather') {
			$(dom).html(tplType({
				weather : res.list.map(v => {
					return {
						date : new Date(v.dt * 1000),
						temp : v.temp.day
					};
				}),
			}));
		}

		if (reqType == 'fruits') {
			$(dom).html(tplType({
				fruits : res.fruits,
				total  : res.fruits.map(v => {
					return v.price * v.quantity;
				}).reduce((prev, curr) => prev + curr, 0)
			}));
		}
	}
	
	show(dom, data){
		ajax(data, res => {
			this.isShow = true;
			this.template(dom, this.tpl(dom), res);
		});
	}
	
	hide(dom){
		this.isShow = false;
		$(dom).html('');
	}
	
	toggle(dom, data){
		this[!this.isShow ? 'show' : 'hide'](dom, data);
	}
}

export default Component;