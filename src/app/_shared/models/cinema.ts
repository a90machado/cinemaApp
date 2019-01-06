export class Cinema{
    "name":string;
    "timeOpen":number;
    "timeClose":number;
    "pause":number;
    constructor(data?: any){
        Object.assign(this,data);
    }
}
