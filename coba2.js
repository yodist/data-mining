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

function combinations(data) {
  var result = [];
  var result1 = [];
  var f = function(prefix, data) {
    for (var i = 0; i < data.length; i++) {
      if (prefix !== '') {
        result.push(prefix + ',' + data[i]);
        f(prefix + ',' + data[i], data.slice(i + 1));
      } else {
        result.push(prefix + data[i]);
        f(prefix + data[i], data.slice(i + 1));
      }
    }
  }
  f('', data);
  for(var i=0; i<result.length; i++) {
    // result1.push(txtToTransaksi(result[i]));
    result1.push(chopByComma(result[i]));
  }
  return result1;

}

function diurutkan(data) {
  semuaKombinasi.sort(function (a, b) {
    return a.length - b.length;
  });
}

function cariFN(data) {
  var countedNames = data.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
}

// JALANKAN SEMUA FUNGSI DAN CETAK KE CONSOLE
transaksi = txtToTransaksi(dataTxt);
cekBarang(transaksi);
var semuaKombinasi = combinations(listBarang);
diurutkan(semuaKombinasi);

console.log("list transaksi: ");
for (var no=0; no<transaksi.length; no++) {
  console.log("transaksi " + (no+1));
  console.log(transaksi[no]);
}

console.log("\nlist barang:");
console.log(listBarang);

console.log("\nlist kombinasi:");
console.log(semuaKombinasi);
