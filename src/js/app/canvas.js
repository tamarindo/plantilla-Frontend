(function(){
  // Canvas
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var trazo = document.getElementById("trazo");
  canvas.width = 500;
  canvas.height = 400;

  // Estilos
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000000';

  // Posición del mouse
  var mouse = {x: 0, y: 0};
  canvas.addEventListener('mousemove', function(e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
  }, false);

  // Eventos
  canvas.addEventListener('mousedown', function(e) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      canvas.addEventListener('mousemove', onPaint, false);
  }, false);

  canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', onPaint, false);
  }, false);

  // Pinta un segmento de línea
  function onPaint() {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
  }

  // Limpia el elemento canvas
  function limpiar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Cambio de color
  var botones = document.querySelectorAll('.color');
  for(var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function (e) {
          ctx.strokeStyle = e.target.getAttribute('name');
      });
  }

  // Listener para el trazo
  trazo.addEventListener("change", function(e){
      ctx.lineWidth  = e.target.value;
  }, true);
}());