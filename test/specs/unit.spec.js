define(['src/formatter'], function (formatter) {
  it('should wrap the content of a bold paragraph in a B element', function() {
    var root = document.createElement('div');
    root.innerHTML = '<p style="font-weight: bold">1</p>';

    var output = formatter(root).innerHTML;
    expect(output).to.equal('<p style=""><b>1</b></p>');
  });

  it('should wrap the content of a bold SPAN in a B element', function() {
    var root = document.createElement('div');
    root.innerHTML = '<p>1 <span style="font-weight: bold">2</span></p>';

    var output = formatter(root).innerHTML;
    expect(output).to.equal('<p>1 <span style=""><b>2</b></span></p>');
  });
});
