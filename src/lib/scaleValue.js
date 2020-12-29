export default function scaleValue(OldValue, OldMin, NewMax, NewMin, OldMax) {
  return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin;
}