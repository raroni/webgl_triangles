function GLProgram(context, delegate) {
  this.context = context;
  this.delegate = delegate;

  this.handle = context.createProgram();
  this.shaderHandles = {};
  this.attributeHandles = {};
  this.uniformHandles = {};
}

GLProgram.prototype = {
  initialize: function() {
    this.requestSource('vertex', './shaders/shader.vsh');
    this.requestSource('fragment', './shaders/shader.fsh');
  },
  requestSource: function(type, url) {
    var vertexShaderRequest = new Request(url, function(source) {
      this.handleShaderSource(type, source);
    }.bind(this));

    vertexShaderRequest.go();
  },
  handleShaderSource: function(type, source) {
    var glType = type == 'vertex' ? this.context.VERTEX_SHADER : this.context.FRAGMENT_SHADER;
    var handle = this.context.createShader(glType);
    this.context.shaderSource(handle, source);
    this.context.compileShader(handle);
    if (!this.context.getShaderParameter(handle, this.context.COMPILE_STATUS)) {
      console.error("An error occurred compiling the shaders: " + this.context.getShaderInfoLog(this.handle));
    }
    this.shaderHandles[type] = handle;
    this.checkHandles();
  },
  checkHandles: function() {
    if(Object.keys(this.shaderHandles).length == 2) {
      this.link();
    }
  },
  link: function() {
    this.context.attachShader(this.handle, this.shaderHandles.vertex);
    this.context.attachShader(this.handle, this.shaderHandles.fragment);
    this.context.linkProgram(this.handle);

    if(!this.context.getProgramParameter(this.handle, this.context.LINK_STATUS)) {
      console.error('Unable to initialize the shader program.');
    } else {
      this.delegate.initialized();
    }
  },
  use: function() {
    this.context.useProgram(this.handle);
  },
  getAttributeHandle: function(attributeName) {
    this.use();
    if(!this.attributeHandles[attributeName]) {
      var handle = this.context.getAttribLocation(this.handle, attributeName);
      if(handle != -1) {
        this.context.enableVertexAttribArray(handle);
        this.attributeHandles[attributeName] = handle;
      }
    }
    return this.attributeHandles[attributeName];
  },
  getUniformHandle: function(uniformName) {
    this.use();
    if(!this.uniformHandles[uniformName]) {
      var handle = this.context.getUniformLocation(this.handle, uniformName);
      if(handle != -1) {
        this.uniformHandles[uniformName] = handle;
      }
    }
    return this.uniformHandles[uniformName];
  }
};
