define(['src/inline-styles-formatter'], function (formatter) {

  function createContainer(html) {
    var container = document.createElement('div');
    container.innerHTML = html;
    return container;
  }


  // Style to element mappings to test

  var mappings = [{
    name: 'bold',
    element: 'b',
    style: 'font-weight: bold'
  },{
    name: 'italic',
    element: 'i',
    style: 'font-style: italic'
  },{
    name: 'strike-through',
    element: 'strike',
    style: 'text-decoration: line-through'
  // TODO: test for text-decoration-line once it's supported by the browser we test with
  // },{
  //   name: 'strike-through',
  //   element: 'strike',
  //   style: 'text-decoration-line: line-through'
  },{
    name: 'underline',
    element: 'u',
    style: 'text-decoration: underline'
  // TODO: test for text-decoration-line once it's supported by the browser we test with
  // },{
  //   name: 'underline',
  //   element: 'u',
  //   style: 'text-decoration-line: underline'
  }];


  describe('inline-styles-formatter', function() {

    mappings.forEach(function(mapping) {
      it('should wrap the content of a '+mapping.name+' paragraph in a '+mapping.element.toUpperCase()+' element', function() {
        var root = createContainer('<p style="' +mapping.style+ '">1</p>');
        var output = formatter(root).innerHTML;
        expect(output).to.equal('<p><' +mapping.element+ '>1</' +mapping.element+ '></p>');
      });

      it('should wrap the content of a '+mapping.name+' SPAN in a ' +mapping.element.toUpperCase()+ ' element', function() {
        var root = createContainer('<p>1 <span style="'+mapping.style+'">2</span></p>');
        var output = formatter(root).innerHTML;
        expect(output).to.equal('<p>1 <span><' +mapping.element+ '>2</' +mapping.element+ '></span></p>');
      });
    });

  });


  // TODO: test end to end via Scribe plugin registration

});
