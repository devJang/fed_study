/*
    데이터 가공
 */

export default {
    // 과일 테이블의 합계를 구한다.
    fruitsTotalPrice: (priceItar) => {
        let totalPrice = 0;

        for (let val of priceItar) {
            totalPrice += val.price;
        }
        return totalPrice;
    },

    // 날씨 테이블의 일자를 변환한다.
    weatherDate: (dateItar) => {
        let date = [];
        for (let val of dateItar) {
            date.push(new Date(val.dt * 1000));
        }
        return date;
    }
}