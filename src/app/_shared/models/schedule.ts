export class Schedule{
    "sessionBegin": number;
    "sessinEnd": number;
    "availableSeats": number;
    "roomId": number;
    constructor(data?: any){
        Object.assign(this,data);
    }
}