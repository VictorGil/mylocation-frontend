import { LocationDataJson } from './locationDataJson';

export class LocationData {
    readonly latitude: string;
    readonly longitude: string;
    readonly horizontalAccuracy: string;

    readonly altitude: string;
    readonly verticalAccuracy: string;

    readonly timeChecked: number;
    readonly timeCheckedString: string;
    readonly timeMeasured: number;
    readonly timeMeasuredString: string;

    readonly link: string;

    constructor(locationDataJson: LocationDataJson) {
        this.latitude = locationDataJson.latitude;
        this.longitude = locationDataJson.longitude;
        this.horizontalAccuracy = locationDataJson.horizontalAccuracy;

        this.altitude = locationDataJson.altitude;
        this.verticalAccuracy = locationDataJson.verticalAccuracy;

        this.timeChecked = locationDataJson.timeChecked;
        const timeCheckedDate: Date = new Date(0);
        timeCheckedDate.setUTCSeconds(this.timeChecked);
        this.timeCheckedString = timeCheckedDate.toString();

        this.timeMeasured = locationDataJson.timeMeasured;
        const timeMeasuredDate: Date = new Date(0);
        timeMeasuredDate.setUTCSeconds(this.timeMeasured);
        this.timeMeasuredString = timeMeasuredDate.toString();

        this.link = 'https://maps.google.com/?q=' + this.latitude + ','
                + this.longitude;
    }
}

