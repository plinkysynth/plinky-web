import { scale } from 'svelte/types/runtime/transition';
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
    this.draw(fingers);
    this.touching = true;
  }

  draw(fingers) {

    fingers.forEach(finger => {

      const coords = this.translateFromScreenCoordsToCanvasCoords(finger.x, finger.y);
      const x = coords[0];
      const y = coords[1];

      if(this.trails.length > 2) {

        let lastTrailSpot = this.trails[this.trails.length - 1];
        let [ lastX, lastY ] = lastTrailSpot;
        let diffX = Math.abs(x - lastX) || 1;
        let diffY = Math.abs(y - lastY) || 1;

        console.log(this.trails.length)

        const amt = 4;
  
        if(diffX > amt || diffY > amt) {
  
          let i = 1;

          console.log("DIFFX", diffX, "DIFFY", diffY);

          let times = Math.floor((diffX > diffY ? diffX : diffY) / amt);
          let nnx = lastX;
          let nny = lastY;

          for(let i = 0; i < times; i++) {

            const newX = lastX - (((lastX - x) / times)) * i;
            const newY = lastY - (((lastY - y) / times)) * i;
            
            const newDeltaX = nnx - newX;
            const newDeltaY = nny - newY;

            nnx = newX;
            nny = newY;

            console.log([newX, newY, newDeltaX, newDeltaY]);

            this.trails.push([newX, newY, newDeltaX, newDeltaY, 1+(i/times)]);

          }
  
        }
  
      }

      this.trails.push([x, y, finger.deltaX, finger.deltaY, 1]);

    });

  }

  ontouchmove(fingers) {
    this.draw(fingers);
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
    
    const maxTrails = 2000;

    this.trails.forEach((trail, i) => {

      let r,g,b = 255;
      let a = 255;
      const [ x, y, deltaX, deltaY, speed ] = trail;

      let xx = this.ballSize*(i/this.trails.length);
      let fi = i/this.trails.length;
      let ti = this.trails.length/i;

      //xx *= Math.sqrt(deltaX*deltaX + deltaY*deltaY) * 0.01;
      const minSize = 10;
      if(xx <= minSize) xx = minSize;
      xx *= (Math.cos(Math.sin( ((this.trails.length/i)*this.frame%900) * 0.02 ))* 0.1) * 50;

      xx += speed*2;

      let px = xx * Math.sin(this.frame * 0.1) * 1;
      let py = xx * Math.cos(this.frame * 0.1) * 1;

      if(isFinite(xx)) {
        const gradient = this.ctx.createRadialGradient(x, y, xx*0.2, x, y, xx / 2.0);

        ///const hue = Math.sin((this.frame+(i/this.trails.length))*0.01)*255;
        //const saturation = 100;
        const hue=(Math.atan2(deltaX,deltaY))*180*speed;
        const saturation=Math.sqrt(deltaX*deltaX + deltaY*deltaY)*100;

        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, 50%, ${fi})`);
        gradient.addColorStop(0.1, `hsla(${hue}, ${saturation}%, 50%, ${fi*0.05})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, 0%, 0`);
    
        this.ctx.fillStyle = gradient;
    
        this.ctx.beginPath();
        this.ctx.arc(x, y, xx / 2, 0, 2 * Math.PI);
        this.ctx.fill();
      }

      /*
      for(let i=0;i<this.pixelData.length;i++) {
        this.pixelData[i] = 255;
        if(i % 3 === 0) {
          this.pixelData[i] = scaleValue(i, 0, 255, 0, this.pixelData.length);
        }
      }

      this.pixelData[this.pixelData.length - 1] = 127;
      //this.ctx.putImageData( this.pixel, x, y);
      */

    });

    if(this.trails.length > maxTrails) {
      this.trails = this.trails.slice((this.trails.length - 1 - maxTrails) || 0, this.trails.length - 1);
      //this.trails = this.trails.splice(0, this.trails.length - maxTrails);
    }

    if(!this.touching || this.trails.length > 8) {
      this.trails.splice(0, Math.ceil(scaleValue(this.trails.length * 0.001, 0, this.trails.length, 0, this.trails.length)));
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