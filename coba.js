var tes = new Object();
var x = ['beras', 'gula'];
var y = ['coba'];
tes[x]=1;
console.log(x + " = "+ tes[['beras', 'gula']]);
console.log(x.indexOf('tai'));
if (!tes[y]) tes[y]=5;
console.log(tes[y]);
