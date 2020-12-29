import * as _buttons from '../../config/buttons.json';
import * as _connectors from '../../config/connectors.json';
import * as _knobs from '../../config/knobs.json'
import * as _leds from '../../config/leds.json';
import * as _screens from '../../config/screens.json';
import * as _touchstrips from '../../config/touchstrips.json';
import * as enums from '../../config/enums.json';
import * as params from '../../config/params.json';
import * as synth from '../../config/synth.json';
import * as ui from '../../config/ui.json';
import mergeProps from './mergeProps';

const buttons = mergeProps(_buttons);
const connectors = mergeProps(_connectors);
const knobs = mergeProps(_knobs);
const leds = mergeProps(_leds);
const screens = mergeProps(_screens);
const touchstrips = mergeProps(_touchstrips);

export {
  buttons,
  connectors,
  enums,
  knobs,
  leds,
  params,
  screens,
  synth,
  touchstrips,
  ui
}