/* MIT License

Copyright 2024 Quasar Nebula <qznebula@protonmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

function prefix(options) {
  if (typeof options === 'undefined') options = {};

  // Super quick polyfills
  function def(k, v) {
    if (typeof options[k] === 'undefined') {
      return v;
    } else {
      return options[k];
    }
  }
  function array(arrayLike) {
    return Array.from ?
      Array.from(arrayLike) :
      array.prototype.slice.call(arrayLike, 0);
  }

  // The query for all elements to fix. Keep in mind that
  // the indenting will destroy all the contents of these
  // elements, including formatting, and will replace it
  // with it's own fixed text.
  var query = def('query', 'pre > code');
  
  // The query for all elements NOT to fix.
  var noQuery = def('noQuery', '');

  // If true, delete ALL indentation, so that all the non-
  // spacing characters begin on the same column and have no
  // indentation at all.
  var isGreedy = def('isGreedy', false);

  var els;
  if (query instanceof Array) {
    els = [];
    query.forEach(function(q) {
      array(q ? document.querySelectorAll(q) : []).forEach(function(e) {
        els.push(e);
      });
    });
  } else {
    els = query ? array(document.querySelectorAll(query)) : [];
  }

  var badEls;
  if (noQuery instanceof Array) {
    badEls = [];
    noQuery.forEach(function(q) {
      array(q ? document.querySelectorAll(q) : []).forEach(function(e) {
        badEls.push(e);
      });
    });
  } else {
    badEls = noQuery ? array(document.querySelectorAll(noQuery)) : [];
  }
  els.forEach(function(el) {
    if (badEls.indexOf(el) >= 0) return;
    
    var textContent = el.textContent || '';
    var lines = textContent.split('\n');
    var realIndent = Infinity;

    if (!isGreedy) {
      lines.forEach(function(line) {
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
      
      lines.forEach(function(line, index) {
        var lineData = line.slice(realIndent);
        lines[index] = lineData;
      });
    } else {
      lines.forEach(function(line, index) {
        var lineData = line.match(/^\ *(.*)$/)[1];
        lines[index] = lineData;
      });
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
