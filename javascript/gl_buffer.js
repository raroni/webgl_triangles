function GLBuffer(context) {
  this.context = context;
  this.handle = context.createBuffer();
  this.type = context.ARRAY_BUFFER;
}

GLBuffer.prototype = {
  bind: function() {
    this.context.bindBuffer(this.type, this.handle);
  },
  save: function(data) {
    this.bind();
    this.context.bufferData(this.type, data, this.context.STATIC_DRAW);
  }
};
