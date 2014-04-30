define(['./formatter'], function (formatter) {

  'use strict';

  return function () {

    function asHtmlFormatter(domFormatter) {
      return function(html) {
        var bin = document.createElement('div');
        bin.innerHTML = html;

        return domFormatter(bin).innerHTML;
      };
    }

    return function (scribe) {
      scribe.htmlFormatter.formatters.push(
        asHtmlFormatter(formatter)
      );
    };
  };

});
