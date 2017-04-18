// var express= require('express');
// SETUP
var dataTxt = "gula,beras,roti\nberas,roti,garam,gula\nberas,garam\ngaram,gula\ngaram";
var koef = 2;
var listBarang;
// var transaksi = [[]];

// FUNGSI UNTUK MENGUBAH DARI STRING KE ARRAY
function txtToTransaksi(data) {
  var i=0, start=0, noTrans=0;
  var hasil = [[]];
  while(data[i]) {
    if(data[i]===',') {
      hasil[noTrans].push(data.slice(start, i));
      start=i+1;
    } else if(dataTxt[i]==='\n') {
      hasil[noTrans].push(data.slice(start, i));
      hasil.push([]);
      noTrans+=1;
      start=i+1;
    }
    i++;
  }
  hasil[noTrans].push(data.slice(start, i));
  return hasil;
}

function chopByComma(data) {
  var i=0, start=0;
  var hasil = [];
  while(data[i]) {
    if(data[i]===',') {
      hasil.push(data.slice(start, i));
      start=i+1;
    }
    i++;
  }
  hasil.push(data.slice(start, i));
  return hasil;
}

function cekBarang(data) {
  var flatten = data.reduce(
    (acc, cur) => acc.concat(cur), []
  );
  listBarang = [ ...new Set(flatten) ];
}

function combinations(chars) {
  var result = [];
  var result1 = [];
  var f = function(prefix, chars) {
    for (var i = 0; i < chars.length; i++) {
      if (prefix !== '') {
        result.push(prefix + ',' + chars[i]);
        f(prefix + ',' + chars[i], chars.slice(i + 1));
      } else {
        result.push(prefix + chars[i]);
        f(prefix + chars[i], chars.slice(i + 1));
      }
    }
  }
  f('', chars);
  for(var i=0; i<result.length; i++) {
    // result1.push(txtToTransaksi(result[i]));
    result1.push(chopByComma(result[i]));
  }
  return result1;

}

// JALANKAN SEMUA FUNGSI DAN CETAK KE CONSOLE
transaksi = txtToTransaksi(dataTxt);
console.log("list transaksi: ");
for (var no=0; no<transaksi.length; no++) {
  console.log("transaksi " + (no+1));
  console.log(transaksi[no]);
}

console.log("\nlist barang:");
cekBarang(transaksi);
console.log(listBarang);

var semuaKombinasi = combinations(listBarang);
console.log("\nlist kombinasi:");
console.log(semuaKombinasi);
