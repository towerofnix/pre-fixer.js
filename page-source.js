fetch('index.html')
  .then(r => r.text())
  .then(t => {
    document.querySelector('pre > code').appendChild(document.createTextNode(t));
    Prism.highlightAll();
  });