import { toRad } from "./ConvertAngle";

export const EarthRadius = 6_378_100;

export const MaximumLatitudeVariationToCheckFlightPath = 0.25;
export const MaximumDistanceToCheckFlightPath = toRad(MaximumLatitudeVariationToCheckFlightPath) * EarthRadius;

export const ViewableHalfAngle = (1/3) * Math.PI;
export const ViewableDistance = 2_000;