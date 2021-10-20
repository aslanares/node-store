module.exports = (shortCatArr, i) => {
    let firstPar = shortCatArr.then((res) => {
        return res[i];
    });
    return firstPar;
}