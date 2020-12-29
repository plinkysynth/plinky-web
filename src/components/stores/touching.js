import { get, writable } from "svelte/store";
import generateId from '../../lib/generateId';
import Synth from '../../lib/Synth';

const touching = new writable(false);
let _touching = false;

export default touching;

export function ontouchmove(e) {
  console.log(e);
}

let fingers = [];
let touchables = [];

function getTouchableByDOMId(DOMId) {
  return DOMId ? touchables.find(touchable => touchable.DOMId === DOMId) : null;
}

export function registerTouchable(type, touchable) {
  touchables.push(Object.assign({ touchableType: type }, touchable));
}

export function touchstart(e) {
  
  // Find out if event is concerning an area that we want touch events at
  if(!e.target.classList.contains('touchable')) {
    return;
  }

  // Prepare array for touch events. Two or more fingers can start touching
  // at the same time, so we have to account for that.
  let touchStartItems = [];

  if(typeof e === MouseEvent) {

    const touchable = getTouchableByDOMId(e.target.id);

    // For mouse events, our finger identifier is always 0.
    touchStartItems = [{
      id: 0,
      x: e.screenX,
      y: e.screenY,
      force: 1,
      touchable
    }];

  }
  else {

    // Count all the fingers
    for(let i=0; i < e.changedTouches.length; i++) {

      const touch = e.changedTouches[i];
      const touchable = getTouchableByDOMId(touch.target.id);

      touchStartItems.push({
        id: touch.identifier,
        x: touch.screenX,
        y: touch.screenY,
        force: touch.force,
        touchable
      });

    }
    
  }

  // Push the fingers into the hand
  fingers.push(...touchStartItems);

  console.log("DOWN!!!!!", fingers);

  // Only add these if we're not touching yet
  if(!_touching) {

    // Now we're touching
    _touching = true;
    touching.set(true);

    // What to do when someone moves their fingers while touching :o
    let touchMoveEvent = window.addEventListener('touchmove', moveEvent => {

      // changedTouches is not iterable.. oh my
      for(let i=0; i < moveEvent.changedTouches.length; i++) {

        // Keep it clean
        const touch = moveEvent.changedTouches[i];

        // Send events if over any touchables
        const touchable = getTouchableByDOMId(touch.target.id);

        // Map our new fingers in memory after real finger positions change
        fingers = fingers.map(finger => {
          if(finger.id === touch.identifier) {
            finger.x = touch.screenX;
            finger.y = touch.screenY;
            finger.force = touch.force;
            finger.touchable = touchable;
          }
          return finger;
        });

        console.log(fingers[0].touchable.id, touch.screenX, touch);

        Synth.setFingers(fingers);

      }

    });

    // What to do when someone stops touching us :(
    let touchEndEvent = window.addEventListener('touchend', endEvent => {

      // Again not iterable..
      for(let i=0; i < endEvent.changedTouches.length; i++) {
        const touch = endEvent.changedTouches[i];
        fingers = fingers.filter(finger => finger.id !== touch.identifier);
      }

      console.log("UP!!!!!!!!", endEvent, fingers);
      Synth.setFingers(fingers);

      // Only if we're REALLY stopping touching, not just some fingers
      if(endEvent.touches.length === 0) {
        _touching = false;
        touching.set(false);
        console.log("remove touch events");
        window.removeEventListener('touchend', touchEndEvent);
        window.removeEventListener('touchmove', touchMoveEvent);
      }

    });

  }

}

