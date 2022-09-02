import { ViewableHalfAngle } from "./Constants";

export default function GetViewRadius( Altitude : number){
    return Altitude * Math.sin(ViewableHalfAngle);
}