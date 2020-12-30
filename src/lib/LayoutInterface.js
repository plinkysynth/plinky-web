import * as config from './config';
import scaleValue from './scaleValue';

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

  trails = [];
  frame = 0;
  touching = false;

  constructor() {

    // Set up config shorthands
    this.config = config;
    this.buttons = config.buttons;
    this.screens = config.screens;
    this.knobs = config.knobs;
    this.connectors = config.connectors;
    this.touchstrips = config.touchstrips;
    this.leds = config.leds;

    this.ballSize = 40;
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
      await this.loadImage('bg', this.config.ui.backgroundImage, this.canvas.width, this.canvas.height);
    }

    await this.loadImage('ball', 'https://www.miunau.com/ul/ball.png', this.ballSize, this.ballSize);

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

  /**
   * Draw the background to the UI
   */
  drawBackground() {
    this.ctx.drawImage(this.images['bg'], 0, 0, this.canvas.width, this.canvas.height);
  }

  ontouchstart(fingers) {
    this.createTrails(fingers);
    this.touching = true;
  }

  createTrails(fingers) {

    fingers.forEach(finger => {

      const coords = this.translateFromScreenCoordsToCanvasCoords(finger.x, finger.y);
      const x = coords[0];
      const y = coords[1];

      let deltaX = finger.deltaX;
      let deltaY = finger.deltaY;

      let added = false;

      if(this.trails.length > 2) {

        let lastTrailSpot = this.trails[this.trails.length - 1];
        let [ lastX, lastY ] = lastTrailSpot;
        let diffX = Math.abs(x - lastX) || 1;
        let diffY = Math.abs(y - lastY) || 1;

        const amt = 2;
  
        let times = Math.floor((diffX > diffY ? diffX : diffY) / amt);

        if(times > 1) {
  
          let i = 1;
          added = true;

          let nnx = lastX;
          let nny = lastY;

          for(let i = 1; i < times; i++) {

            const newX = lastX - (((lastX - x) / times)) * i;
            const newY = lastY - (((lastY - y) / times)) * i;
            
            const newDeltaX = nnx - newX;
            const newDeltaY = nny - newY;

            deltaX = newDeltaX;
            deltaY = newDeltaY;

            nnx = newX;
            nny = newY;

            const speed = EasingFunctions.easeInCubic(i/times > 0.5 ? 1-i/times : i/times);

            this.trails.push([newX, newY, newDeltaX, newDeltaY, 1+speed]);

          }
  
        }
  
      }

      if(!added) {
        this.trails.push([x, y, deltaX, deltaY, 1]);
      }

    });

  }

  ontouchmove(fingers) {
    this.createTrails(fingers);
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

  drawCursorTrail() {
    
    const maxTrails = 600;

    this.trails.forEach((trail, i) => {

      let r,g,b = 255;
      let a = 255;
      const [ x, y, deltaX, deltaY, speed ] = trail;

      let xx = this.ballSize*(i/this.trails.length);
      let fi = i/this.trails.length;
      let ti = this.trails.length/i;
      let mt = this.trails.length/maxTrails;

      //xx *= Math.sqrt(deltaX*deltaX + deltaY*deltaY) * 0.01;

      const f = this.frame%i;

      xx *= (Math.cos(Math.sin( (fi*this.frame) * fi ))* 0.1) * 200;

      //xx *= speed;
      xx *= EasingFunctions.easeOutCubic(fi);
      //console.log(xx);

      if(xx < 5) xx = 5;
      if(xx > 100) xx = 100;

      if(isFinite(xx)) {
        const gradient = this.ctx.createRadialGradient(x, y, xx*0.1*fi, x, y, xx / 2.0);

        //const hue = Math.sin((this.frame+(fi))*0.01)*255;
        //const saturation = 100;

        let dx = scaleValue(deltaX, 0, this.canvas.width, -1*this.canvas.width, this.canvas.width);
        let dy = scaleValue(deltaY, 0, this.canvas.height, -1*this.canvas.height, this.canvas.height);

        const sin = Math.cos(mt);
        
        const hue = (Math.atan2(dx,dy)*1*fi)*180*sin;
        let saturation= Math.sqrt(dx*dx + dy*dy)*mt;
        //console.log(saturation);
        //const saturation=Math.sqrt(deltaX*deltaX + deltaY*deltaY)*100;

        const lum = fi*65*speed;

        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lum}%, ${fi})`);
        gradient.addColorStop(0.1, `hsla(${hue}, ${saturation}%, ${lum}%, ${fi*0.05})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, 0%, 0`);
    
        this.ctx.fillStyle = gradient;
    
        this.ctx.beginPath();
        this.ctx.arc(x, y, xx / 2, 0, 2 * Math.PI);
        this.ctx.fill();
      }

    });

    if(this.trails.length > maxTrails) {
      this.trails = this.trails.slice((this.trails.length - 1 - maxTrails) || 0, this.trails.length - 1);
    }

    if(!this.touching || this.trails.length > 8) {
      this.trails.splice(0, Math.ceil(scaleValue(this.trails.length * 0.02, 0, this.trails.length, 0, this.trails.length)));
    }

  }

  render() {
    this.frame++;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.drawBackground();
    this.drawCursorTrail();
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

}