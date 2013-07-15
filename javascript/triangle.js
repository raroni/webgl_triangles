function Triangle(program, color, coordinates) {
  this.program = program;
  this.context = program.context;

  this.color = color;

  var data = new Float32Array(coordinates);
  this.buffer = new GLBuffer(this.context);
  this.buffer.save(data);
}

Triangle.prototype = {
  draw: function() {
    this.buffer.bind();
    var positionHandle = this.program.getAttributeHandle('Position');
    this.context.vertexAttribPointer(positionHandle, 3, this.context.FLOAT, false, 0, 0);

    var colorHandle = this.program.getUniformHandle('Color');
    this.context.uniform4f(colorHandle, this.color[0], this.color[1], this.color[2], 1);

    this.context.drawArrays(this.context.TRIANGLES, 0, 3);
  }
};
