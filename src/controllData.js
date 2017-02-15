/*
    데이터 가공
 */

export default {
    // 과일 테이블의 합계를 구한다.
    fruitsTotalPrice: (val) => {
        let totalPrice = 0;

        for (let i = 0; i < val.length; i++) {
            totalPrice += val[i].price;
        }
        return totalPrice;
    },

    // 날씨 테이블의 일자를 변환한다.
    weatherDate: (val) => {
        let date = [];

        for (let i = 0; i < val.length; i++) {
            date.push(new Date(val[i].dt * 1000));
        }
        return date;
    }
}