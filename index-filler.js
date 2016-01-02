function fillFileSize(query, u) {
  fetch(u)
    .then(r => r.text())
    .then(t => {
      var size = Math.floor(t.length / 100) * 100;
      var sizeStr = size / 1000 + 'KB';
      document.querySelector(query).innerText = sizeStr;
    });
}

fillFileSize('#prefixer-dist-size', 'prefixer-dist.js');
fillFileSize('#prefixer-src-size', 'prefixer.js');
