function fillFileSize(query, u) {
  return fetch(u)
    .then(function(r) {return r.text()})
    .then(function(t) {
      var size = Math.floor(t.length / 100) * 100;
      var sizeStr = size / 1000 + 'KB';
      document.querySelector(query).innerText = sizeStr;
    });
}

// Promise.all([
//   fillFileSize('#prefixer-dist-size', 'prefixer-dist.js'),
//   fillFileSize('#prefixer-src-size', 'prefixer.js')
// ]).then(function() {
//   document.getElementById('file-size').style.display = 'block';
// });

fillFileSize('#prefixer-size', 'prefixer.js').then(function() {
  document.getElementById('file-size').style.display = 'block';
})
