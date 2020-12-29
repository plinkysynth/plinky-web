function coordAsString(val) {
  if(typeof val === 'number') {
    return val+"px";
  }
  else {
    return val;
  }
}

/**
 * Take in an object with layout attributes and turn it into a string to stick into html style attribute
 * @param {*} obj 
 */
export default function styleFormatter(obj) {

  const styles = {
    'background-color': obj.backgroundColor ? obj.backgroundColor : undefined,
    'background-image': obj.backgroundImage ? `url(${obj.backgroundImage})` : undefined,
    'border-color': obj.borderColor ? obj.borderColor : undefined,
    'border-radius': obj.borderRadius ? coordAsString(obj.borderRadius) : undefined,
    'border-width': obj.borderWidth ? coordAsString(obj.borderWidth) : undefined,
    'width': obj.width ? coordAsString(obj.width) : undefined,
    'height': obj.height ? coordAsString(obj.height) : undefined,
    'top': obj.y ? coordAsString(obj.y) : undefined,
    'left': obj.x ? coordAsString(obj.x) : undefined
  };

  let styleString = '';

  Object.keys(styles).forEach(key => {
    if(styles[key] !== undefined) {
      styleString += `${key}: ${styles[key]}; `;
    }
  })

  return styleString;

}