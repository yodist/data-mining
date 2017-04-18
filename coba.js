function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active.concat(rest[0]), rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn([], str, []);
}
var hasil = combinations(["a","b","c"]);
console.log(hasil);
