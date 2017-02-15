/*
    테이블 생성 or 수정
 */

import tplFruits    from './fruits.hbs';
import tplWeather   from './weather.hbs';

const $ = require('jquery');

export default {
    // 과일 테이블
    fruits: (val, totalPrice) => {
        $('[data-view="fruits"]').html(tplFruits({
            fruits: val,
            totalPrice: totalPrice
        }));
    },

    // 날씨 테이블
    weather: (val, date) => {
        $('[data-view="weather"]').html(tplWeather({
            weather: val,
            date: date
        }));
    }
}