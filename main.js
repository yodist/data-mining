var app = angular.module('app', []);

var dataTxt = "gula,beras,roti\nberas,roti,garam,gula\nberas,garam\ngaram,gula\ngaram";
var koef = 2;
var transaksi;
var listBarang;
var semuaKombinasi;
var semuaFN;
var hasilRule;

app.controller('MainController', function($scope) {
    // DATA BELANJA DAN THETA
    $scope.proc = false;
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

    // FUNGSI UNTUK MEMENGGAL DATA BERDASARKAN KOMA
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

    // FUNGSI UNTUK MEMBUAT DAFTAR BARANG UNIK
    function cekBarang(data) {
      var flatten = data.reduce(
        (acc, cur) => acc.concat(cur), []
      );
      var result = [ ...new Set(flatten) ];
      return result;
    }

    // FUNGSI UNTUK MEMBUAT DAFTAR SEMUA KOMBINASI BARANG
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

    // FUNGSI UNTUK MENGURUTKAN ARRAY 2 DIMENSI BERDASARKAN PANJANG SUB ARRAY
    function diurutkan(data) {
      data.sort(function (a, b) {
        return a.length - b.length;
      });
      return data;
    }

    // FUNGSI UNTUK MENCARI JUMLAH KESAMAAN SEBUAH KOMBINASI PADA TRANSAKSI
    function cariFN(datas, target) {
      var result = {};
      for (var iDatas=0; iDatas < datas.length; iDatas++) {
        var data = datas[iDatas];
        // console.log(data);
        for (var iTarget=0; iTarget < target.length; iTarget++) {
          var targetData = target[iTarget];
          if (!result[data]) result[data]=0;
          // console.log("target data: " + targetData);
          var mark = true;
          for (var i=0; i<data.length; i++) {
            if(targetData.indexOf(data[i]) === -1) {
              mark = false;
              i = data.length;
            }
          }
          if (mark) {
            result[data]++;
            // console.log("nambah satu");
          }
        }
        // console.log(result[data]);
      }
      return result;
    }

    // CARI LEGAL FN
    function cariLegalFN(data) {
      var result = [];
      var fn = 0;
      for (var i=0; i<semuaKombinasi.length; i++) {
        if (semuaFN[semuaKombinasi[i]]>=koef) {
          if (fn<semuaKombinasi[i].length) {
            result.push("\nF" + semuaKombinasi[i].length + ": ");
            fn++;
          }
          result.push("---- " +semuaKombinasi[i] + ": " + semuaFN[semuaKombinasi[i]]);
        }
      }
      return result;
    }

    // CARI RULE
    function cariRule() {
      var r, s, c;
      var result = [];
      var lim = 0;
      for (var i=listBarang.length; i<semuaKombinasi.length; i++) {
        if (semuaFN[semuaKombinasi[i]]>=koef && semuaKombinasi[i].length==2) {
          r = "if buy " + semuaKombinasi[i][0] + " then buy " + semuaKombinasi[i][1];
          s = (semuaFN[semuaKombinasi[i]] / transaksi.length * 100).toFixed(2);
          c = (semuaFN[semuaKombinasi[i]] / semuaFN[semuaKombinasi[i][0]] * 100).toFixed(2);
          result[lim] = {
            "rule": r,
            "supp": s,
            "conf": c
          }
          lim += 1;
          r = "if buy " + semuaKombinasi[i][1] + " then buy " + semuaKombinasi[i][0];
          s = (semuaFN[semuaKombinasi[i]] / transaksi.length * 100).toFixed(2);
          c = (semuaFN[semuaKombinasi[i]] / semuaFN[semuaKombinasi[i][1]] * 100).toFixed(2);
          result[lim] = {
            "rule": r,
            "supp": s,
            "conf": c
          }
          lim += 1;
        }
      }
      return result;
    }

    // FUNGSI UNTUK MENAMPILKAN SEMUA DATA
    function displayData(transaksi, listBarang, semuaKombinasi, semuaFN) {
      console.log("\nlist transaksi: ");
      for (var no=0; no<transaksi.length; no++) {
        console.log("transaksi " + (no+1));
        console.log(transaksi[no]);
      }



      console.log("\nlist barang:");
      console.log(listBarang);

      console.log("\nlist kombinasi:");
      console.log(semuaKombinasi);

      console.log("\nsemua fn:");
      console.log(semuaFN);

      // MENAMPILKAN SEMUA FN YANG MEMENUHI KOEF PADA CONSOLE

      var fn = 0;
      for (var i=0; i<semuaKombinasi.length; i++) {
        if (semuaFN[semuaKombinasi[i]]>=koef) {
          if (fn<semuaKombinasi[i].length) {
            console.log("\nF" + semuaKombinasi[i].length + ": ");
            fn++;
          }
          console.log(semuaKombinasi[i] + ": " + semuaFN[semuaKombinasi[i]]);
        }
      }
    }

    // FUNGSI UNTUK MENJALANKAN SEMUA FUNGSI ALGORITMA ASSOCIATION RULE
    $scope.assocRule = function() {
      transaksi = txtToTransaksi(dataTxt);
      listBarang = cekBarang(transaksi);
      semuaKombinasi = combinations(listBarang);
      semuaKombinasi = diurutkan(semuaKombinasi);
      semuaFN = cariFN(semuaKombinasi, transaksi);
      legalFN = cariLegalFN(semuaFN);
      hasilRule = cariRule();
      displayData(transaksi, listBarang, semuaKombinasi, semuaFN);
      $scope.x = transaksi;
      $scope.y = listBarang;
      $scope.z = legalFN;
      $scope.rules = hasilRule;
    }

    // MEMANGGIL FUNGSI ASSOCIATION RULE
    // assocRule();

  });
