export function random(min, max, addOne = 1) {
    let count = Math.max(max - min, 0) + addOne;
    return Math.floor(Math.random() * count) + min;
}