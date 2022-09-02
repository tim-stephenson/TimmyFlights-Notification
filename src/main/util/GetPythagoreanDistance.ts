import { Coordinate } from "../interfaces";
import { EarthRadius } from "./Constants";
import {toRad} from "./ConvertAngle";

export default function GetPythagoreanDistance(p1: Coordinate, p2 : Coordinate ){
    const [λ1, φ1] = [ toRad(p1.longitude), toRad(p1.latitude) ];
    const [λ2, φ2] = [ toRad(p2.longitude), toRad(p2.latitude) ];
    const changeX = (λ1- λ2) * Math.cos((φ1 + φ2) /2);
    const changeY = φ1 - φ2;
    return Math.sqrt(changeX * changeX + changeY * changeY) * EarthRadius;
}