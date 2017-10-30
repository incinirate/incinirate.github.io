let dotAmt = 350;

window.addEventListener("load", ()=>{
  let PIXEL_RATIO = (function () {
    let ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return 2 * dpr / bsr;
  })();

  let canvas = document.getElementById("floating-canvas");

  if (canvas) {
    canvas.width = PIXEL_RATIO * canvas.clientWidth;
    canvas.height = PIXEL_RATIO * canvas.clientHeight;

    let lineDistUSQ = (canvas.height + canvas.width) / 13
    let lineDist = Math.pow(lineDistUSQ, 2);

    let doAnimate = true;

    let dots = [];

    function genDots() {
      dots = [];
      for (var i = 0; i < dotAmt; i++) {
        let dot = {x: Math.random() * canvas.width,
                   y: Math.random() * canvas.height,
                   width: 4,
                   height: 4,
                   vx: 0.4 * (Math.random() * PIXEL_RATIO * 2 - PIXEL_RATIO),
                   vy: 0.4 * (Math.random() * PIXEL_RATIO * 2 - PIXEL_RATIO),
                   o: Math.random() * 0.5};

        dots.push(dot);
      }
    }
    genDots();

    let timeoutInst;
    window.addEventListener("resize", ()=>{
      clearTimeout(timeoutInst);
      timeoutInst = setTimeout(()=>{
        canvas.width = PIXEL_RATIO * canvas.clientWidth;
        canvas.height = PIXEL_RATIO * canvas.clientHeight;
    
        lineDist = Math.pow((canvas.height + canvas.width) / 13, 2);

        genDots();

        doAnimate = true;
      }, 100);
      doAnimate = false;
    });

    let context = canvas.getContext("2d");

    function animate() {
      requestAnimationFrame(animate);

      if (doAnimate) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "rgba(255, 255, 255, 0.1)";
        context.fillStyle = "rgba(255, 255, 255, 0.1)";

        for (var i = 0; i < dotAmt; i++) {
          let dot = dots[i]

          context.fillStyle = "rgba(255, 255, 255, "+ dot.o +")";          

          dot.x += dot.vx;
          dot.y += dot.vy;

          if (dot.x <= 0) {
            dot.x = 1;
            dot.vx = -dot.vx;
          } else if (dot.x >= canvas.width) {
            dot.x = canvas.width - 1;
            dot.vx = -dot.vx;
          }

          if (dot.y <= 0) {
            dot.y = 1;
            dot.vy = -dot.vy;
          } else if (dot.y >= canvas.height) {
            dot.y = canvas.height - 1;
            dot.vy = -dot.vy;
          }

          context.beginPath()
          context.ellipse(dot.x, dot.y,
            PIXEL_RATIO, PIXEL_RATIO, 10, 0, 2 * Math.PI, false);
          context.fill()
        }
      }
    }

    animate();
  } else {
    console.error("Unable to find canvas! :(");
  }
});