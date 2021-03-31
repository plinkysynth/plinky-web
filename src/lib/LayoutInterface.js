import * as config from './config';
import scaleValue from './scaleValue';
import clamp from './clamp';

const EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t*t,
  // decelerating to zero velocity
  easeOutQuad: t => t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
  // decelerating to zero velocity 
  easeOutCubic: t => (--t)*t*t+1,
  // acceleration until halfway, then deceleration 
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity 
  easeInQuart: t => t*t*t*t,
  // decelerating to zero velocity 
  easeOutQuart: t => 1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: t => t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration 
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
}

export default class LayoutInterface {

  constructor() {

    this.trails = [];
    this.frame = 0;
    this.touching = false;

    // Set up config shorthands
    this.config = config;
    this.buttons = config.buttons;
    this.screens = config.screens;
    this.knobs = config.knobs;
    this.connectors = config.connectors;
    this.touchstrips = config.touchstrips;
    this.leds = config.leds;

    this.ballSize = 40;
    this.loopCounter = 0;
    this.images = {};

  }

  async setup({
    canvas
  }) {
    // Set up reference to the canvas that we'll be drawing to
    console.log('[Layout] Setup');
    this.canvas = canvas;

    this.canvas.width = this.config.ui.width;
    this.canvas.height = this.config.ui.height;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.mozImageSmoothingEnabled = true;
    this.ctx.webkitImageSmoothingEnabled = true;
    this.ctx.msImageSmoothingEnabled = true;

    if(this.config.ui.backgroundImage) {
      //await this.loadImage('bg', this.config.ui.backgroundImage, this.canvas.width, this.canvas.height);
    }

    this.requestAnimationFrame();

  }

  /**
   * Draw an image in the layout canvas
   * @param {*} img   Image object
   * @param {*} x     X coordinate to draw from
   * @param {*} y     Y coordinate to draw from
   */
  drawImage(img, x, y, w, h) {
    this.ctx.drawImage(img, x, y, w, h);
  }

  /**
   * Load an image from a source asynchronously and create a bitmap out of it
   * @param {String} src    URI to image source
   */
  createAndResizeImage(src, resizeWidth, resizeHeight) {
    return new Promise(res => {
      const img = new Image();
      img.src = src;
      img.onload = function() {
        res(createImageBitmap(img, { resizeWidth, resizeHeight, resizeQuality: 'high' }));
      };
    })
  }

  async loadImage(id, src, width, height) {
    const img = await this.createAndResizeImage(src, width, height);
    this.images[id] = img;
    return img;
  }

  ontouchstart(fingers) {
    this.touching = true;
  }

  ontouchmove(fingers) {
    this.touching = true;
  }

  ontouchend(fingers) {
    this.touching = false;
  }

  canvasPositionOnScreen() {
    const windowrect = document.body.getBoundingClientRect();
    const rect = this.canvas.getBoundingClientRect();
    //console.log(window.outerHeight, window.outerWidth, windowrect, rect);
    return [
      rect.left - (window.innerWidth - windowrect.width),
      rect.top - (window.innerHeight - windowrect.height)
    ];
  }

  translateFromScreenCoordsToCanvasCoords(x, y) {
    const [ canvasX, canvasY ] = this.canvasPositionOnScreen();
    return [ x - canvasX, y - canvasY ];
  }

  translateFromCanvasCoordsToScreenCoords(x, y) {
    const [ canvasX, canvasY ] = this.canvasPositionOnScreen();
    return [ x + canvasX, y + canvasY ];
  }

  drawLeds() {

    if(window._getemuleds && HEAP8) {

      // Get LED array
      this.__leds = _getemuleds();
      this.__leddata = new Uint8ClampedArray(HEAP8.buffer, this.__leds, 9 * 8);

      let i = 0;

      this.config.leds.forEach(led => {

        const lum = Math.sqrt(this.__leddata[i])*16 || 0.1;

        const gradX = led.x;
        const gradY = led.y;

        let tweenedLum = EasingFunctions.easeOutCubic(lum/255);
        if(tweenedLum > 0.01 && tweenedLum < 0.2) tweenedLum = 0.2;

        const gradient = this.ctx.createRadialGradient(gradX, gradY, 0, gradX, gradY, tweenedLum*64);
        
        const r = led.color[0];
        const g = led.color[1];
        const b = led.color[2];

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${tweenedLum*0.1})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 1;

        this.ctx.fillStyle = '#000000';

        this.ctx.beginPath();
        this.ctx.arc(led.x, led.y, led.width, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = gradient;

        this.ctx.beginPath();
        this.ctx.arc(led.x, led.y, led.width*2*(tweenedLum*128), 0, 2*Math.PI);
        this.ctx.fill();

        i++;

      });

    }
  }

  render() {
    this.frame++;
    this.loopCounter++;
    if(this.loopCounter === 101) {
      this.loopCounter = 0;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLeds();
    this.requestAnimationFrame();
  }

  /**
   * Request animation frame while keeping instance context
   */
  requestAnimationFrame() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  registerUIContainer(DOMNode) {
    this.UIContainer = DOMNode;
  }

}