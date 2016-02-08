var canvas = document.getElementById('canvas1')
var gl;

function initWebGL(canvas) {

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

initWebGL(canvas);      // Initialise le contexte WebGL

// Continue seulement si le WebGL est disponible et est en train de fonctionner

if (gl) {
  gl.clearColor(1.0, 1.0, 1.0, 0.0);                      // Met la couleur d'effacement au noir et complétement opaque
  gl.enable(gl.DEPTH_TEST);                               // Active le test de profondeur
  gl.depthFunc(gl.LEQUAL);                                // Les objets proches cachent les objets lointains
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Efface les couleurs et le buffer de profondeur.
}
