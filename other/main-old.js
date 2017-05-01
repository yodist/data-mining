// var express= require('express');
// SETUP
var dataTxt = "gula,beras,roti\nberas,roti,garam,gula\nberas,garam\ngaram,gula\ngaram";
var koef = 2;
var listJumlahBarang;
var transaksi = [[]];

// FUNGSI UNTUK MENGUBAH DARI STRING KE ARRAY
function txtToTransaksi(data) {
  var i=0, start=0, noTrans=0;
  while(data[i]) {
    if(data[i]===',') {
      transaksi[noTrans].push(data.slice(start, i));
      start=i+1;
    } else if(dataTxt[i]==='\n') {
      transaksi[noTrans].push(data.slice(start, i));
      transaksi.push([]);
      noTrans+=1;
      start=i+1;
    }
    i++;
  }
  transaksi[noTrans].push(data.slice(start, i));
}

// FUNGSI UNTUK MENGHITUNG JUMLAH TIAP ITEM
function hitungBarang(data) {
  var flatten = data.reduce(
    (acc, cur) => acc.concat(cur), []
  );

  listJumlahBarang = flatten.reduce(function (semuaItem, item) {
    if (item in semuaItem) {
      semuaItem[item]++;
    }
    else {
      semuaItem[item] = 1;
    }
    return semuaItem;
  }, {});
}


// JALANKAN SEMUA FUNGSI DAN CETAK KE CONSOLE
txtToTransaksi(dataTxt);
console.log(transaksi);

// f1
hitungBarang(transaksi);
console.log(listJumlahBarang);

// f2
