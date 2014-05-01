define([], function () {

  'use strict';

  function asHtmlFormatter(domFormatter) {
    return function(html) {
      var bin = document.createElement('div');
      bin.innerHTML = html;

      return domFormatter(bin).innerHTML;
    };
  }

  return asHtmlFormatter;
});
