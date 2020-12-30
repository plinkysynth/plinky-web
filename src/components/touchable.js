import isTouching from './stores/isTouching';
import layout from '../lib/layout';

export let fingers = [];
export let touchables = [];

let _touching = false;

export function getTouchableByDOMId(DOMId) {
  return DOMId ? touchables.find(touchable => touchable.DOMId === DOMId) : null;
}

export function registerTouchable(type, touchable) {
  touchables.push(Object.assign({ touchableType: type }, touchable));
}

export default function touchable(node) {

  function handleTouchstart(e) {

    console.log('handleTouchStart', e, _touching, layout);
    
    let isTouch = true; // a touch or a click event

    // Prepare array for touch events. Two or more fingers can start touching
    // at the same time, so we have to account for that.
    let touchStartItems = [];

    // Find out if event is concerning an area that we want touch events at
    const touchableTarget = getTouchableByDOMId(e.target.id);

    if(!touchableTarget) {
      //return;
    }

    if(e.pageX) {

      isTouch = false;

      // For mouse events, our finger identifier is always 0.
      touchStartItems = [{
        id: 0,
        x: e.pageX,
        y: e.pageY,
        force: 1,
        touchable: touchableTarget,
        started: new Date()
      }];

    }
    else {

      // Count all the fingers
      for(let i=0; i < e.changedTouches.length; i++) {

        const touch = e.changedTouches[i];
        const touchable = getTouchableByDOMId(touch.target.id);

        touchStartItems.push({
          id: touch.identifier,
          x: touch.pageX,
          y: touch.pageY,
          force: touch.force,
          touchable,
          started: new Date()
        });

      }
      
    }

    console.log("touchstartitems", touchStartItems);

    // Push the fingers into the hand
    fingers.push(...touchStartItems);

    // Send event that we're starting to touch
    node.dispatchEvent(new CustomEvent('touchablestart', fingers));
    layout.ontouchstart(fingers);

    console.log("DOWN!!!!!", fingers, isTouch);

    // Only add touch events if we're not touching yet
    if(!_touching) {

      // Now we're touching
      _touching = true;
      isTouching.set(true);

      // What to do when someone moves their fingers while touching :o
      const touchMoveEvent = (moveEvent) => {

        if(moveEvent.pageX) {

          const touchable = getTouchableByDOMId(moveEvent.target.id);

          fingers = fingers.map(finger => {
            if(finger.id === 0) {
              finger.x = moveEvent.pageX;
              finger.y = moveEvent.pageY;
              finger.force = 1;
              finger.touchable = touchable;
            }
            return finger;
          });

        }
        else {

          // changedTouches is not iterable.. oh my
          for(let i=0; i < moveEvent.changedTouches.length; i++) {

            // Keep it clean
            const touch = moveEvent.changedTouches[i];

            // Send events if over any touchables
            const touchable = getTouchableByDOMId(touch.target.id);

            // Map our new fingers in memory after real finger positions change
            fingers = fingers.map(finger => {
              if(finger.id === touch.identifier) {
                finger.x = touch.pageX;
                finger.y = touch.pageY;
                finger.force = touch.force;
                finger.touchable = touchable;
              }
              return finger;
            });

            //console.log(fingers[0].touchable.id, touch.pageX, touch, moveEvent);
            //console.log(moveEvent.target.id);

          }

        }

        // Send touch move event
        layout.ontouchmove(fingers);
        node.dispatchEvent(new CustomEvent('touchablemove', fingers));

      };

      // What to do when someone stops touching us :(
      const touchEndEvent = (endEvent) => {

        if(endEvent.changedTouches) {

          // Again not iterable..
          for(let i=0; i < endEvent.changedTouches.length; i++) {
            const touch = endEvent.changedTouches[i];
            fingers = fingers.filter(finger => finger.id !== touch.identifier);
          }

          console.log("UP!!!!!!!!", endEvent, fingers);
          // Send touch end event

        }
        else {
          fingers = fingers.filter(finger => finger.id !== 0);
        }

        node.dispatchEvent(new CustomEvent('touchableend', fingers));
        layout.ontouchend(fingers);

        // Only if we're REALLY stopping touching, not just some fingers
        if((endEvent.touches && endEvent.touches.length === 0) || endEvent.pageX) {
          _touching = false;
          isTouching.set(false);
          console.log("remove touch events");
          
          if(isTouch) {
            window.removeEventListener('touchend', touchEndEvent);
            window.removeEventListener('touchmove', touchMoveEvent);
          }
          else {
            window.removeEventListener('mouseup', touchEndEvent);
            window.removeEventListener('mousemove', touchMoveEvent);
          }
        }

      };

      if(isTouch) {
        window.addEventListener('touchmove', touchMoveEvent);
        window.addEventListener('touchend', touchEndEvent);
      }
      else {
        window.addEventListener('mousemove', touchMoveEvent);
        window.addEventListener('mouseup', touchEndEvent);
      }
      //window.addEventListener('touchcancel', touchCancelEvent);

    }

  }

  node.addEventListener('touchstart', handleTouchstart);
  node.addEventListener('mousedown', handleTouchstart);

  return {
		destroy() {
      window.removeEventListener('touchstart', handleTouchstart);
		}
  };
  
}