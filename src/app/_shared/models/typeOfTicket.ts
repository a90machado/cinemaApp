import { Cinema } from './cinema';

export class TypeOfTicket{
    'typeOfTicket': string;
    'priceOfTicket': number;
    'cinema': Cinema;
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}