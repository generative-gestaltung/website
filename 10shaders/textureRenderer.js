var TextureRenderer = function (x, y, w, h, shader) {

  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h
  this.time = 0;

  this.shaderProgram = shader.shaderProgram;
  var _vertices = [-1,-1, 0,
                    1,-1, 0,
                    1, 1, 0,
                   -1,-1, 0,
                    1, 1, 0,
                   -1, 1, 0];

  var _colors   = [255, 255, 255,
                   255, 255, 255,
                   255, 255, 255,
                   255, 255, 255,
                   255, 255, 255,
                   255, 255, 255];

  var _texcoords = [0, 0,
                    1, 0,
                    1, 1,
                    0, 0,
                    1, 1,
                    0, 1];                   
  
  this.positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_vertices), gl.STATIC_DRAW);
  this.positionBuffer.itemSize = 3;
  this.positionBuffer.numItems = 6;

  this.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_colors), gl.STATIC_DRAW);
  this.colorBuffer.itemSize = 3;
  this.colorBuffer.numItems = 6;

  this.textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_texcoords), gl.STATIC_DRAW);
  this.textureCoordBuffer.itemSize = 2;
  this.textureCoordBuffer.numItems = 6;  

  this.shaderProgram.samplerUniform0 = gl.getUniformLocation(this.shaderProgram, "uSampler0");
  this.shaderProgram.samplerUniform1 = gl.getUniformLocation(this.shaderProgram, "uSampler1");
  this.shaderProgram.samplerUniform2 = gl.getUniformLocation(this.shaderProgram, "uSampler2");
  this.shaderProgram.samplerUniform3 = gl.getUniformLocation(this.shaderProgram, "uSampler3");
  this.shaderProgram.timeUniform = gl.getUniformLocation(this.shaderProgram, "uTime");

  this.createUniforms();

  frameBufferInitUint8 (w, h, this);
  //initFB (w, h, this);
}



TextureRenderer.prototype.draw = function (textures, renderToTexture) {

    gl.useProgram (this.shaderProgram);

    selectFrameBuffer (this, renderToTexture);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);


    if (textures.length>0) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[0]);
      gl.uniform1i(this.shaderProgram.samplerUniform0, 0);
    }

    if (textures.length>1) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[1]);
      gl.uniform1i(this.shaderProgram.samplerUniform1, 1);
    }

    if (textures.length>2) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[2]);
      gl.uniform1i(this.shaderProgram.samplerUniform2, 2);
    }

    if (textures.length>3) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[3]);
      gl.uniform1i(this.shaderProgram.samplerUniform3, 3);
    }

    gl.uniform1f(this.shaderProgram.timeUniform, this.time);
    this.updateUniforms();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, this.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, this.positionBuffer.numItems);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    gl.disableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
}

TextureRenderer.prototype.update = function (dt) {
  this.time += dt*0.001;
}

TextureRenderer.prototype.updateUniforms = function() {

}

TextureRenderer.prototype.createUniforms = function() {

}
