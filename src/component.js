import ajax          from './util/ajax';
const $ = require('jquery');

export default {
	isShow : false,
	tpl(val){
		return require(`./templates/${val.split('"')[1]}/${val.split('"')[1]}.hbs`);
	},
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
	},
	show(dom, data){
		ajax(data, res => {
			this.isShow = true;
			this.template(dom, this.tpl(dom), res);
		});
	},
	hide(dom){
		this.isShow = false;
		$(dom).html('');
	},
	toggle(dom, data){
		this[!this.isShow ? 'show' : 'hide'](dom, data);
	}
}