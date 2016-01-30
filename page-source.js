fetch('index.html')
  .then(function(r) {return r.text()})
  .then(function(t) {
    document.querySelector('pre > code').appendChild(document.createTextNode(t));
    Prism.highlightAll();
  });
