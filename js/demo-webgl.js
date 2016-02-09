var canvas = document.getElementById('canvas1')
var gl;

var initWebGL = function (canvas) {

  try {
    // Essaye de récupérer le contexte standard. En cas d'échec, il teste l'appel experimental
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  }
  catch(e) {}

 // Si le contexte GL n'est pas récupéré, on l'indique à l'utilisateur.
  if (!gl) {
    alert("Impossible d'initialiser le WebGL. Il est possible que votre navigateur ne supporte pas cette fonctionnalité.");
  }
}

var loadShader = function(gl, shaderSource, shaderType) {
  var compiled,
      shader = gl.createShader(shaderType);

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  // If something went wrong:
  if (!compiled) {
    console.error(
      'Error compiling shader "' + shader + '":' +
      gl.getShaderInfoLog(shader)
    );

    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

var loadProgram = function(gl, shaders) {
  var i,
      linked,
      program = gl.createProgram();

  for (i = 0; i < shaders.length; ++i)
    gl.attachShader(program, shaders[i]);

  gl.linkProgram(program);

  // Check the link status
  linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    console.error('Error in program linking: ' + gl.getProgramInfoLog(program));

    gl.deleteProgram(program);
    return null;
  }

  return program;
};

var circleVertexShader = [
  'attribute vec2 a_position;',
  'attribute float a_size;',
  'attribute float a_color;',

  'uniform vec2 u_resolution;',
  'uniform float u_ratio;',
  'uniform float u_scale;',
  'uniform mat3 u_matrix;',

  'varying vec4 color;',

  'void main() {',
    // Scale from [[-1 1] [-1 1]] to the container:
    'gl_Position = vec4(',
      '((u_matrix * vec3(a_position, 1)).xy /',
        'u_resolution * 2.0 - 1.0) * vec2(1, -1),',
      '0,',
      '1',
    ');',

    // Multiply the point size twice:
    //  - x SCALING_RATIO to correct the canvas scaling
    //  - x 2 to correct the formulae
    'gl_PointSize = a_size * u_ratio * u_scale * 2.0;',

    // Extract the color:
    'float c = a_color;',
    'color.b = mod(c, 256.0); c = floor(c / 256.0);',
    'color.g = mod(c, 256.0); c = floor(c / 256.0);',
    'color.r = mod(c, 256.0); c = floor(c / 256.0); color /= 255.0;',
    'color.a = 1.0;',
  '}'
].join('\n');

var circleFragmentShader = [
  'precision mediump float;',

  'varying vec4 color;',

  'void main(void) {',
    'gl_FragColor = color;',
  '}'
].join('\n')


initWebGL(canvas);      // Initialise le contexte WebGL

// Continue seulement si le WebGL est disponible et est en train de fonctionner

if (gl) {
  gl.clearColor(1.0, 1.0, 1.0, 0.0);                      // Met la couleur d'effacement au noir et complétement opaque
  gl.enable(gl.DEPTH_TEST);                               // Active le test de profondeur
  gl.depthFunc(gl.LEQUAL);                                // Les objets proches cachent les objets lointains
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Efface les couleurs et le buffer de profondeur.*


  var vertexShader   = loadShader(gl, circleVertexShader, gl.VERTEX_SHADER);
  var fragmentShader = loadShader(gl, circleFragmentShader, gl.FRAGMENT_SHADER);
  var program        = loadProgram(gl, [vertexShader, fragmentShader]);

  var data = [100, 100, 40, '#330000', 2 * Math.PI];


  var buffer;

  // Define attributes:
  var positionLocation   = gl.getAttribLocation(program, 'a_position');
  var sizeLocation       = gl.getAttribLocation(program, 'a_size');
  var colorLocation      = gl.getAttribLocation(program, 'a_color');
  var resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  var matrixLocation     = gl.getUniformLocation(program, 'u_matrix');
  var ratioLocation      = gl.getUniformLocation(program, 'u_ratio');
  var scaleLocation      = gl.getUniformLocation(program, 'u_scale');

  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

  gl.uniform2f(resolutionLocation, 200.0, 200.0);
  gl.uniform1f(
    ratioLocation,
    1
    // 1 / Math.pow(params.ratio, params.settings('nodesPowRatio'))
  );
  gl.uniform1f(scaleLocation, 1);
  gl.uniformMatrix3fv(matrixLocation, false, 1);

  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(sizeLocation);
  gl.enableVertexAttribArray(colorLocation);

  gl.vertexAttribPointer(
    positionLocation,
    2,
    gl.FLOAT,
    false,
    this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.vertexAttribPointer(
    sizeLocation,
    1,
    gl.FLOAT,
    false,
    this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
    8
  );
  gl.vertexAttribPointer(
    colorLocation,
    1,
    gl.FLOAT,
    false,
    this.ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,
    12
  );

  gl.drawArrays(
    gl.POINTS,
    0,
    1
  );

}
