define([], function () {

  'use strict';

  /* API helpers */

  // these do not need to be wrapped because their style is
  // implicit in their NodeType
  var styleElements = ["B", "STRONG", "I", "EM", "U", "STRIKE"];

  function isStyleElement(n) {
    return styleElements.indexOf(n.nodeName);
  }

  function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }


  function appendTraversedChildrenTo(n, parentNode, mapper) {
    var child = n.firstChild;
    while (child) {
      var mappedChild = traverse(child, mapper);
      if (mappedChild) {
        parentNode.appendChild(mappedChild);
      }
      child = child.nextSibling;
    }
    return parentNode;
  }

  function appendTraversedChildren(n, mapper) {
    return appendTraversedChildrenTo(n, n.cloneNode(false), mapper);
  }

  function traverse(node, mapper) {
    return mapper(node, mapper);
  }



  /* Map style property to an element */

  function styleToElement(styleProp, styleValue, elName) {
    return function(n, mapper) {
      if (isElement(n) && n.style[styleProp] === styleValue && !isStyleElement(n)) {
        var strongWrapper = document.createElement(elName);
        var child = n.firstChild;
        while (child) {
          // FIXME: avoid deep cloneNode here somehow? traverse?
          strongWrapper.appendChild(child.cloneNode(true));
          child = child.nextSibling;
        }

        var nCopy = n.cloneNode(false);
        nCopy.style[styleProp] = null;

        // Remove any 'style=""' for consistency
        if (nCopy.getAttribute('style') === '') {
          nCopy.removeAttribute('style');
        }

        nCopy.appendChild(traverse(strongWrapper, mapper));
        return nCopy;
      } else {
        return appendTraversedChildren(n, mapper);
      }
    };
  }


  var filters = [
    styleToElement('fontWeight', 'bold',   'b'),
    styleToElement('fontStyle',  'italic', 'i'),
    styleToElement('textDecoration',     'underline',    'u'),
    styleToElement('textDecoration',     'line-through', 'strike'),
    // Note: in newer browsers that support it, may appear as
    // text-decoration-line instead
    styleToElement('textDecorationLine', 'underline',    'u'),
    styleToElement('textDecorationLine', 'line-through', 'strike')
    // TODO: headings?
    // TODO: clear empty styles?
  ];

  function applyFilters(node) {
    return filters.reduce(traverse, node);
  }

  return applyFilters;

});
