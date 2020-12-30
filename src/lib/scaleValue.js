export default function scaleValue(OldValue, OldMin, OldMax, NewMin, NewMax) {
  return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin;
}