import { toRad } from "./ConvertAngle";

export const EarthRadius = 6_378_100;

export const MaximumLatitudeVariationToCheckFlightPath = 0.5;
export const MaximumDistanceToCheckFlightPath = toRad(MaximumLatitudeVariationToCheckFlightPath) * EarthRadius;

export const ViewableHalfAngle = (1/6) * Math.PI