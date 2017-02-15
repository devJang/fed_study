/*
    데이터를 불러온다
 */

import controllData from './controllData.js';
import controllTable from './controllTable.js';
import ajax         from './ajax';

export default {
    loadAjax: (val, type) => {
        if (type === 'fruits') {
            ajax(val, (response) => {
                controllTable.fruits(response.fruits, controllData.fruitsTotalPrice(response.fruits));
            });
        }
        if (type === 'weather') {
            ajax(val, (response) => {
                controllTable.weather(response.list, controllData.weatherDate(response.list));
            });
        }
    }
}