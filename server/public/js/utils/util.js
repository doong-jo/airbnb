/**
 * 최솟값과 최댓값, 시작값을 가지고 숫자 배열을 생성한다
 *
 * @param {number} min 최솟값
 * @param {number} max 최댓값
 * @param {number|string} [first=0] 시작값
 * @returns {array} 숫자 배열
 */
export function makeNumberArray(min, max, first = 0) {
    const arr = [...Array(max + 1).keys()].slice(min);
    if (first) {
        arr.unshift(first);
    }

    return arr;
}

/**
 * debounce 기법을 구현한다.
 * : 이벤트의 연속적 발생을 마지막 이벤트 호출 발생을 가지고 값을 처리함
 *
 * @param {function} fn event listener
 * @param {number} [wait=100] delay
 * @returns {function} debounce가 적용된 event listner
 */
export function debounce(fn, wait = 100) {
    let timeoutObject;

    return function tick(...args) {
        clearTimeout(timeoutObject);
        timeoutObject = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
}
