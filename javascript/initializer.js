(function() {
  var initialize = function() {
    var app = new App();
    document.body.appendChild(app.canvas);
    app.initialize();
  };

  window.addEventListener('load', initialize);
})();
