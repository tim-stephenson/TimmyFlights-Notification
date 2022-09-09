export interface FlightInfo {
    icao24 : string;
    callsign : string | null;
    origin_country : string;
    time_position : number | null;
    last_contact : number;
    longitude : number | null;
    latitude : number | null;
    baro_altitude : number | null;
    on_ground : boolean;
    velocity : number | null;
    true_track : number | null;
    vertical_rate : number | null;
    sensors : number[] | null;
    geo_altitude : number | null;
    squawk : string | null;
    spi : boolean;
    position_source : 0 | 1 | 2 | 3;
    category : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
};

export interface TrackableFlightInfo {
    time_position : NonNullable<FlightInfo["time_position"]>;
    longitude : NonNullable<FlightInfo["longitude"]>;
    latitude : NonNullable<FlightInfo["latitude"]>;
    velocity : NonNullable<FlightInfo["velocity"]>;
    true_track : NonNullable<FlightInfo["true_track"]>;
    geo_altitude : NonNullable<FlightInfo["geo_altitude"]>
};

export interface AllStates {
    time : number;
    states : [
        FlightInfo["icao24"],
        FlightInfo["callsign"], 
        FlightInfo["origin_country"], 
        FlightInfo["time_position"], 
        FlightInfo["last_contact"], 
        FlightInfo["longitude"],
        FlightInfo["latitude"],
        FlightInfo["baro_altitude"],
        FlightInfo["on_ground"],
        FlightInfo["velocity"],
        FlightInfo["true_track"],
        FlightInfo["vertical_rate"],
        FlightInfo["sensors"],
        FlightInfo["geo_altitude"],
        FlightInfo["squawk"],
        FlightInfo["spi"],
        FlightInfo["position_source"],
        FlightInfo["category"],
    ][];
};

export interface Coordinate {
    latitude  : number;
    longitude : number;
}

export interface notificationRow {
    id : number;
    latitude : number;
    longitude : number;
    email : string;
};