function App() {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('webgl');
  this.triangles = [];
}

App.prototype = {
  initialize: function() {
    this.program = new GLProgram(this.context, { initialized: this.setupScene.bind(this) });
    this.program.initialize();
    this.context.enable(this.context.DEPTH_TEST);
  },
  setupScene: function() {
    var redTriangle = new Triangle(this.program, [1, 0, 0], [
      -0.5, -0.4, 0,
      -0.5, 0.7, 0,
      0.5, 0.7, 0
    ]);

    var greenTriangle = new Triangle(this.program, [0, 1, 0], [
      -0.7, -0.8, -0.9,
      -0.7, 0.1, -0.9,
      0.4, 0.3, -0.9
    ]);

    this.triangles.push(redTriangle);
    this.triangles.push(greenTriangle);

    this.draw();
  },
  draw: function() {
    for(var i=0; this.triangles.length>i; i++) {
      this.triangles[i].draw();
    }
  }
};
