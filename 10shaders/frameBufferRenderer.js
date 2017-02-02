var frameBufferInitFloat = function (w, h, renderer) {

  renderer.rttFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, renderer.rttFramebuffer);
  renderer.rttFramebuffer.width  = w;
  renderer.rttFramebuffer.height = h;

  renderer.rttTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, renderer.rttTexture);

  // when float texture
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);


  gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA,
                 renderer.rttFramebuffer.width, renderer.rttFramebuffer.height,
                 0, gl.RGBA, gl.FLOAT, null);

  var renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);

  gl.renderbufferStorage (gl.RENDERBUFFER, color_buffer_float_ext.RGBA32F_EXT,
                          renderer.rttFramebuffer.width, renderer.rttFramebuffer.height);

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, renderer.rttTexture, 0);
  
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);


}

selectFrameBuffer = function (renderer, renderToTexture) {
  if (renderToTexture){
    gl.bindFramebuffer(gl.FRAMEBUFFER, renderer.rttFramebuffer);
  }
  else{
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
}



var frameBufferInitUint8 = function (w, h, renderer) {

  renderer.rttFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, renderer.rttFramebuffer);
  renderer.rttFramebuffer.width  = w;
  renderer.rttFramebuffer.height = h;

  renderer.rttTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, renderer.rttTexture);

  // when float texture
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);


  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderer.rttFramebuffer.width, 
                renderer.rttFramebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  var renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
  gl.renderbufferStorage (gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 
                          renderer.rttFramebuffer.width, renderer.rttFramebuffer.height);

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, renderer.rttTexture, 0);
  
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}