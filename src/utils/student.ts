/**
 * 生成学号
 */
export function genStudentID() {
    const date = new Date(Date.now());

    const year = date.getUTCFullYear().toString().slice(2);
    let month = date.getMonth().toString();

    if (month.length === 1) {
        month = '0' + month;
    }

    const suffix = Date.now().toString().slice(9);

    return year + month + suffix;
}