// TODO: Build a Vehicle → Car → ElectricCar inheritance hierarchy

// Base class: Vehicle
// - Properties: make (string), year (number)
// - Method: getInfo() returns "{year} {make}"
export class Vehicle {
    constructor(
        public make: string,
        public year: number
    ) {}

    getInfo(): string {
        // TODO: Return "{year} {make}"
        return "";
    }
}

// Subclass: Car extends Vehicle
// - Additional property: doors (number)
// - Method: override getInfo() to return "{year} {make} ({doors}-door)"
export class Car extends Vehicle {
    constructor(
        make: string,
        year: number,
        public doors: number
    ) {
        super(make, year);
    }

    override getInfo(): string {
        // TODO: Return "{year} {make} ({doors}-door)"
        return "";
    }
}

// Subclass: ElectricCar extends Car
// - Additional property: range (number, in miles)
// - Additional property: batteryLevel (number, starts at 100)
// - Method: override getInfo() to return "{year} {make} ({doors}-door) [Electric, {range}mi range]"
// - Method: drive(miles) — subtract miles from batteryLevel proportionally
//   (batteryLevel decreases by miles/range * 100). Cannot go below 0. Return actual miles driven.
// - Method: charge() — set batteryLevel back to 100
export class ElectricCar extends Car {
    batteryLevel: number;

    constructor(
        make: string,
        year: number,
        doors: number,
        public range: number
    ) {
        super(make, year, doors);
        this.batteryLevel = 100;
    }

    override getInfo(): string {
        // TODO: Return "{year} {make} ({doors}-door) [Electric, {range}mi range]"
        return "";
    }

    drive(miles: number): number {
        // TODO: Reduce batteryLevel proportionally (miles/range * 100)
        // Cannot go below 0. Return actual miles driven.
        return 0;
    }

    charge(): void {
        // TODO: Set batteryLevel back to 100
    }
}
