import {Coordinate} from "../interfaces"
import { toDegree, toRad } from "./ConvertAngle"

export default function GetBearing(source: Coordinate, destination: Coordinate){
    const φ1 = toRad(source.latitude);
    const φ2 = toRad(destination.latitude);
    
    const λ1 = toRad(source.longitude);
    const λ2 = toRad(destination.longitude);

    const y = Math.sin(λ2-λ1) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) -
              Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
    const θ = Math.atan2(y, x);
    return (360 + toDegree(θ) ) % 360;
}