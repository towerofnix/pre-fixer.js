// Sneaky default arguments hacks!
function prefix({
  
  // The query for all elements to fix. Keep in mind that
  // the indenting will destroy all the contents of these
  // elements, including formatting, and will replace it
  // with it's own fixed text.
  query = 'pre > code',
  
  // The query for all elements NOT to fix.
  noQuery = '',
  
  // If true, delete ALL indentation, so that all the non-
  // spacing characters begin on the same column and have no
  // indentation at all.
  isGreedy = false
} = {}) {
  if (query instanceof Array) {
    var els = [];
    for (let q of query) {
      for (let e of Array.from(q ? document.querySelectorAll(q) : [])) {
        els.push(e);
      }
    }
  } else {
    var els = query ? Array.from(document.querySelectorAll(query)) : [];
  }
  if (noQuery instanceof Array) {
    var badEls = [];
    for (let q of noQuery) {
      for (let e of Array.from(q ? document.querySelectorAll(q) : [])) {
        badEls.push(e);
      }
    }
  } else {
    var badEls = noQuery ? Array.from(document.querySelectorAll(noQuery)) : [];
  }
  els.forEach(el => {
    if (badEls.includes(el)) return;
    
    var textContent = el.textContent || '';
    var lines = textContent.split('\n');
    var realIndent = Infinity;

    if (!isGreedy) {
      lines.forEach(line => {
        // Don't count indents for empty lines.
        if (!line.match(/^\ *$/)) {

          // Get indent size.
          var indent = line.match(/\ */)[0].length;

          // If that size is less than the decided size, decide
          // that the indentation of the text content is this size.
          if (indent < realIndent) {
            realIndent = indent;
          }
        }
      });
      
      lines.forEach((line, index) => {
        var lineData = line.slice(realIndent);
        lines[index] = lineData;
      });
    } else {
      lines.forEach((line, index) => {
        var lineData = line.match(/^\ *(.*)$/)[1];
        lines[index] = lineData;
      })
    }

    // If the first line is empty, get rid of it.
    if (lines[0].match(/^\ *$/)) {
      lines.shift();
    }

    while (el.firstChild) {
      el.firstChild.remove();
    }

    var newTextNode = document.createTextNode(lines.join('\n'));
    el.appendChild(newTextNode);
  });
}
